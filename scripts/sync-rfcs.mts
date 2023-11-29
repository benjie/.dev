// RFCs come from GitHub Spec PRs, Issues, and from the GraphQL-WG RFCs folder.
import { GraphQLClient } from "graphql-request";
import { getSdk, SpecPrCommitFragment } from "./sdk.mjs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { createHash } from "node:crypto";
import * as yaml from "yaml";
import { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import { SidebarItemConfig } from "@docusaurus/plugin-content-docs/lib/sidebars/types";
import JSON5 from "json5";
import { $, cd } from "zx";
import { glob } from "glob";

const __dirname = new URL(".", import.meta.url).pathname;
const ROOT = path.resolve(__dirname, "..");

const CACHE_ENABLED = true;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const CACHE_DURATION = 15 * MINUTE;
const ALLOW_EMBED: Array<string | undefined> = [
  "benjie",
  "eapache",
  "fotoetienne",
  "ivangoncharov",
  "leebyron",
  "magicmark",
  "martinbonnin",
  "mike-marcacci",
  "mjmahone",
  "olegilyenko",
  "robrichard",
  "saerdnaer",
  "spawnia",
  "stubailo",
  "taion",
  "tgriesser",
  "twof",
  "victorandree",
  "yaacovcr",
].map((s) => s?.toLowerCase());

const graphqlClient = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

interface IssueLikeUpdate {
  number: number;
  updatedAt: string;
}

interface State {
  mostRecentPr?: IssueLikeUpdate;
  mostRecentWgDiscussion?: IssueLikeUpdate;
  cache?: Record<
    string,
    {
      timestamp: number;
      content: any;
    }
  >;
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
  shortname: string;
  stage: "0" | "1" | "2" | "3" | "X" | null;
  champion?: string;
  //createdAt?: string;
  //updatedAt?: string;
  prUrl?: string;
  rfcDocUrl?: string;
  issueUrl?: string;
  wgDiscussionUrl?: string;
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
  if (
    cache[signature] &&
    cache[signature].timestamp > Date.now() - CACHE_DURATION
  ) {
    console.log("Cache hit");
    return cache[signature].content;
  } else {
    console.log("Cache miss; calling fn");
    const result = await fn(...args);
    cache[signature] = {
      timestamp: Date.now(),
      content: result,
    };
    return result;
  }
}

async function main() {
  const state = await loadState();
  const sdk = getSdk(graphqlClient);
  const ctx: Ctx = { state, sdk, rfcs: Object.create(null) };
  await loadRfcs(ctx);
  await syncRfcPRs(ctx);
  // await syncRfcIssues(ctx);
  await syncRfcDiscussions(ctx);
  await syncRfcDocs(ctx);
  await findMentions(ctx);
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
    if (file === "activity.md") continue;
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
  const relatedByIdentifier: Record<string, Set<string>> = {};

  // Cross-polinate the relateds
  for (const rfc of Object.values(ctx.rfcs)) {
    const { frontmatter, body, identifier, filePath, verbatim } = rfc;
    relatedByIdentifier[identifier] = parseRelated(frontmatter.related);
  }
  for (const [identifier, related] of Object.entries(relatedByIdentifier)) {
    for (const rel of related) {
      relatedByIdentifier[rel]?.add(identifier);
    }
  }

  for (const rfc of Object.values(ctx.rfcs)) {
    const { frontmatter, body, identifier, filePath, verbatim } = rfc;
    frontmatter.related = [...relatedByIdentifier[identifier]]
      .sort()
      .join(", ");
    if (frontmatter.related.length === 0) {
      delete frontmatter.related;
    }
    if (!frontmatter.shortname) {
      frontmatter.shortname = frontmatter.title;
    }
    if (!frontmatter.stage) {
      frontmatter.stage = "0";
    }
    frontmatter.identifier = identifier;
    frontmatter.events.sort((a, z) => Date.parse(z.date) - Date.parse(a.date));

    const related = frontmatter.related
      ? printEachRelated(ctx, frontmatter.related)
      : [];

    const head = `\
## At a glance

- **Identifier**: ${formatIdentifier(frontmatter.identifier)}
- **Stage**: ${stageMarkdown(frontmatter.stage)}
- **Champion**: ${githubUsernameMarkdown(frontmatter.champion)}
- **PR**: ${formatPr(frontmatter)}
${
  related.length > 0
    ? `- **Related**:\n${related.map((r) => `  - ${r}`).join("\n")}
`
    : ``
}\
`;

    const foot = `\
## Timeline

${frontmatter.events
  .map(
    (event) =>
      `- ` +
      formatTimelineEvent(event, frontmatter, true).replace(/\n/g, "\n  "),
  )
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
  let firstIssueLike: IssueLikeUpdate | undefined;
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

      const events: Event[] = [];
      events.push({
        type: "prCreated",
        date: node.createdAt,
        href: `https://github.com/graphql/graphql-spec/pull/${node.number}`,
        actor: node.author?.login ?? null,
      });

      // Group commits by date
      const commitsByDate = Object.create(null) as Record<
        string,
        SpecPrCommitFragment[]
      >;

      for (const commitEdge of node.commits.edges ?? []) {
        const date = commitEdge?.node?.commit?.authoredDate;
        if (!date) continue;
        const truncatedDate = date.substring(0, 10);
        commitsByDate[truncatedDate] ??= [];
        commitsByDate[truncatedDate].push(commitEdge.node!.commit);
      }

      for (const [date, commits] of Object.entries(commitsByDate)) {
        const href = commits[0].commitUrl;

        const lastCommit = commits[commits.length - 1];

        events.push({
          type: "commitsPushed",
          date,
          href,
          actor:
            lastCommit.author?.user?.login ?? lastCommit.author?.name ?? null,
          commits: commits.map((commit) => {
            return {
              href: commit.commitUrl,
              headline: commit.messageHeadline,
              ghUser: commit.author?.user?.login ?? null,
              authorName: commit.author?.name ?? null,
            };
          }),
        });
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

        events,
        related: getRelated(node.body, ""),
      });

      ctx.rfcs[identifier].verbatim = ALLOW_EMBED.includes(
        node.author?.login.toLowerCase(),
      )
        ? `\
---

${sanitizeMarkdown(node.body, identifier)}
`
        : `---\n\n(Embedding not enabled for ${node.author?.login})`;

      if (!firstIssueLike) {
        firstIssueLike = { number: node.number, updatedAt: node.updatedAt };
      }
      cursor = currentCursor;
    }
  } while (cursor);
  // state.mostRecentPr = firstIssueLike;
}

async function syncRfcDiscussions(ctx: Ctx) {
  const { sdk, state } = ctx;
  let firstDiscussion: IssueLikeUpdate | undefined;
  let cursor: string | undefined;
  let stop = state.mostRecentWgDiscussion?.updatedAt
    ? Date.parse(state.mostRecentWgDiscussion.updatedAt)
    : new Date(1970, 1, 1);
  do {
    const prs = await cache(ctx, sdk.GetWgDiscussions, { after: cursor });
    // Stop unless a new cursor is found
    cursor = undefined;
    const edges = prs.organization?.repository?.discussions.edges;
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

      const identifier = `wg${node.number}`;
      await updateRfc(ctx, {
        identifier,
        title: tidyTitle(node.title),
        stage:
          labelsToStage(node.labels?.edges?.map((e) => e?.node?.name) ?? []) ??
          "0",
        champion: node.author?.login,

        wgDiscussionUrl: `https://github.com/graphql/graphql-wg/discussions/${node.number}`,

        events: [
          {
            type: "wgDiscussionCreated",
            date: node.createdAt,
            href: `https://github.com/graphql/graphql-wg/discussions/${node.number}`,
            actor: node.author?.login ?? null,
          },
        ],
        related: getRelated(node.body, "wg"),
      });

      ctx.rfcs[identifier].verbatim = ALLOW_EMBED.includes(
        node.author?.login.toLowerCase(),
      )
        ? `\
---

${sanitizeMarkdown(node.body, identifier)}
`
        : `---\n\n(Embedding not enabled for ${node.author?.login})`;

      if (!firstDiscussion) {
        firstDiscussion = { number: node.number, updatedAt: node.updatedAt };
      }
      cursor = currentCursor;
    }
  } while (cursor);
  // state.mostRecentWgDiscussion = firstIssueLike;
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
      if (doc === "README.md") return;
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
        related: getRelated(content, "wg"),
      });

      ctx.rfcs[identifier].verbatim = `\
---

${sanitizeMarkdown(content, identifier)}
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
interface CommitsPushedEvent extends EventBase {
  type: "commitsPushed";
  commits: Array<{
    href: string;
    headline: string;
    ghUser: string | null;
    authorName: string | null;
  }>;
}
interface DocCreatedEvent extends EventBase {
  type: "docCreated";
}
interface DocUpdatedEvent extends EventBase {
  type: "docUpdated";
}
interface WgDiscussionCreatedEvent extends EventBase {
  type: "wgDiscussionCreated";
}
interface WgAgendaEvent extends EventBase {
  type: "wgAgenda";
}
interface WgNotesEvent extends EventBase {
  type: "wgNotes";
}

type Event =
  | PrCreatedEvent
  | DocCreatedEvent
  | DocUpdatedEvent
  | WgAgendaEvent
  | WgNotesEvent
  | WgDiscussionCreatedEvent
  | CommitsPushedEvent;

async function updateRfc(ctx: Ctx, details: Omit<Frontmatter, "shortname">) {
  const { identifier } = details;
  if (!identifier.match(/^[a-zA-Z0-9_]+$/)) {
    throw new Error(`Invalid RFC identifier: ${identifier}`);
  }
  const filePath = `${ROOT}/rfcs/${identifier}.md`;
  if (!ctx.rfcs[identifier]) {
    ctx.rfcs[identifier] = {
      frontmatter: { ...details, events: [], shortname: details.title },
      body: "",
      identifier,
      filePath,
      verbatim: "",
    };
  }
  const rfc = ctx.rfcs[identifier];
  const { frontmatter } = rfc;
  if (!frontmatter.events) {
    frontmatter.events = [];
  }

  // Apply updates. Most keys overwrite, but some have special handling
  for (const key of Object.keys(details) as (keyof typeof details)[]) {
    if (key === "events") {
      if (details.events == null) continue;
      for (const event of details.events) {
        addEvent(frontmatter, event);
      }
    } else if (key === "related") {
      if (details.related == null) continue;
      const related = parseRelated(frontmatter.related);
      for (const rel of parseRelated(details.related)) {
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
): "0" | "1" | "2" | "3" | "X" | null {
  for (const label of labels) {
    if (!label) continue;
    const matches = label.match(/RFC\s*([0123X])/);
    if (matches) {
      return matches[1] as "0" | "1" | "2" | "3" | "X";
    }
  }
  return null;
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
      {
        type: "doc",
        id: "activity",
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
title: "GraphQL RFC Tracker"
description: "Tracks the various GraphQL RFCs, their major events and status."
keywords: [graphql, rfc, rfcs, tracker, history, active, merged, spec, specification, wg, benjie]
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

  const allActivity = Object.values(ctx.rfcs)
    .flatMap((rfc) =>
      rfc.frontmatter.events.map((event) => ({
        event,
        frontmatter: rfc.frontmatter,
      })),
    )
    .sort((a, z) => Date.parse(z.event.date) - Date.parse(a.event.date));

  await fs.writeFile(
    `${ROOT}/rfcs/activity.md`,
    `\
---
title: "GraphQL RFC Tracker: Activity"
description: "Activity log of all tracked GraphQL RFCs"
---

# Activity overview

The below is an aggregate overview of the latest activity across all RFCs. Note that it's _roughly_ in cronological order, but some dates are less accurate than others (e.g. commit timestamps are to the second, whereas working groups are generally to the month...).

${allActivity
  .map(
    ({ event, frontmatter }) =>
      `- ${rfcLink(frontmatter)}: ${formatTimelineEvent(
        event,
        frontmatter,
        true,
      ).replace(/\n/g, "\n  ")}`,
  )
  .join("\n")}
`,
  );
}

function rfcLink(
  frontmatter: { identifier: string; shortname: string; stage: string | null },
  length: "supershort" | "normal" | "expanded" = "normal",
) {
  return `[${formatIdentifier(
    frontmatter.identifier,
    length === "supershort",
  )}](/rfcs/${frontmatter.identifier} "${lossilyEscapeMd(
    frontmatter.shortname,
  ).replace(/"/g, "“")} / RFC${frontmatter.stage ?? "?"}")${
    length === "expanded" ? ` (${lossilyEscapeMd(frontmatter.shortname)})` : ``
  }`;
}

function stageWeight(stage: string | undefined): number {
  return stage === "3"
    ? -4
    : stage == null
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

function githubUsernameMarkdown(champion: string | undefined): string {
  if (!champion) return "-";
  return `[@${champion}](https://github.com/${champion})`;
}

function formatIdentifier(identifier: string, truncate = false): string {
  const raw = _formatIdentifier(identifier);
  const TRUNCATE_SIZE = 15;
  if (truncate && raw.length > TRUNCATE_SIZE) {
    return `${raw.substring(0, TRUNCATE_SIZE - 2)}…`;
  } else {
    return raw;
  }
}
function _formatIdentifier(identifier: string): string {
  if (String(parseInt(identifier, 10)) === identifier) {
    return `#${identifier}`;
  } else if (
    identifier.startsWith("wg") &&
    String(parseInt(identifier.substring(2), 10)) === identifier.substring(2)
  ) {
    return `wg#${identifier.substring(2)}`;
  } else {
    return identifier;
  }
}

function commitAuthorMarkdown(commit: {
  ghUser: string | null;
  authorName: string | null;
}) {
  return commit.ghUser
    ? githubUsernameMarkdown(commit.ghUser)
    : commit.authorName ?? "unknown";
}

function formatTimelineEvent(
  event: Event,
  frontmatter: Frontmatter,
  multiline: boolean,
): string {
  switch (event.type) {
    case "prCreated":
      return `**[Spec PR](${event.href}) created** on ${formatDate(
        event.date,
      )} by ${event.actor ?? "unknown"}`;
    case "commitsPushed":
      if (event.commits.length === 1) {
        const commit = event.commits[0];
        return `**Commit pushed**: [${lossilyEscapeMd(commit.headline)}](${
          commit.href
        }) on ${formatDate(event.date)} by ${commitAuthorMarkdown(commit)}`;
      } else if (!multiline) {
        const lastCommit = event.commits[event.commits.length - 1];
        return `**${event.commits.length} commits pushed**: [(latest)](${
          lastCommit.href
        }) on ${formatDate(event.date)} by ${commitAuthorMarkdown(lastCommit)}`;
      } else {
        return `**${event.commits.length} commits pushed** on ${formatDate(
          event.date,
        )}:
${event.commits
  .map(
    (commit) =>
      `- [${lossilyEscapeMd(commit.headline)}](${
        commit.href
      }) by ${commitAuthorMarkdown(commit)}`,
  )
  .join("\n")}`;
      }
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
    case "wgNotes":
      return `**Mentioned in [${formatDate(event.date)} WG notes](${
        event.href
      })**`;
    case "wgDiscussionCreated":
      return `**[WG discussion](${event.href}) created** on ${formatDate(
        event.date,
      )} by ${event.actor ?? "unknown"}`;
    default: {
      const never: never = event;
      throw new Error(`Unexpected event ${JSON.stringify(never)}`);
    }
  }
}

// Format date as YYYY-MM-DD
function formatDate(date: string): string {
  if (date.length <= 10) return date;
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
    return `| ${rfcLink(
      thing.frontmatter,
      "supershort",
    )} | ${githubUsernameMarkdown(
      thing.frontmatter.champion,
    )} | ${lossilyEscapeMd(thing.frontmatter.title)} | ${formatTimelineEvent(
      thing.frontmatter.events[0],
      thing.frontmatter,
      false,
    )} |`;
  };
  return `
<!-- prettier-ignore -->
| RFC | Champion | Title | Latest |
| --- | --- | --- | --- |
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
  const identifiers = [...parseRelated(related)];
  return identifiers
    .map((identifier) => {
      const target = rfcs[identifier];
      if (!target) return null;
      return rfcLink(target.frontmatter, "expanded");
    })
    .filter(Boolean) as string[];
}

function sanitizeMarkdown(
  md: string | null | undefined,
  identifier: string,
): string {
  if (md == null) return "";
  let current = 0;
  let escapedLine = "";
  let active: string | null = null;
  const backticks = [...md.matchAll(/`+/g)];
  for (const backtickMatch of backticks) {
    const position = backtickMatch.index!;
    const ticks = backtickMatch[0];
    if (active) {
      if (ticks === active) {
        // End of backticks
        active = null;
        escapedLine += md
          .substring(current, position)
          .replace(/\r\n/g, "\n")
          .replace(/\r/g, "\n");
        escapedLine += ticks;
        current = position + ticks.length;
      } else {
        if (ticks.length < 3 && active.length >= 3) {
          // Fully ignore
        } else if (ticks.length === 1 && active.length === 2) {
          // Fully ignore
        } else {
          console.log(
            `${identifier}: Skipping '${ticks}' !== '${active}' at ${position}`,
          );
        }
        // Ignore
      }
    } else {
      // Start of backticks
      active = ticks;
      escapedLine += escapeMdInner(md.substring(current, position));
      escapedLine += ticks;
      current = position + ticks.length;
    }
  }
  if (active) {
    throw new Error(
      `Mismatched backticks in '${identifier}.md'? Active: '${active}'`,
    );
  } else {
    escapedLine += escapeMdInner(md.substring(current, md.length));
  }
  if (Math.random() < 2) return escapedLine;
  const lines = md.split("\n");
  let inCodeBlock: string | null = null;
  const escapedLines: string[] = [];
  for (const line of lines) {
    const match = line.match(/^(```+)/);
    if (match) {
      if (inCodeBlock) {
        if (inCodeBlock === match[1]) {
          inCodeBlock = null;
          escapedLines.push(line);
          continue;
        }
      } else {
        inCodeBlock = match[1];
        escapedLines.push(line);
        continue;
      }
    }
    if (inCodeBlock) {
      escapedLines.push(line);
    } else {
      const backticks = [...line.matchAll(/`+/g)];
      /*
      // Strip out the backticks that don't match
      for (let i = 0; i < backticks.length; i++) {
        if (!active) {
          active = backticks[i][0];
        } else {
          if (backticks[i][0] !== active) {
            backticks.splice(i, 1);
            i--;
          }
        }
      }
      */
      let current = 0;
      let escapedLine = "";
      let active: string | null = null;
      for (const backtickMatch of backticks) {
        const position = backtickMatch.index!;
        const ticks = backtickMatch[0];
        if (active) {
          if (backtickMatch[0] === active) {
            // End of backticks
            active = null;
            escapedLine += line.substring(current, position);
            escapedLine += ticks;
            current = position + ticks.length;
          } else {
            // Ignore
          }
        } else {
          // Start of backticks
          active = ticks;
          escapedLine += escapeMdInner(line.substring(current, position));
          escapedLine += ticks;
          current = position + ticks.length;
        }
      }
      if (active) {
        throw new Error(
          `Mismatched backticks in '${identifier}.md'? (This could be because there's a newline inside backticks. We don't support that yet.)`,
        );
      }
      escapedLines.push(escapedLine);
    }
  }
  return escapedLines.join("\n");
}

const escapeUrl = (url: string) => {
  if (url.startsWith("https://") || url.startsWith("http://")) {
    return url;
  } else {
    // Make it relative
    return `https://github.com/graphql/graphql-wg/raw/main/rfcs/${url}`;
  }
};

const escapeMdInner = (s: string) =>
  s
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(
      /\[([^\]]+)\]\(<(https?:\/\/[^>]*)>\)/g,
      (_, t, l) => `${t} (${l})`,
    )
    .replace(/<(https?:\/\/[^>]*)>/g, (_, t) => `\`${t}\``)
    .replace(/[{<]/g, "\\$&")
    .replace(/\\<(\/?(?:details|summary|hr))\/?>/g, "<$1>")
    .replace(/\\<!-- prettier-ignore -->/g, "<!-- prettier-ignore -->")
    .replace(/<hr>/gi, (_, t) => `<hr/>`)
    .replace(
      /(import|require|eval|Function|export|class|const|var|let)(?![a-zA-Z])/g,
      "$&\u200b",
    )
    .replace(
      /!\[([^\]]*)\]\(([^)]*)\)/g,
      (_, alt, href) => `![${alt}](${escapeUrl(href)})`,
    );

function getRelated(markdown: string, prefix: string): string | undefined {
  const related = new Set<string>();
  for (const match of markdown.matchAll(
    /(?:builds on|fixes|relates to|replaces|supercedes|identical to|addresses) #([0-9]+)/gi,
  )) {
    related.add(`${prefix}${match[1]}`);
  }
  for (const match of markdown.matchAll(
    /https:\/\/github.com\/graphql\/graphql-(spec|wg)\/(?:pull|issues|discussions)\/([0-9]+)/gi,
  )) {
    const repo = match[1];
    related.add((repo === "wg" ? "wg" : "") + match[2]);
  }
  for (const match of markdown.matchAll(
    /https:\/\/github.com\/graphql\/graphql-wg\/blob\/main\/rfcs\/([A-Za-z0-9_-]+)\.md/gi,
  )) {
    related.add(match[1]);
  }

  if (related.size === 0) return undefined;
  else return [...related].join(", ");
}

function parseRelated(related: string | undefined): Set<string> {
  return related ? new Set(related.split(",").map((s) => s.trim())) : new Set();
}

async function findMentions(ctx: Ctx) {
  // Delete all existing mentions
  for (const rfc of Object.values(ctx.rfcs)) {
    rfc.frontmatter.events = rfc.frontmatter.events.filter(
      (e) => e.type !== "wgAgenda" && e.type !== "wgNotes",
    );
  }

  const agendas = await glob(`${ROOT}/temp/wg/agendas/**/*.md`);
  const notes = await glob(`${ROOT}/temp/wg/notes/**/*.md`);
  await Promise.all([
    ...agendas.map((agendaFile) => findInAgenda(ctx, agendaFile)),
    ...notes.map((notesFile) => findInNotes(ctx, notesFile)),
  ]);
}

async function findInAgenda(ctx: Ctx, filePath: string) {
  if (filePath.endsWith("README.md")) return;
  const content = await fs.readFile(filePath, "utf8");
  doMentions(ctx, filePath, content, "wgAgenda");
}

async function findInNotes(ctx: Ctx, filePath: string) {
  if (filePath.endsWith("README.md")) return;
  const content = await fs.readFile(filePath, "utf8");
  doMentions(ctx, filePath, content, "wgNotes");
}

function doMentions(
  ctx: Ctx,
  filePath: string,
  content: string,
  eventType: "wgNotes" | "wgAgenda",
) {
  const eventDate = getDateFromNoteOrAgendaFile(filePath);
  const path = filePath.substring(ROOT.length + "/temp/wg/".length);
  const href = `https://github.com/graphql/graphql-wg/blob/main/${path}`;
  for (const match of content.matchAll(
    /https:\/\/github.com\/graphql\/graphql-spec\/pull\/([0-9]+)/gi,
  )) {
    const identifier = match[1];
    const rfc = ctx.rfcs[identifier];
    if (rfc) {
      addEvent(rfc.frontmatter, {
        type: eventType,
        href,
        date: eventDate,
        actor: null,
      });
    }
  }
}

function getDateFromNoteOrAgendaFile(file: string): string {
  const numbers = file
    .substring(ROOT.length)
    .replace(/[^0-9-]+/g, "-")
    .replace(/-+/g, "-");
  const matches = numbers.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})(?![0-9])/);
  if (matches) {
    return matches[1];
  }
  const matches2 = numbers.match(/([0-9]{4})-([0-9]{2})(?![0-9])/);
  if (matches2) {
    const [, yyyy, mm] = matches2;
    //const date = new Date(
    //  parseInt(yyyy, 10),
    //  parseInt(mm, 10) - 1,
    //  1,
    //  12,
    //  0,
    //  0,
    //  0,
    //);
    //date.setMonth(date.getMonth() + 1);
    //date.setDate(date.getDate() - 1);
    return `${yyyy}-${mm}`;
  }
  throw new Error(`Couldn't extract date from ${file}`);
}

function lossilyEscapeMd(md: string): string {
  return md
    .replace(/[`\\]/g, "")
    .replace(/[{<[]/g, "\\$&")
    .replace(/&/g, "&amp;")
    .replace(/[^-a-zA-Z0-9:_/\\?!.,;{}<>[\]()'"\s@…#&+]+/g, "_");
}

function addEvent(frontmatter: Frontmatter, event: Event) {
  const existingMatchingEventIndex = frontmatter.events.findIndex(
    (e) => e.type === event.type && e.date === event.date,
  );
  if (existingMatchingEventIndex >= 0) {
    frontmatter.events[existingMatchingEventIndex] = event;
  } else {
    frontmatter.events.push(event);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
