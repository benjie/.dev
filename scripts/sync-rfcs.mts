// RFCs come from GitHub Spec PRs, Issues, and from the GraphQL-WG RFCs folder.
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./sdk.mjs";
import * as fs from "node:fs/promises";
import { createHash } from "node:crypto";
import * as yaml from "yaml";
import { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import JSON5 from "json5";

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
  stage?: "0" | "1" | "2" | "3" | "X" | "?";
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

  await generateIndexAndMeta(ctx);
}

interface EventBase {
  type: string;
  date: string;
  href: string;
}

interface PrCreatedEvent extends EventBase {
  type: "prCreated";
}
interface WgAgendaEvent extends EventBase {
  type: "wgAgenda";
}

type Event = PrCreatedEvent | WgAgendaEvent;

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
    draftFrontmatter.title = `${formatIdentifier(identifier)}: ${
      draftFrontmatter.fullTitle
    }`;
  }
  if (!draftFrontmatter.shortname) {
    draftFrontmatter.shortname = draftFrontmatter.fullTitle;
  }
  draftFrontmatter.identifier = identifier;
  draftFrontmatter.events.sort(
    (a, z) => Date.parse(z.date) - Date.parse(a.date),
  );

  assertFrontmatter(draftFrontmatter);
  const frontmatter = draftFrontmatter;

  const head = `\
## At a glance

- **Stage**: ${stageMarkdown(frontmatter.stage)}
- **Champion**: ${championMarkdown(frontmatter.champion)}
- **PR**: ${
    frontmatter.prUrl
      ? `[${frontmatter.title ?? frontmatter.prUrl}](${frontmatter.prUrl})`
      : "-"
  }
`;

  const foot = `\
## Timeline

${frontmatter.events
  .map((event) => formatTimelineEvent(event, frontmatter))
  .join("\n")}
`;

  await fs.writeFile(
    filePath,
    `\
---
${yaml.stringify(frontmatter).trim()}
---
${head}

<!-- BEGIN_CUSTOM_TEXT -->

${body}

<!-- END_CUSTOM_TEXT -->

${foot}
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

async function generateIndexAndMeta(ctx: Ctx) {
  const files = await fs.readdir(`${ROOT}/rfcs`);
  const everything: Array<{
    frontmatter: Frontmatter;
    file: string;
    key: string;
  }> = [];
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

  const sidebars: SidebarsConfig = {
    rfcsSidebar: [
      {
        type: "category",
        label: "GraphQL RFCs",
        collapsed: false,
        collapsible: false,
        items: [],
        link: {
          type: "doc",
          id: "index",
        },
      },
    ],
  };
  for (const thing of everything) {
    const {
      key,
      frontmatter: { identifier, stage, shortname, champion },
    } = thing;
    const hide =
      stage === "X" ||
      stage === "?" ||
      ((stage === "3" || stage === "0") && champion !== "benjie");
    if (!hide) {
      sidebars.rfcsSidebar[0].items.push({
        type: "doc",
        id: key,
        label: `${identifier}${
          champion === "benjie" ? "*" : ""
        }: ${shortname} [RFC${stage}]`,
      });
    }
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

Note: to prevent the sidebar being too large, only the RFC1/RFC2 RFCs and those
authored by Benjie are shown. All tracked RFCs are linked in the table below.
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
  return title.replace(/^(?:\[RFC\]|RFC):?/i, "").trim();
}

function stageMarkdown(stage: string | undefined): string {
  switch (stage) {
    case "0":
      return `[RFC0: Strawman](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman)`;
    case "1":
      return `[RFC1: Proposal](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-1-proposal)`;
    case "2":
      return `[RFC2: Draft](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-2-draft)`;
    case "3":
      return `[RFC3: Accepted](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-3-accepted)`;
    case "X":
      return `[RFCX: Rejected](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-x-rejected)`;
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
      return `- **[Spec PR](${event.href}) created**: ${formatDate(
        event.date,
      )}`;
    case "wgAgenda":
      return `- **Added to [${formatDate(event.date)} WG agenda](${
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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
