// RFCs come from GitHub Spec PRs, Issues, and from the GraphQL-WG RFCs folder.
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./sdk.mjs";
import * as fs from "node:fs/promises";
import { createHash } from "node:crypto";
import * as yaml from "yaml";
import { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import { SidebarItemConfig } from "@docusaurus/plugin-content-docs/lib/sidebars/types";
import JSON5 from "json5";
import { $, cd } from "zx";

const __dirname = new URL(".", import.meta.url).pathname;
const ROOT = __dirname + "/..";

const CACHE_ENABLED = true;

const graphqlClient = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

interface PrUpdate {
  number: number;
  updatedAt: string;
}

interface State {
  mostRecentPr?: PrUpdate;
  cache?: Record<string, any>;
}

interface Ctx {
  state: State;
  sdk: ReturnType<typeof getSdk>;
}

interface Frontmatter {
  title: string;
  identifier: string;
  events: Event[];
  shortname?: string;
  fullTitle?: string;
  stage: "0" | "1" | "2" | "3" | "X" | "?";
  champion?: string;
  //createdAt?: string;
  //updatedAt?: string;
  prUrl?: string;
  rfcDocUrl?: string;
  issueUrl?: string;
}

function assertFrontmatter(
  frontmatter: Partial<Frontmatter>,
): asserts frontmatter is Frontmatter {
  if (!frontmatter.title || !frontmatter.identifier || !frontmatter.events) {
    throw new Error(`Missing required frontmatter field`);
  }
}

async function loadState(): Promise<State> {
  try {
    const data = JSON.parse(await fs.readFile(`${ROOT}/state.json`, "utf8"));
    return data;
  } catch (e) {
    return {};
  }
}

async function saveState(state: State): Promise<void> {
  await fs.writeFile(
    `${ROOT}/state.json`,
    JSON.stringify(state, null, 2) + "\n",
  );
}

const md5 = (s: string): string => createHash("md5").update(s).digest("hex");

/**
 * This is to stop us being rate limited during development.
 */
async function cache<TArgs extends any[], TResult>(
  ctx: Ctx,
  fn: (...args: TArgs) => Promise<TResult>,
  ...args: TArgs
): Promise<TResult> {
  if (!CACHE_ENABLED) {
    return fn(...args);
  }
  if (!ctx.state.cache) {
    ctx.state.cache = Object.create(null) as {};
  }
  const { cache } = ctx.state;
  if (!fn.name) {
    throw new Error(`cache can only be used with named functions`);
  }
  const signature = md5(`${fn.name}|${JSON.stringify(args)}`);
  if (cache[signature]) {
    console.log("Cache hit");
    return cache[signature];
  } else {
    console.log("Cache miss; calling fn");
    const result = await fn(...args);
    cache[signature] = result;
    return result;
  }
}

async function main() {
  const state = await loadState();
  const sdk = getSdk(graphqlClient);
  const ctx: Ctx = { state, sdk };
  await syncRfcPRs(ctx);
  await syncRfcDocs(ctx);
  await generateIndexAndMeta(ctx);
  await saveState(ctx.state);
}

async function syncRfcPRs(ctx: Ctx) {
  const { sdk, state } = ctx;
  let firstPr: PrUpdate | undefined;
  let cursor: string | undefined;
  let stop = state.mostRecentPr?.updatedAt
    ? Date.parse(state.mostRecentPr.updatedAt)
    : new Date(1970, 1, 1);
  do {
    const prs = await cache(ctx, sdk.GetSpecPRs, { after: cursor });
    // Stop unless a new cursor is found
    cursor = undefined;
    const edges = prs.organization?.repository?.pullRequests.edges;
    if (!edges || edges.length === 0) {
      break;
    }
    for (const edge of edges) {
      if (!edge) {
        throw new Error(`Missing edge! Aborting.`);
      }
      const { cursor: currentCursor, node } = edge;
      if (!node) {
        throw new Error(`Missing node! Aborting.`);
      }
      const nodeUpdated = Date.parse(node.updatedAt);
      if (nodeUpdated < stop) {
        console.log("Found older PR; stopping");
        cursor = undefined;
        break;
      }

      await updateRfc(ctx, `${node.number}`, {
        title: tidyTitle(node.title),
        stage: labelsToStage(
          node.labels?.edges?.map((e) => e?.node?.name) ?? [],
        ),
        champion: node.assignees.nodes?.[0]?.login ?? node.author?.login,

        prUrl: `https://github.com/graphql/graphql-spec/pull/${node.number}`,

        events: [
          {
            type: "prCreated",
            date: node.createdAt,
            href: `https://github.com/graphql/graphql-spec/pull/${node.number}`,
            actor: node.author?.login ?? null,
          },
        ],
      });

      if (!firstPr) {
        firstPr = { number: node.number, updatedAt: node.updatedAt };
      }
      cursor = currentCursor;
    }
  } while (cursor);
  // state.mostRecentPr = firstPr;
}

async function syncRfcDocs(ctx: Ctx) {
  const { sdk, state } = ctx;
  const basePath = `${ROOT}/temp/wg/rfcs`;
  cd(basePath);
  const rfcDocs = await fs.readdir(basePath);
  await Promise.all(
    rfcDocs.map(async (doc) => {
      if (!doc.endsWith(".md")) return;
      if (doc.startsWith(".")) return;
      const fullPath = `${basePath}/${doc}`;
      const identifier = doc.substring(0, doc.length - 3);
      const content = await fs.readFile(fullPath, "utf8");
      const [header] = content.split("\n", 2);
      const [, createdAt, author] = (
        await $`git log --diff-filter=A --follow --format="%aI %an" ${doc}`
      ).stdout
        .trim()
        .match(/^([\S]+) ([\s\S]+)$/)!;
      console.log(identifier, fullPath, createdAt);

      await updateRfc(ctx, identifier, {
        title: tidyTitle(header),
        events: [
          {
            type: "docCreated",
            date: createdAt,
            href: `https://github.com/graphql/graphql-wg/blob/main/rfcs/${doc}`,
            actor: author,
          },
        ],
      });
    }),
  );
}

interface EventBase {
  type: string;
  date: string;
  href: string;
  actor: string | null;
}

interface PrCreatedEvent extends EventBase {
  type: "prCreated";
}
interface DocCreatedEvent extends EventBase {
  type: "docCreated";
}
interface WgAgendaEvent extends EventBase {
  type: "wgAgenda";
}

type Event = PrCreatedEvent | DocCreatedEvent | WgAgendaEvent;

async function updateRfc(
  ctx: Ctx,
  identifier: string,
  details: {
    title: string;
    stage?: "0" | "1" | "2" | "3" | "X" | "?";
    champion?: string;
    rfcDocUrl?: string;
    issueUrl?: string;
    prUrl?: string;
    events?: Event[];
  },
) {
  if (!identifier.match(/^[a-zA-Z0-9_]+$/)) {
    throw new Error(`Invalid RFC identifier: ${identifier}`);
  }
  let draftFrontmatter: Partial<Frontmatter> = {};
  let body: string = "";
  const filePath = `${ROOT}/rfcs/${identifier}.md`;
  try {
    ({ frontmatter: draftFrontmatter, body } = await readMd(filePath));
  } catch (e) {
    if (e.code === "ENOENT") {
      /* File doesn't exist yet; continue */
    } else {
      throw e;
    }
  }
  if (!draftFrontmatter.events) {
    draftFrontmatter.events = [];
  }
  if (details.title) {
    draftFrontmatter.fullTitle = details.title;
  }
  if (details.stage) {
    draftFrontmatter.stage = details.stage;
  }
  if (details.champion) {
    draftFrontmatter.champion = details.champion;
  }
  if (details.rfcDocUrl) {
    draftFrontmatter.rfcDocUrl = details.rfcDocUrl;
  }
  if (details.issueUrl) {
    draftFrontmatter.issueUrl = details.issueUrl;
  }
  if (details.prUrl) {
    draftFrontmatter.prUrl = details.prUrl;
  }
  if (details.events) {
    for (const event of details.events) {
      const existingMatchingEvent = draftFrontmatter.events.find(
        (e) => e.type === event.type && e.date === event.date,
      );
      if (!existingMatchingEvent) {
        draftFrontmatter.events.push(event);
      }
    }
  }
  // There must always be at least one key
  if (!draftFrontmatter.title) {
    draftFrontmatter.title = draftFrontmatter.fullTitle;
  }
  if (!draftFrontmatter.shortname) {
    draftFrontmatter.shortname = draftFrontmatter.fullTitle;
  }
  if (!draftFrontmatter.stage) {
    draftFrontmatter.stage = "0";
  }
  draftFrontmatter.identifier = identifier;
  draftFrontmatter.events.sort(
    (a, z) => Date.parse(z.date) - Date.parse(a.date),
  );

  assertFrontmatter(draftFrontmatter);
  const frontmatter = draftFrontmatter;

  const head = `\
## At a glance

- **Identifier**: ${formatIdentifier(frontmatter.identifier)}
- **Stage**: ${stageMarkdown(frontmatter.stage)}
- **Champion**: ${championMarkdown(frontmatter.champion)}
- **PR**: ${formatPr(frontmatter)}
`;

  const foot = `\
## Timeline

${frontmatter.events
  .map((event) => `- ` + formatTimelineEvent(event, frontmatter))
  .join("\n")}
`;

  await fs.writeFile(
    filePath,
    `\
---
${yaml.stringify(frontmatter).trim()}
---

${head.trim()}

<!-- BEGIN_CUSTOM_TEXT -->

${body.trim()}

<!-- END_CUSTOM_TEXT -->

${foot.trim()}
`,
  );
}

function labelsToStage(
  labels: (string | undefined)[],
): "0" | "1" | "2" | "3" | "X" | "?" {
  for (const label of labels) {
    if (!label) continue;
    const matches = label.match(/RFC\s*([0123X])/);
    if (matches) {
      return matches[1] as "0" | "1" | "2" | "3" | "X";
    }
  }
  return "?";
}

async function readMd(filePath: string) {
  const existing = await fs.readFile(filePath, "utf8");
  const matches = existing.match(
    /^---\n(?:([\s\S]+?)\n)?---\n(?:([\s\S]*)\n)?<!-- BEGIN_CUSTOM_TEXT -->\n(?:([\s\S]*)\n)?<!-- END_CUSTOM_TEXT -->\n([\s\S]*)$/,
  );
  if (!matches) {
    throw new Error(
      `Document '${filePath}' did not have the expected structure`,
    );
  }
  const [, rawFrontmatter, rawHead, rawCustom, rawFoot] = matches;
  const frontmatter = yaml.parse(rawFrontmatter.trim());
  const body = matches[3].trim();
  return { frontmatter, body };
}
interface Thing {
  frontmatter: Frontmatter;
  file: string;
  key: string;
}
async function generateIndexAndMeta(ctx: Ctx) {
  const files = await fs.readdir(`${ROOT}/rfcs`);
  const everything: Array<Thing> = [];
  for (const file of files) {
    if (file.startsWith(".")) continue;
    if (!file.endsWith(".md")) continue;
    if (file === "index.md") continue;
    const key = file.substring(0, file.length - 3);
    const filePath = `${ROOT}/rfcs/${file}`;
    const { frontmatter, body } = await readMd(filePath);
    everything.push({ frontmatter, file, key });
  }

  everything.sort((a, z) => {
    const s =
      stageWeight(z.frontmatter.stage) - stageWeight(a.frontmatter.stage);
    if (s !== 0) return s;
    const aOldestEvent = a.frontmatter.events[a.frontmatter.events.length - 1];
    const zOldestEvent = z.frontmatter.events[z.frontmatter.events.length - 1];
    const t = Date.parse(zOldestEvent.date) - Date.parse(aOldestEvent.date);
    if (t !== 0) return t;
    return 0;
  });

  const RFC0 = {
    type: "category",
    label: "Stage 0: Strawman",
    collapsed: true,
    collapsible: true,
    items: [] as SidebarItemConfig[],
  } satisfies SidebarItemConfig;
  const RFC1 = {
    type: "category",
    label: "Stage 1: Proposal",
    collapsed: false,
    collapsible: true,
    items: [] as SidebarItemConfig[],
  } satisfies SidebarItemConfig;
  const RFC2 = {
    type: "category",
    label: "Stage 2: Draft",
    collapsed: false,
    collapsible: true,
    items: [] as SidebarItemConfig[],
  } satisfies SidebarItemConfig;
  const RFC3 = {
    type: "category",
    label: "Stage 3: Accepted",
    collapsed: true,
    collapsible: true,
    items: [] as SidebarItemConfig[],
  } satisfies SidebarItemConfig;
  const RFCX = {
    type: "category",
    label: "Stage X: Rejected",
    collapsed: true,
    collapsible: true,
    items: [] as SidebarItemConfig[],
  } satisfies SidebarItemConfig;
  const RFCUnknown = {
    type: "category",
    label: "Other",
    collapsed: true,
    collapsible: true,
    items: [] as SidebarItemConfig[],
  } satisfies SidebarItemConfig;

  const sidebars = {
    rfcsSidebar: [
      {
        type: "doc",
        id: "index",
      },
      RFC3,
      RFC2,
      RFC1,
      RFC0,
      RFCX,
    ],
  } satisfies SidebarsConfig;
  for (const thing of everything) {
    const {
      key,
      frontmatter: { identifier, stage, shortname, champion },
    } = thing;
    const RFCCategory =
      stage === "0"
        ? RFC0
        : stage === "1"
          ? RFC1
          : stage === "2"
            ? RFC2
            : stage === "3"
              ? RFC3
              : stage === "X"
                ? RFCX
                : RFCUnknown;
    RFCCategory.items.push({
      type: "doc",
      id: key,
      label: `${identifier}${
        champion === "benjie" ? "*" : ""
      }: ${shortname} [RFC${stage}]`,
    });
  }

  if (RFCUnknown.items.length > 0) {
    sidebars.rfcsSidebar.push(RFCUnknown);
  }

  await fs.writeFile(
    `${ROOT}/sidebarsRfcs.js`,
    `\
// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = ${JSON5.stringify(sidebars, {
      replacer: null,
      space: 2,
      quote: '"',
    })};

export default sidebars;
`,
  );

  await fs.writeFile(
    `${ROOT}/rfcs/index.md`,
    `\
---
title: "GraphQL RFCs"
sidebar_position: 3
---

# GraphQL RFCs

The following is a rough tracker of GraphQL RFCs, compiled and maintained by
Benjie. It does not claim to be a complete, accurate, or up to date
representation of the RFCs; it is generated in part by automated scripts but may
be helpful for people to keep track of the various RFCs.

:::info Not up to date?

Ping \`@benjie\` on the [GraphQL Discord](https://discord.graphql.org) (\`#wg\`
channel) and ask for him to run an update!

:::

${printTables(everything)}
`,
  );
}

function stageWeight(stage: string | undefined): number {
  return stage === "3"
    ? -4
    : stage === "?" || stage == null
      ? -3
      : stage === "X"
        ? -2
        : stage === "0"
          ? -1
          : parseInt(stage, 10);
}

function tidyTitle(title: string): string {
  return title
    .trim()
    .replace(/^#+/, "")
    .trim()
    .replace(/^(?:\[RFC\]|RFC):?/i, "")
    .trim();
}

function stageMarkdown(
  stage: string | undefined,
  { prefix: rawPrefix, short }: { prefix?: string; short?: boolean } = {},
): string {
  const prefix = rawPrefix ?? (short ? "" : "RFC");
  switch (stage) {
    case "0":
      return short
        ? `${prefix}0/Strawman`
        : `[${prefix}0: Strawman](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman)`;
    case "1":
      return short
        ? `${prefix}1/Proposal`
        : `[${prefix}1: Proposal](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-1-proposal)`;
    case "2":
      return short
        ? `${prefix}2/Draft`
        : `[${prefix}2: Draft](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-2-draft)`;
    case "3":
      return short
        ? `${prefix}3/Accepted`
        : `[${prefix}3: Accepted](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-3-accepted)`;
    case "X":
      return short
        ? `${prefix}X/Rejected`
        : `[${prefix}X: Rejected](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-x-rejected)`;
    default:
      return "Unknown";
  }
}

function championMarkdown(champion: string | undefined): string {
  if (!champion) return "-";
  return `[@${champion}](https://github.com/${champion})`;
}

function formatIdentifier(identifier: string): string {
  if (String(parseInt(identifier, 10)) === identifier) {
    return `#${identifier}`;
  } else {
    return identifier;
  }
}

function formatTimelineEvent(event: Event, frontmatter: Frontmatter): string {
  switch (event.type) {
    case "prCreated":
      return `**[Spec PR](${event.href}) created** on ${formatDate(
        event.date,
      )} by ${event.actor ?? "unknown"}`;
    case "docCreated":
      return `**[RFC Document](${event.href}) created** on ${formatDate(
        event.date,
      )} by ${event.actor ?? "unknown"}`;
    case "wgAgenda":
      return `**Added to [${formatDate(event.date)} WG agenda](${
        event.href
      })**`;
    default: {
      const never: never = event;
      throw new Error(`Unexpected event ${JSON.stringify(never)}`);
    }
  }
}

// Format date as YYYY-MM-DD
function formatDate(date: string): string {
  const d = new Date(date);
  const pad = (n: number): string => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function printTables(everything: Thing[]) {
  const thingsByStage = {};
  for (const thing of everything) {
    const stage = thing.frontmatter.stage ?? "?";
    thingsByStage[stage] ??= [];
    thingsByStage[stage].push(thing);
  }
  const output: string[] = [];
  for (const stage of ["2", "1", "0", "3", "X", "?"]) {
    const things = thingsByStage[stage];
    if (things?.length) {
      output.push(`\
## ${stageMarkdown(stage, { prefix: "Stage " })}

${printTable(things)}

`);
    }
  }
  return output.join("\n\n");
}

function printTable(things: Thing[]) {
  const printRow = (thing: Thing) => {
    return `| [${formatIdentifier(thing.frontmatter.identifier)}](/rfcs/${
      thing.frontmatter.identifier
    }) | ${championMarkdown(thing.frontmatter.champion)} | ${
      thing.frontmatter.fullTitle ?? thing.frontmatter.title
    } | ${
      thing.frontmatter.prUrl ? `[Yes](${thing.frontmatter.prUrl})` : `No?`
    } | ${formatTimelineEvent(
      thing.frontmatter.events[thing.frontmatter.events.length - 1],
      thing.frontmatter,
    )} |`;
  };
  return `
<!-- prettier-ignore -->
| RFC | Champion | Title | Spec&nbsp;PR | Latest |
| --- | --- | --- | --- | --- |
${things.map(printRow).join("\n")}
`;
}
function formatPr(frontmatter: Frontmatter) {
  return frontmatter.prUrl
    ? `[${frontmatter.title ?? frontmatter.prUrl}](${frontmatter.prUrl})`
    : "-";
}

async function wgCmd(cmdline) {}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
