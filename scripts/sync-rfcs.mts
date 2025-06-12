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
import { MDX, mdx } from "./mdx.mjs";

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
const RFC_TRACKER_IMAGE = "/img/rfc_tracker.png";

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
  stage: "0" | "1" | "2" | "3" | "X" | "S" | null;
  closedAt?: string;
  mergedAt?: string;
  mergedBy?: string;
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
  image?: string;
  /** If something was actually merged but doesn't come up as merged in GitHub, add this */
  weirdMerge?: boolean;
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
    frontmatter.image = RFC_TRACKER_IMAGE;

    const related: MDX[] = frontmatter.related
      ? printEachRelated(ctx, frontmatter.related)
      : [];

    const head = mdx`\
## At a glance

- **Identifier**: ${formatIdentifier(frontmatter.identifier)}
- **Stage**: ${frontmatterStageMarkdown(frontmatter)}
- **Champion**: ${githubUsernameMarkdown(frontmatter.champion)}
- **PR**: ${formatPr(frontmatter)}
${
  related.length > 0
    ? mdx`- **Related**:\n${mdx.join(
        related.map((r) => mdx`  - ${r}`),
        "\n",
      )}
`
    : mdx``
}\
`;

    const foot = mdx`\
## Timeline

${mdx.join(
  frontmatter.events.map(
    (event) =>
      mdx`- ${mdx.indent(formatTimelineEvent(event, frontmatter, true))}`,
  ),
  "\n",
)}
`;

    await fs.writeFile(
      filePath,
      mdx.compile(
        mdx`\
---
${mdx.trim(mdx.trusted(yaml.stringify(frontmatter)))}
---

${mdx.trim(head)}

<!-- BEGIN_CUSTOM_TEXT -->

${mdx.trim(mdx.trusted(body))}

<!-- END_CUSTOM_TEXT -->

${mdx.trim(foot)}

<!-- VERBATIM -->

${mdx.trim(mdx.trusted(verbatim))}
`,
        identifier,
      ),
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
        closedAt: node.closedAt,
        mergedAt: node.mergedAt,
        mergedBy: node.mergedBy?.login,
        title: tidyTitle(node.title),
        stage: labelsToStage(
          node.labels?.edges?.map((e) => e?.node?.name) ?? [],
          identifier,
        ),
        champion: node.assignees.nodes?.[0]?.login ?? node.author?.login,

        prUrl: `https://github.com/graphql/graphql-spec/pull/${node.number}`,

        events,
        related: getRelated(node.body, ""),
      });

      ctx.rfcs[identifier].verbatim = ALLOW_EMBED.includes(
        node.author?.login.toLowerCase(),
      )
        ? mdx.compile(
            mdx`\
---

${mdx.sanitize(node.body)}
`,
            identifier,
          )
        : mdx.compile(
            mdx`---\n\n(Embedding not enabled for ${mdx.escape(
              node.author?.login ?? "(unknown)",
            )})`,
            identifier,
          );

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
          labelsToStage(
            node.labels?.edges?.map((e) => e?.node?.name) ?? [],
            identifier,
          ) ?? "0",
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
        ? mdx.compile(
            mdx`\
---

${mdx.sanitize(node.body)}
`,
            identifier,
          )
        : mdx.compile(
            mdx`---\n\n(Embedding not enabled for ${mdx.escape(
              node.author?.login ?? "unknown",
            )})`,
            identifier,
          );

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

      ctx.rfcs[identifier].verbatim = mdx.compile(
        mdx`\
---

${mdx.sanitize(content)}
`,
        identifier,
      );
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
  for (const key of Object.keys(details) as (keyof Frontmatter)[]) {
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
    } else if (key === "shortname" || key === "superceded") {
      if (details.superceded == null) continue;
      if (!frontmatter[key]) {
        (frontmatter[key] as any) = details[key];
      }
    } else {
      if (details[key] == null) continue;
      (frontmatter[key] as any) = details[key];
    }
  }
}

function labelsToStage(
  labels: (string | undefined)[],
  identifier: string,
): "0" | "1" | "2" | "3" | "X" | "S" | null {
  let match: "0" | "1" | "2" | "3" | "X" | "S" | null = null;
  for (const label of labels) {
    if (!label) continue;
    const matches = label.match(/RFC\s*([0123X])/);
    if (matches) {
      let thisMatch: "0" | "1" | "2" | "3" | "X" | "S" | null = null;
      if (matches[1] === "X") {
        if (label.match(/Superseded/)) {
          thisMatch = "S";
        } else {
          thisMatch = "X";
        }
      } else {
        thisMatch = matches[1] as "0" | "1" | "2" | "3";
      }
      if (match === null) {
        match = thisMatch;
      } else if (thisMatch === "X" || thisMatch === "S") {
        // X overrides
        match = thisMatch;
      } else {
        throw new Error(
          `RFC ${identifier} has labels ${labels}, which matches both ${match} and ${thisMatch}.`,
        );
      }
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
    const c =
      (a.frontmatter.closedAt && !a.frontmatter.mergedAt ? 1 : 0) -
      (z.frontmatter.closedAt && !z.frontmatter.mergedAt ? 1 : 0);
    if (c !== 0) return c;
    const s =
      stageWeight(z.frontmatter.stage) - stageWeight(a.frontmatter.stage);
    if (s !== 0) return s;
    const aNewestEvent = a.frontmatter.events[0];
    const zNewestEvent = z.frontmatter.events[0];
    const t = Date.parse(zNewestEvent.date) - Date.parse(aNewestEvent.date);
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
  const RFC3_UNMERGED = {
    type: "category",
    label: "Stage 3: Accepted (pending edits)",
    collapsed: false,
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
  const RFCS = {
    type: "category",
    label: "Stage X: Superseded",
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
        label: "Activity",
      },
      RFC3,
      RFC3_UNMERGED,
      RFC2,
      RFC1,
      RFC0,
      RFCX,
      RFCS,
      RFCUnknown,
    ],
  } satisfies SidebarsConfig;
  for (const thing of everything) {
    const {
      identifier,
      frontmatter: {
        stage,
        shortname,
        champion,
        closedAt,
        mergedAt,
        weirdMerge,
      },
    } = thing;
    const RFCCategory =
      stage === "0"
        ? RFC0
        : stage === "1"
          ? RFC1
          : stage === "2"
            ? RFC2
            : stage === "3"
              ? mergedAt || closedAt
                ? RFC3
                : RFC3_UNMERGED
              : stage === "X"
                ? RFCX
                : stage === "S"
                  ? RFCS
                  : RFCUnknown;
    if (mergedAt && RFCCategory !== RFC3 && RFCCategory !== RFCS) {
      console.warn(
        `https://github.com/graphql/graphql-spec/pull/${identifier} (RFC${stage}) is merged; should it be RFC3? (Or, if just an RFC doc, RFCS since it is "superseded" with the doc itself.)`,
      );
    }
    if (
      closedAt &&
      !mergedAt &&
      RFCCategory !== RFCX &&
      RFCCategory !== RFCS &&
      !weirdMerge
    ) {
      console.warn(
        `https://github.com/graphql/graphql-spec/pull/${identifier} (RFC${stage}) is closed; should it be RFCX/S?`,
      );
    }
    RFCCategory.items.push({
      type: "doc",
      id: identifier,
      label: `${identifier}${
        champion === "benjie" ? "*" : ""
      }: ${shortname} [RFC${stage}]`,
    });
  }

  // Remove empty sidebars
  sidebars.rfcsSidebar = sidebars.rfcsSidebar.filter(
    (s) => s.type !== "category" || s.items.length > 0,
  );

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
    mdx.compile(
      mdx`\
---
title: "GraphQL RFC Tracker"
description: "Tracks the various GraphQL RFCs, their major events and status."
keywords: [graphql, rfc, rfcs, tracker, history, active, merged, spec, specification, wg, benjie]
image: ${mdx.trusted(RFC_TRACKER_IMAGE)}
---

# GraphQL RFC Tracker

The following is a rough tracker of GraphQL RFCs, compiled and maintained by
Benjie. It does not claim to be a complete, accurate, or up to date
representation of the RFCs; it is generated in part by automated scripts but may
be helpful for people to keep track of the various RFCs.

:::info Not up to date?

Ping \`@benjie\` on the [GraphQL Discord](https://discord.graphql.org) (\`#wg\`
channel) and ask for him to run an update!

Last updated: ${mdx.trusted(new Date().toISOString())}

:::

${printTables(everything)}
`,
      "index.md",
    ),
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
    mdx.compile(
      mdx`\
---
title: "GraphQL RFC Tracker: Activity"
description: "Activity log of all tracked GraphQL RFCs"
image: ${mdx.trusted(RFC_TRACKER_IMAGE)}
---

# Activity overview

The below is an aggregate overview of the latest activity across all RFCs. Note that it's _roughly_ in cronological order, but some dates are less accurate than others (e.g. commit timestamps are to the second, whereas working groups are generally to the month...).

${mdx.join(
  allActivity.map(
    ({ event, frontmatter }) =>
      mdx`- ${rfcLink(frontmatter)}: ${mdx.indent(
        formatTimelineEvent(event, frontmatter, true),
      )}`,
  ),
  "\n",
)}
`,
      "activity",
    ),
  );
}

function rfcLink(
  frontmatter: {
    identifier: string;
    shortname: string;
    stage: string | null;
    closedAt?: string;
    mergedAt?: string;
  },
  length: "supershort" | "normal" | "expanded" = "normal",
): MDX {
  return mdx`[${formatIdentifier(
    frontmatter.identifier,
    length === "supershort",
  )}](${mdx.url(`/rfcs/${frontmatter.identifier}`)} "${mdx.linkDescription(
    frontmatter.shortname,
  )} / RFC${mdx.escape(frontmatter.stage ?? "?")}")${
    length === "expanded" ? mdx` (${mdx.escape(frontmatter.shortname)})` : mdx``
  }`;
}

function stageWeight(stage: string | null | undefined): number {
  return stage === "3"
    ? -5
    : stage == null
      ? -4
      : stage === "X"
        ? -3
        : stage === "S"
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

interface StageMarkdownOptions {
  prefix?: MDX;
  suffix?: MDX | null;
  short?: boolean;
}
function frontmatterStageMarkdown(
  frontmatter: Frontmatter,
  options: StageMarkdownOptions = {},
) {
  if (
    frontmatter.stage !== "3" &&
    frontmatter.closedAt &&
    !frontmatter.mergedAt
  ) {
    const { prefix: rawPrefix, short } = options;
    const prefix = rawPrefix ?? (short ? mdx`` : mdx`RFC`);
    return short
      ? mdx`${prefix}X/Closed`
      : mdx`[${prefix}X: Closed](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-x-rejected) ${mdx.escape(
          frontmatter.closedAt,
        )}`;
  }
  return stageMarkdown(frontmatter.stage, options);
}
function stageMarkdown(
  stage: string | null,
  { prefix: rawPrefix, suffix: rawSuffix, short }: StageMarkdownOptions = {},
): MDX {
  const prefix = rawPrefix ?? (short ? mdx`` : mdx`RFC`);
  const suffix = rawSuffix ?? mdx``;
  switch (stage) {
    case "0":
      return short
        ? mdx`${prefix}0/Strawman`
        : mdx`[${prefix}0: Strawman${suffix}](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman)`;
    case "1":
      return short
        ? mdx`${prefix}1/Proposal`
        : mdx`[${prefix}1: Proposal${suffix}](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-1-proposal)`;
    case "2":
      return short
        ? mdx`${prefix}2/Draft`
        : mdx`[${prefix}2: Draft${suffix}](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-2-draft)`;
    case "3":
      return short
        ? mdx`${prefix}3/Accepted`
        : mdx`[${prefix}3: Accepted${suffix}](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-3-accepted)`;
    case "X":
      return short
        ? mdx`${prefix}X/Rejected`
        : mdx`[${prefix}X: Rejected${suffix}](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-x-rejected)`;
    case "S":
      return short
        ? mdx`${prefix}X/Superseded`
        : mdx`[${prefix}X: Superseded${suffix}](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-x-rejected)`;
    default:
      return mdx`Unknown`;
  }
}

function githubUsernameMarkdown(champion: string | undefined): MDX {
  if (!champion) return mdx`-`;
  return mdx`[@${mdx.escape(champion)}](${mdx.url(
    `https://github.com/${champion}`,
  )})`;
}

function formatIdentifier(identifier: string, truncate = false): MDX {
  const raw = _formatIdentifier(identifier);
  const TRUNCATE_SIZE = 15;
  if (truncate && raw.length > TRUNCATE_SIZE) {
    return mdx`${mdx.escape(raw.substring(0, TRUNCATE_SIZE - 2))}…`;
  } else {
    return mdx.escape(raw);
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
}): MDX {
  return commit.ghUser
    ? githubUsernameMarkdown(commit.ghUser)
    : mdx.escape(commit.authorName ?? "unknown");
}

function formatTimelineEvent(
  event: Event,
  frontmatter: Frontmatter,
  multiline: boolean,
): MDX {
  switch (event.type) {
    case "prCreated":
      return mdx`**[Spec PR](${mdx.url(event.href)}) created** on ${formatDate(
        event.date,
      )} by ${mdx.escape(event.actor ?? "unknown")}`;
    case "commitsPushed":
      if (event.commits.length === 1) {
        const commit = event.commits[0];
        return mdx`**Commit pushed**: [${mdx.escape(
          commit.headline,
        )}](${mdx.url(commit.href)}) on ${formatDate(
          event.date,
        )} by ${commitAuthorMarkdown(commit)}`;
      } else if (!multiline) {
        const lastCommit = event.commits[event.commits.length - 1];
        return mdx`**${mdx.trusted(
          String(event.commits.length),
        )} commits pushed**: [(latest)](${mdx.url(
          lastCommit.href,
        )}) on ${formatDate(event.date)} by ${commitAuthorMarkdown(
          lastCommit,
        )}`;
      } else {
        return mdx`**${mdx.trusted(
          String(event.commits.length),
        )} commits pushed** on ${formatDate(event.date)}:
${mdx.join(
  event.commits.map(
    (commit) =>
      mdx`- [${mdx.escape(commit.headline)}](${mdx.url(
        commit.href,
      )}) by ${commitAuthorMarkdown(commit)}`,
  ),
  "\n",
)}`;
      }
    case "docCreated":
      return mdx`**[RFC document created](${mdx.url(
        event.href,
      )})** on ${formatDate(event.date)} by ${mdx.escape(
        event.actor ?? "unknown",
      )}`;
    case "docUpdated":
      return mdx`**[RFC document updated](${mdx.url(
        event.href,
      )})** on ${formatDate(event.date)} by ${mdx.escape(
        event.actor ?? "unknown",
      )}`;
    case "wgAgenda":
      return mdx`**Added to [${formatDate(event.date)} WG agenda](${mdx.url(
        event.href,
      )})**`;
    case "wgNotes":
      return mdx`**Mentioned in [${formatDate(event.date)} WG notes](${mdx.url(
        event.href,
      )})**`;
    case "wgDiscussionCreated":
      return mdx`**[WG discussion](${mdx.url(
        event.href,
      )}) created** on ${formatDate(event.date)} by ${mdx.escape(
        event.actor ?? "unknown",
      )}`;
    default: {
      const never: never = event;
      throw new Error(`Unexpected event ${JSON.stringify(never)}`);
    }
  }
}

// Format date as YYYY-MM-DD
function formatDate(date: string): MDX {
  if (date.length <= 10) return mdx.escape(date);
  const d = new Date(date);
  const pad = (n: number): string => String(n).padStart(2, "0");
  return mdx`${mdx.trusted(String(d.getFullYear()))}-${mdx.trusted(
    pad(d.getMonth() + 1),
  )}-${mdx.trusted(pad(d.getDate()))}`;
}

function printTables(everything: RFCFile[]) {
  const thingsByStage: Record<string, RFCFile[]> = {};
  for (const thing of everything) {
    const stage = thing.frontmatter.stage ?? "?";
    thingsByStage[stage] ??= [];
    thingsByStage[stage].push(thing);
  }
  const output: MDX[] = [];
  for (const spec of [
    ["3", true] as const,
    "2",
    "1",
    "0",
    ["3", false] as const,
    "S",
    "X",
    "?",
  ]) {
    const stage = Array.isArray(spec) ? spec[0] : spec;
    const needsEditorial = Array.isArray(spec) ? spec[1] : null;
    const unfilteredThings = thingsByStage[stage];
    const things =
      needsEditorial !== null
        ? unfilteredThings.filter(
            (t) =>
              (!t.frontmatter.mergedAt && !t.frontmatter.closedAt) ===
              needsEditorial,
          )
        : unfilteredThings;
    if (things?.length) {
      output.push(mdx`\
## ${stageMarkdown(stage, {
        prefix: mdx`Stage `,
        suffix: needsEditorial === true ? mdx` (pending editorial)` : null,
      })}

${printTable(things)}

`);
    }
  }
  return mdx.join(output, "\n\n");
}

function printTable(things: RFCFile[]): MDX {
  const printRow = (thing: RFCFile): MDX => {
    return mdx`| ${rfcLink(
      thing.frontmatter,
      "supershort",
    )} | ${githubUsernameMarkdown(thing.frontmatter.champion)} | [${mdx.escape(
      thing.frontmatter.title,
    )}](${mdx.url(
      `/rfcs/${thing.frontmatter.identifier}`,
    )}) | ${formatTimelineEvent(
      thing.frontmatter.events[0],
      thing.frontmatter,
      false,
    )} [_(more)_](${mdx.url(
      `/rfcs/${thing.frontmatter.identifier}#timeline`,
    )}) |`;
  };
  return mdx`
<!-- prettier-ignore -->
| RFC | Champion | Title | Latest |
| --- | --- | --- | --- |
${mdx.join(things.map(printRow), "\n")}
`;
}
function formatPr(frontmatter: Frontmatter) {
  return frontmatter.prUrl
    ? mdx`[${mdx.escape(frontmatter.title ?? frontmatter.prUrl)}](${mdx.url(
        frontmatter.prUrl,
      )})`
    : mdx`-`;
}

function printEachRelated(ctx: Ctx, related: string): MDX[] {
  const { rfcs } = ctx;
  const identifiers = [...parseRelated(related)];
  return identifiers
    .map((identifier) => {
      const target = rfcs[identifier];
      if (!target) return null;
      return rfcLink(target.frontmatter, "expanded");
    })
    .filter(Boolean) as MDX[];
}

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
