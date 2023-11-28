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
  rfcs: Record<string, RFCFile>;
}

interface Frontmatter {
  title: string;
  identifier: string;
  /** Append only */
  events: Event[];
  /** Human controlled */
  shortname?: string;
  stage: "0" | "1" | "2" | "3" | "X" | "?";
  champion?: string;
  //createdAt?: string;
  //updatedAt?: string;
  prUrl?: string;
  rfcDocUrl?: string;
  issueUrl?: string;
  /** Human controlled */
  superceded?: {
    /** identifier */
    by: string;
    date: string;
  };
  /** Append only, comma-separated list */
  related?: string;
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
  const ctx: Ctx = { state, sdk, rfcs: Object.create(null) };
  await loadRfcs(ctx);
  await syncRfcPRs(ctx);
  await syncRfcDocs(ctx);
  await writeRfcs(ctx);
  await generateIndexAndMeta(ctx);
  await saveState(ctx.state);
}

async function loadRfcs(ctx: Ctx) {
  const files = await fs.readdir(`${ROOT}/rfcs`);
  for (const file of files) {
    if (file.startsWith(".")) continue;
    if (!file.endsWith(".md")) continue;
    if (file === "index.md") continue;
    const identifier = file.substring(0, file.length - 3);
    const filePath = `${ROOT}/rfcs/${file}`;
    const { frontmatter, body, verbatim } = await readMd(filePath);
    ctx.rfcs[identifier] = {
      frontmatter,
      filePath,
      identifier,
      body,
      verbatim,
    };
  }
}

async function writeRfcs(ctx: Ctx) {
  for (const rfc of Object.values(ctx.rfcs)) {
    const { frontmatter, body, identifier, filePath, verbatim } = rfc;
    if (!frontmatter.shortname) {
      frontmatter.shortname = frontmatter.title;
    }
    if (!frontmatter.stage) {
      frontmatter.stage = "0";
    }
    frontmatter.identifier = identifier;
    frontmatter.events.sort((a, z) => Date.parse(z.date) - Date.parse(a.date));

    const head = `\
## At a glance

- **Identifier**: ${formatIdentifier(frontmatter.identifier)}
- **Stage**: ${stageMarkdown(frontmatter.stage)}
- **Champion**: ${championMarkdown(frontmatter.champion)}
- **PR**: ${formatPr(frontmatter)}
${
  frontmatter.related
    ? `- **Related**: ${printEachRelated(ctx, frontmatter.related).join(
        ", ",
      )}\n`
    : ``
}\
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

<!-- VERBATIM -->

${verbatim.trim()}
`,
    );
  }
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

      const identifier = `${node.number}`;
      await updateRfc(ctx, {
        identifier,
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

      ctx.rfcs[identifier].verbatim = `\
---

${sanitizeMarkdown(node.body)}
`;

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
      const gitResult = await $`git log --follow --format="%H %aI %an" ${doc}`;
      const commits = gitResult.stdout
        .split("\n")
        .filter((s) => s.trim() !== "");

      const events: Event[] = [];
      for (let i = 0, l = commits.length; i < l; i++) {
        const commit = commits[i];
        const [, hash, createdAt, author] = commit
          .trim()
          .match(/^([\S]+) ([\S]+) ([\s\S]+)$/)!;
        events.push({
          type: i === l - 1 ? "docCreated" : "docUpdated",
          date: createdAt,
          href: `https://github.com/graphql/graphql-wg/blob/${hash}/rfcs/${doc}`,
          actor: author,
        });
      }

      await updateRfc(ctx, {
        identifier,
        stage: "0",
        title: tidyTitle(header),
        events,
      });

      ctx.rfcs[identifier].verbatim = `\
---

${sanitizeMarkdown(content)}
`;
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
interface DocUpdatedEvent extends EventBase {
  type: "docUpdated";
}
interface WgAgendaEvent extends EventBase {
  type: "wgAgenda";
}

type Event = PrCreatedEvent | DocCreatedEvent | DocUpdatedEvent | WgAgendaEvent;

async function updateRfc(ctx: Ctx, details: Frontmatter) {
  const { identifier } = details;
  if (!identifier.match(/^[a-zA-Z0-9_]+$/)) {
    throw new Error(`Invalid RFC identifier: ${identifier}`);
  }
  if (!ctx.rfcs[identifier]) {
    ctx.rfcs[identifier] = {
      frontmatter: details,
      body: "",
      identifier,
      filePath: `${ROOT}/rfcs/${identifier}.md`,
      verbatim: "",
    };
  }
  const rfc = ctx.rfcs[identifier];
  const filePath = `${ROOT}/rfcs/${identifier}.md`;
  const { frontmatter } = rfc;
  if (!frontmatter.events) {
    frontmatter.events = [];
  }

  // Apply updates. Most keys overwrite, but some have special handling
  for (const key of Object.keys(details) as (keyof typeof details)[]) {
    if (key === "events") {
      if (details.events == null) continue;
      for (const event of details.events) {
        const existingMatchingEvent = frontmatter.events.find(
          (e) => e.type === event.type && e.date === event.date,
        );
        if (!existingMatchingEvent) {
          frontmatter.events.push(event);
        }
      }
    } else if (key === "related") {
      if (details.related == null) continue;
      const related = frontmatter.related
        ? new Set(frontmatter.related.split(",").map((s) => s.trim()))
        : new Set();
      for (const rel of details.related.split(",").map((s) => s.trim())) {
        related.add(rel);
      }
      frontmatter.related = Array.from(related).sort().join(", ");
      // These keys only replace if not already set
    } else if (["shortname", "superceded"].includes(key)) {
      if (details.superceded == null) continue;
      if (!frontmatter[key]) {
        frontmatter[key] = details[key] as any;
      }
    } else {
      if (details[key] == null) continue;
      frontmatter[key] = details[key] as any;
    }
  }
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
    /^---\n(?:([\s\S]+?)\n)?---\n(?:([\s\S]*?)\n)?<!-- BEGIN_CUSTOM_TEXT -->\n(?:([\s\S]*?)\n)?<!-- END_CUSTOM_TEXT -->\n([\s\S]*)$/,
  );
  if (!matches) {
    throw new Error(
      `Document '${filePath}' did not have the expected structure`,
    );
  }
  const [, rawFrontmatter, rawHead, rawCustom, rawFoot] = matches;
  const frontmatter = yaml.parse(rawFrontmatter.trim());
  const body = rawCustom.trim();
  const VERBATIM_SEARCH = "\n<!-- VERBATIM -->";
  const i = rawFoot.indexOf(VERBATIM_SEARCH);
  const verbatim =
    i >= 0 ? rawFoot.slice(i + VERBATIM_SEARCH.length).trim() : "";

  return { frontmatter, body, verbatim };
}

interface RFCFile {
  frontmatter: Frontmatter;
  /** The full path to the file */
  filePath: string;
  /** The RFC identifier */
  identifier: string;
  /** The human-written body */
  body: string;
  /** A large amount of markdown text that may be updated from time to time (e.g. the PR description) */
  verbatim: string;
}

async function generateIndexAndMeta(ctx: Ctx) {
  const everything = Object.values(ctx.rfcs);

  everything.sort((a, z) => {
    const r =
      (a.frontmatter.superceded ? 1 : 0) - (z.frontmatter.superceded ? 1 : 0);
    if (r !== 0) return r;
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
      identifier,
      frontmatter: { stage, shortname, champion },
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
      id: identifier,
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
      return `**[RFC document created](${event.href})** on ${formatDate(
        event.date,
      )} by ${event.actor ?? "unknown"}`;
    case "docUpdated":
      return `**[RFC document updated](${event.href})** on ${formatDate(
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

function printTables(everything: RFCFile[]) {
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

function printTable(things: RFCFile[]) {
  const printRow = (thing: RFCFile) => {
    return `| [${formatIdentifier(thing.frontmatter.identifier)}](/rfcs/${
      thing.frontmatter.identifier
    }) | ${championMarkdown(thing.frontmatter.champion)} | ${
      thing.frontmatter.title
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

function printEachRelated(ctx: Ctx, related: string): string[] {
  const { rfcs } = ctx;
  const identifiers = related.split(",").map((s) => s.trim());
  return identifiers.map(
    (identifier) =>
      `[${formatIdentifier(identifier)}](/rfcs/${identifier}) (${
        rfcs[identifier].frontmatter.shortname
      })`,
  );
}

function sanitizeMarkdown(md: string | null | undefined): string {
  if (md == null) return "";
  const escapeUrl = (url: string) => {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      return url;
    } else {
      // Make it relative
      return `https://github.com/graphql/graphql-wg/raw/main/rfcs/${url}`;
    }
  };
  return md
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/<([^>]*)>/g, (_, t) => `[${t}]($t)`)
    .replace(/{([^}]*)}/g, (_, t) => `\\{${t}\\}`)
    .replace(
      /!\[([^\]]*)\]\(([^)]*)\)/g,
      (_, alt, href) => `![${alt}](${escapeUrl(href)})`,
    );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
