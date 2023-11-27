// RFCs come from GitHub Spec PRs, Issues, and from the GraphQL-WG RFCs folder.
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./sdk.mjs";
import * as fs from "node:fs/promises";
import { createHash } from "node:crypto";
import * as yaml from "yaml";

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

        // We cannot use the 'updatedAt' value otherwise every tiny nudge would
        // move each RFC to the top; we should only bump this when there are new
        // commits, or related activity (WG, etc)
        updatedAt: node.createdAt,

        prUrl: `https://github.com/graphql/graphql-spec/pulls/${node.number}`,
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

async function updateRfc(
  ctx: Ctx,
  identifier: string,
  details: {
    title: string;
    stage?: string;
    champion?: string;
    updatedAt?: string;
    rfcDocUrl?: string;
    issueUrl?: string;
    prUrl?: string;
  },
) {
  if (!identifier.match(/^[a-zA-Z0-9_]+$/)) {
    throw new Error(`Invalid RFC identifier: ${identifier}`);
  }
  let frontmatter: Record<string, any> = {};
  let body: string = "";
  const filePath = `${ROOT}/pages/rfcs/${identifier}.md`;
  try {
    ({ frontmatter, body } = await readMd(filePath));
  } catch (e) {
    if (e.code === "ENOENT") {
      /* File doesn't exist yet; continue */
    } else {
      throw e;
    }
  }
  if (details.title) {
    frontmatter.fullTitle = details.title;
  }
  if (details.stage) {
    frontmatter.stage = details.stage;
  }
  if (details.champion) {
    frontmatter.champion = details.champion;
  }
  if (details.updatedAt) {
    const newWhen = Date.parse(details.updatedAt);
    if (!frontmatter.updatedAt || Date.parse(frontmatter.updatedAt) < newWhen) {
      frontmatter.updatedAt = details.updatedAt;
    }
  }
  if (details.rfcDocUrl) {
    frontmatter.rfcDocUrl = details.rfcDocUrl;
  }
  if (details.issueUrl) {
    frontmatter.issueUrl = details.issueUrl;
  }
  if (details.prUrl) {
    frontmatter.prUrl = details.prUrl;
  }
  // There must always be at least one key
  if (!frontmatter.title) {
    frontmatter.title = `${identifier}: ${frontmatter.fullTitle}`;
  }
  if (!frontmatter.shortname) {
    frontmatter.shortname = frontmatter.fullTitle;
  }
  frontmatter.identifier = identifier;

  await fs.writeFile(
    filePath,
    `\
---
${yaml.stringify(frontmatter).trim()}
---
${body}\
`,
  );
}

function labelsToStage(labels: (string | undefined)[]): string {
  for (const label of labels) {
    if (!label) continue;
    const matches = label.match(/RFC\s*([0123X])/);
    if (matches) {
      return matches[1];
    }
  }
  return "?";
}

async function readMd(filePath: string) {
  const existing = await fs.readFile(filePath, "utf8");
  const frontmatterMatch = existing.match(/^---\n([\s\S]+?)\n---\n(.*)$/);
  if (!frontmatterMatch) {
    throw new Error(`Could not find frontmatter!`);
  }
  const frontmatter = yaml.parse(frontmatterMatch[1].trim());
  const body = frontmatterMatch[2];
  return { frontmatter, body };
}

async function generateIndexAndMeta(ctx: Ctx) {
  const files = await fs.readdir(`${ROOT}/pages/rfcs`);
  const everything: Array<{
    frontmatter: Record<string, any>;
    file: string;
    key: string;
  }> = [];
  for (const file of files) {
    if (file.startsWith(".")) continue;
    if (!file.endsWith(".md")) continue;
    if (file === "index.md") continue;
    const key = file.substring(0, file.length - 3);
    const filePath = `${ROOT}/pages/rfcs/${file}`;
    const { frontmatter, body } = await readMd(filePath);
    everything.push({ frontmatter, file, key });
  }

  everything.sort((a, z) => {
    const s =
      stageWeight(z.frontmatter.stage) - stageWeight(a.frontmatter.stage);
    if (s !== 0) return s;
    const t =
      Date.parse(z.frontmatter.updatedAt) - Date.parse(a.frontmatter.updatedAt);
    if (t !== 0) return t;
    return 0;
  });

  const obj = Object.create(null);
  const everythingSortedByKey = [...everything].sort((a, z) =>
    a.key.localeCompare(z.key, "en-US"),
  );
  for (const thing of everythingSortedByKey) {
    const {
      key,
      frontmatter: { identifier, stage, shortname, champion },
    } = thing;
    obj[key] = {
      title: `${identifier}${
        champion === "benjie" ? "*" : ""
      }: ${shortname} [RFC${stage}]`,
      href: `/rfcs/${identifier}`,
      ...(stage === "X" ||
      stage === "?" ||
      ((stage === "3" || stage === "0") && champion !== "benjie")
        ? { display: "hidden" }
        : null),
    };
  }

  await fs.writeFile(
    `${ROOT}/pages/rfcs/_meta.json`,
    JSON.stringify(obj, null, 2) + "\n",
  );

  await fs.writeFile(
    `${ROOT}/pages/rfcs/index.md`,
    `\
---
title: "GraphQL RFCs"
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

function stageWeight(stage: string): number {
  return stage === "3"
    ? -4
    : stage === "?"
    ? -3
    : stage === "X"
    ? -2
    : stage === "0"
    ? -1
    : 1;
}

function tidyTitle(title: string): string {
  return title.replace(/^(?:\[RFC\]|RFC):?/i, "").trim();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
