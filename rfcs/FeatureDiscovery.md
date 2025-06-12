---
identifier: FeatureDiscovery
stage: "0"
title: Feature Discovery
events:
  - type: docUpdated
    date: 2023-11-28T17:58:57+00:00
    href: https://github.com/graphql/graphql-wg/blob/5bfb8d590cc9693db1149b547d8db5041f05b731/rfcs/FeatureDiscovery.md
    actor: Benjie Gillam
  - type: docCreated
    date: 2023-08-19T03:02:15-07:00
    href: https://github.com/graphql/graphql-wg/blob/ced6f6f0566fcf06f775c2fb312ddbfbc47b9bf8/rfcs/FeatureDiscovery.md
    actor: Young Min Kim
related: 865, 895, wg839
shortname: Feature Discovery
image: /img/rfc_tracker.png
---

## At a glance

- **Identifier**: FeatureDiscovery
- **Stage**: [RFC0: Strawman](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman)
- **Champion**: -
- **PR**: -
- **Related**:
  - [#865](/rfcs/865 "Fragment Arguments (parameterized fragments) for GraphQL / RFCS") (Fragment Arguments (parameterized fragments) for GraphQL)
  - [#895](/rfcs/895 "Client Controlled Nullability / RFCX") (Client Controlled Nullability)

<!-- BEGIN_CUSTOM_TEXT -->



<!-- END_CUSTOM_TEXT -->

## Timeline

- **[RFC document updated](https://github.com/graphql/graphql-wg/blob/5bfb8d590cc9693db1149b547d8db5041f05b731/rfcs/FeatureDiscovery.md)** on 2023-11-28 by Benjie Gillam
- **[RFC document created](https://github.com/graphql/graphql-wg/blob/ced6f6f0566fcf06f775c2fb312ddbfbc47b9bf8/rfcs/FeatureDiscovery.md)** on 2023-08-19 by Young Min Kim

<!-- VERBATIM -->

---

> # RFC: Feature Discovery
> 
> **Proposed by:**
> 
> - [Young Min Kim](https://github.com/aprilrd) - The Trade Desk
> 
> This RFC provides a way for the clients to determine if a GraphQL server supports a feature that cannot be discovered through the current GraphQL introspection functionality.
> 
> ## 📜 Problem Statement
> 
> Thus far, a GraphQL client could use the [schema introspection](https://spec.graphql.org/draft/#sec-Schema-Introspection.Schema-Introspection-Schema) to check if a feature is available on a server. For example, a client can discover Defer/Stream through the `directives` field and Input Union through the `mutationType` field.
> 
> However, some new GraphQL features such as Client Controlled Nullability, Fragment Arguments, and Fragment Modularity change the syntax of the GraphQL documents, which cannot be described via the existing schema introspection. We would like a way to describe a server's supported feature set in an unambigous way.
> 
> ## ✅ RFC Goals
> 
> - A unambigous way to describe a supported feature set
> - Open a path for developer tools to validate documents based on the target server's supported features
> 
> ## 🚫 RFC Non-goals
> 
> - TBD
> 
> ## 🗿 Prior Art
> 
> A GraphQL client can choose to test the support by requesting a document with the specific feature and checking errors in response. However, this method requires a client to understand how a server can fail given a specific unsupported feature; how a server returns an error for an unknown syntax (`Syntax Error: Expected Name, found !`) is different from how a server returns an error for an unknown directive (`Unknown directive "defer".`). So the status quo is not acceptable.
> 
> ## Related Issues
> 
> * Client Controlled Nullability: https://github.com/graphql/graphql-spec/pull/895
> * Fragment Arguments: https://github.com/graphql/graphql-spec/pull/865
> * Fragment Modularity: https://github.com/graphql/graphql-wg/pull/839
> 
> ## 🧑‍💻 Proposed Solution
> 
> TBD
> 
> ### Option A: Extending a schema for schema introspection
> 
> We can add a new field `__features` under the `__Schema` type. `__features` can return a list of features in some shape.
> 
> ### Option B: Add a new root-level meta field next to `__schema` and `__type`
> 
> `__feature` will take an argument for a feature name such as `non-nullable-designator` and returns _some info_ or `null`.
> 
> ### Option C: TBD
