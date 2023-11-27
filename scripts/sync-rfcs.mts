// RFCs come from GitHub Spec PRs, Issues, and from the GraphQL-WG RFCs folder.
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./sdk.mjs";

const graphqlClient = new GraphQLClient("https://api.github.com/graphql", {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
});

async function main() {
  const sdk = getSdk(graphqlClient);
  const prs = await sdk.GetSpecPRs();
  console.dir(prs);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
