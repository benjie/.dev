---
identifier: ClientControlledNullability
stage: "0"
title: "NOTE: this document is not being worked on at the moment, instead the
  Nullability WG are currently exploring an alternative solution that addresses
  many of the same underlying issues in a different way: [Semantic Nullability
  RFC](SemanticNullability.md)."
events:
  - type: docUpdated
    date: 2025-02-24T18:01:28+01:00
    href: https://github.com/graphql/graphql-wg/blob/bc70c2c1aa125456449473a0b6d377462141fe2b/rfcs/ClientControlledNullability.md
    actor: Martin Bonnin
  - type: docUpdated
    date: 2023-11-28T18:43:39+00:00
    href: https://github.com/graphql/graphql-wg/blob/ca0fc775c66ae0e31c4ed605503a2679d9390705/rfcs/ClientControlledNullability.md
    actor: Benjie Gillam
  - type: docUpdated
    date: 2023-08-03T00:39:21-07:00
    href: https://github.com/graphql/graphql-wg/blob/64c7f2e88b018de61763c780294d887b3c593b1e/rfcs/ClientControlledNullability.md
    actor: Calvin Cestari
  - type: docUpdated
    date: 2022-05-16T01:51:55-07:00
    href: https://github.com/graphql/graphql-wg/blob/e975ecc5c67a07e6074550f21b60751d32be7d27/rfcs/ClientControlledNullability.md
    actor: Alex Reilly
  - type: docCreated
    date: 2021-11-04T10:16:37-07:00
    href: https://github.com/graphql/graphql-wg/blob/c24d2a3474418d159cb17f147e9a53bef37e0bc6/rfcs/ClientControlledNullability.md
    actor: Alex Reilly
related: 867, 895, FragmentModularity, wg1394, wg864
shortname: Client Controlled Nullability
image: /img/rfc_tracker.png
---

## At a glance

- **Identifier**: ClientControlledNullability
- **Stage**: [RFC0: Strawman](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman)
- **Champion**: -
- **PR**: -
- **Related**:
  - [#895](/rfcs/895 "Client Controlled Nullability / RFCX") (Client Controlled Nullability)
  - [FragmentModularity](/rfcs/FragmentModularity "Fragment Modularity / RFC0") (Fragment Modularity)
  - [wg#1394](/rfcs/wg1394 "True Nullability Schema / RFC0") (True Nullability Schema)

<!-- BEGIN_CUSTOM_TEXT -->



<!-- END_CUSTOM_TEXT -->

## Timeline

- **[RFC document updated](https://github.com/graphql/graphql-wg/blob/bc70c2c1aa125456449473a0b6d377462141fe2b/rfcs/ClientControlledNullability.md)** on 2025-02-24 by Martin Bonnin
- **[RFC document updated](https://github.com/graphql/graphql-wg/blob/ca0fc775c66ae0e31c4ed605503a2679d9390705/rfcs/ClientControlledNullability.md)** on 2023-11-28 by Benjie Gillam
- **[RFC document updated](https://github.com/graphql/graphql-wg/blob/64c7f2e88b018de61763c780294d887b3c593b1e/rfcs/ClientControlledNullability.md)** on 2023-08-03 by Calvin Cestari
- **[RFC document updated](https://github.com/graphql/graphql-wg/blob/e975ecc5c67a07e6074550f21b60751d32be7d27/rfcs/ClientControlledNullability.md)** on 2022-05-16 by Alex Reilly
- **[RFC document created](https://github.com/graphql/graphql-wg/blob/c24d2a3474418d159cb17f147e9a53bef37e0bc6/rfcs/ClientControlledNullability.md)** on 2021-11-04 by Alex Reilly

<!-- VERBATIM -->

---

> NOTE: this document is not being worked on at the moment, instead the Nullability WG are currently exploring an alternative solution that addresses many of the same underlying issues in a different way: [Semantic Nullability RFC](SemanticNullability.md).
> 
> --- 
> 
> # RFC: Client Controlled Nullability
> 
> **Proposed by:**
> 
> - [Alex Reilly](https://github.com/twof) - Yelp iOS
> - [Liz Jakubowski](https://github.com/lizjakubowski) - Yelp iOS
> - [Mark Larah](https://github.com/magicmark) - Yelp Web
> - Sanae Rosen - Yelp Android
> - [Stephen Spalding](https://github.com/fotoetienne) - Netflix GraphQL Server Infrastructure
> - [Wei Xue](https://github.com/xuewei8910) - Yelp iOS
> - [Young Min Kim](https://github.com/aprilrd) - Netflix UI
> 
> This RFC proposes syntax that would allow developers to override schema-defined
> nullability of fields for individual operations.
> 
> ## Definitions
> 
> - **Required field** - A field which is marked with `!`.
> 
> ## 📜 Problem Statement
> 
> In our experience, client developers have been frustrated that the vast majority of fields are
> nullable. We’ve done this in accordance with official best practice, and we largely agree that this
> is good practice. From the 
> [official GraphQL best practice](https://graphql.org/learn/best-practices/#nullability):
> 
> > This is because there are many things that can go awry in a networked service backed by databases
> and other
> > services. A database could go down, an asynchronous action could fail, an exception could be
> thrown. Beyond
> > simply system failures, authorization can often be granular, where individual fields within 
> a request can
> > have different authorization rules.
> 
> The problem with the SDL Non-Nullable (`!`) is that it eliminates the possibility of partial failure
> on a given type. This forces schema authors to decide for which fields partial failure is
> acceptable. A GraphQL schema author may not be in the best position to predict whether partial failure
> will be acceptable or unacceptable for every canvas that makes use of a field.
> 
> While the schema can have nullable fields for valid reasons (such as federation), in some cases the
> client wants to decide if it accepts a `null` value for the result to simplify the client-side
> logic.
> 
> ## 🧑‍💻 Proposed Solution
> 
> A client-controlled Non-Nullable designator.
> 
> ## 🎬 Behavior
> 
> Each client-controlled nullability designator overrides the schema-defined nullability of the field
> it's attached to for the duration of the operation.
> 
> ### `!`
> The proposed client-controlled required designator would have identical semantics to the current 
> schema-defined [Non-Null](https://spec.graphql.org/draft/#sec-Executing-Selection-Sets.Errors-and-Non-Null-Fields).
> 
> ## ✅ Validation
> 
> If a developer executed an operation with two fields name `foo`, one a `String` and the other an 
> `Int`, the operation would be declared invalid by the server. The same is true if one of the fields
> is designated required but both are otherwise the same type. In this example, `nickname` could be
> either a `String` or a `String!` which are two different types and therefor can not be merged:
> 
> ```graphql
> fragment conflictingDifferingResponses on Pet {
>   ... on Dog {
>     nickname
>   }
>   ... on Cat {
>     nickname!
>   }
> }
> ```
> 
> ## ✏️ Proposed syntax
> 
> The client can express that a schema field is required by using the `!` syntax in the operation
> definition:
> ```graphql
> query GetBusinessName($id: String!) {
>   business(id: $id)? {
>     name!
>   }
> }
> ```
> 
> ### `!`
> 
> We have chosen `!` because `!` is already being used in the GraphQL spec to indicate that a field in
> the schema is Non-Nullable, so it will feel familiar to GraphQL developers.
> 
> ## Use cases
> 
> ### Improve the developer experience using GraphQL client code generators
> Handling nullable values on the client is a major source of frustration for developers, especially
> when using types generated by client code generators in strongly-typed languages. The proposed
> required designator would allow GraphQL clients to generate types with more precise nullability 
> requirements for a particular feature. For example, using a GraphQL client like Apollo GraphQL on 
> mobile, the following query
> ```graphql
> query GetBusinessName($id: String!) {
>   business(id: $id)? {
>     name!
>   }
> }
> ```
> would be translated to the following type in Swift.
> ```swift
> struct GetBusinessNameQuery {
>   let id: String
>   struct Data {
>     let business: Business?
>     struct Business {
>       /// Lack of `?` indicates that `name` will never be `null`
>       let name: String
>     }
>   }
> }
> ```
> If a null business name is not acceptable for the feature executing this query, this generated type
> is more ergonomic to use since the developer does not need to unwrap the value each time it’s
> accessed.
> 
> ### 3rd-party GraphQL APIs
> Marking a field Non-Nullable in schema is not possible in every use case. For example, when a
> developer is using a 3rd-party API such as 
> [Github's GraphQL API](https://docs.github.com/en/graphql) they won't be able to alter Github's
> schema, but they may still want to have certain fields be required in their application. Even within
> an organization, ownership rules may dictate that an developer is not allowed to alter a schema they
> utilize.
> 
> ## ✅ RFC Goals
> 
> - Non-nullable syntax that is based off of syntax that developers will already be familiar with
> - Enable GraphQL client code generation tools to generate more ergonomic types
> 
> ## 🚫 RFC Non-goals
> This syntax consciously does not cover the following use cases:
> 
> - **Default Values**
>   The syntax being used in this proposal causes queries to propagate an error in the case that
>   a `null` is found for a required field. As an alternative, some languages provide syntax (eg `??` 
>   for Swift) that says "if a field would be `null` return some other value instead". We have not 
>   covered that behavior in this proposal, but leave it open to be covered by future proposals.
> 
> ## 🗳️ Alternatives considered
> 
> ### A `@nonNull` official directive
> 
> This solution offers the same benefits as the proposed solution. Additionally, this solution has 
> good upgrade paths if we later want to provide more behavior options to developers. 
> [Relay's `@required` directive](https://mrtnzlml.com/docs/relay/directives#required), for example, 
> allows developers to decide how they want their clients to respond in the event that `null` is 
> received for a `@required` field.
> 
> ```graphql
> fragment Foo on User {
>   address @required(action: THROW) {
>     city @required(action: LOG)
>   }
> }
> ```
> 
> With our current proposal, we don't have a great way to offer this kind of flexibility that would 
> mesh nicely with existing GraphQL syntax.
> 
> However we think the described behavior acts as a nice, concise default, and is worth the tradeoff.
> 
> ### A `@nonNull` custom directive
> 
> This is an alternative being used at some of the companies represented in this proposal.
> 
> While this solution simplifies some client-side logic, it does not meaningfully improve the 
> developer experience for clients.
> 
> * The cache implementations of "smart" GraphQL clients also need to understand the custom directive 
>   to behave correctly. Currently, when a client library caches a `null` field based on an operation 
>   without a directive, it will return the `null` field for another operation with this directive.
> * For clients that rely on client code generation, generated types typically cannot be customized 
>   based on a custom directive. See 
>   https://github.com/dotansimha/graphql-code-generator/discussions/5676 for an example. As a result, 
>   the optional generated properties still need to be unwrapped in the code.
> 
> This feels like a common enough need to call for a language feature. A single language feature would 
> enable more unified public tooling around GraphQL.
> 
> ### Make Schema Fields Non-Nullable
> 
> It is intuitive that one should simply mark fields that are not intended to be `null` Non-Nullable 
> in the schema. For example, in the following GraphQL schema:
> 
> ```graphql
> type Business {
>   name: String
>   isStarred: Boolean
> }
> ```
> 
> If we intend to always have a `name` and `isStarred` for a `Business`, it may be tempting to mark 
> these fields Non-Nullable:
> 
> ```graphql
> type Business {
>   name: String!
>   isStarred: Boolean!
> }
> ```
> 
> Marking schema fields Non-Nullable may introduce problems in a distributed environment where partial 
> failure is a possibility regardless of whether the field is intended to have `null` as a valid 
> state.
> 
> When a Non-Nullable field results in `null`, the GraphQL server will recursively step through the 
> field’s ancestors to find the next nullable field. In the following GraphQL response:
> 
> ```json
> {
>   "data": {
>     "business": {
>       "name": "The French Laundry",
>       "isStarred": false
>     }
>   }
> }
> ```
> 
> If `isStarred` is Non-Nullable but resolves to `null` and business is nullable, the result will be:
> 
> ```json
> {
>   "data": {
>     "business": null
>   }
> }
> ```
> 
> Even if `isStarred` resolves to a valid result, the response would no longer provide this data. If business is
> Non-Nullable, the response will be:
> ```json
> {
>   "data": null
> }
> ```
> 
> In the case that the service storing business stars is unavailable, the UI may want to go ahead and 
> render the component without a star (effectively defaulting `isStarred` to `false`). A Non-Nullable 
> field in the schema makes it impossible for the client to receive partial results from the server, 
> and thus potentially forces the entire component to fail to render.
> 
> More discussion on [when to use Non-Nullable can be found here](https://medium.com/@calebmer/when-to-use-graphql-non-null-fields-4059337f6fc8)
> 
> Also see [3rd-party GraphQL APIs](#3rd-party-GraphQL-APIs) for an instance where it wouldn't be 
> possible for a developer to alter the schema for a service they're using.
> 
> ### Write wrapper types that null-check fields
> This is the alternative being used at some of the companies represented in this proposal for the 
> time being. It's labor intensive and rote work. It more or less undermines any gains from code 
> generation.
> 
> ### Alternatives to `!`
> #### `!!`
> This would follow the precedent set by Kotlin. It's more verbose and diverges from GraphQL's SDL
> precedent.
> 
> ## Decision Log
> 
> ### `!` as the only designator in the RFC (July 2023)
> 
> At the July 26th meeting of the CCN sub-WG it was decided to simplify the RFC for the sake of progress. This 
> reverses the "`?` as a counterpart to the `!`" designator.
> 
> The increased scope of the RFC with the nullability designator `?` has stalled the RFC for more than two 
> years ([the initial RFC from April 2021](https://github.com/twof/graphql-spec/pull/1/files)).
> 
> One of the contentious discussions we encountered was around the proposed behaviors of the nullability designator 
> `?`. Regardless of the chosen path, it had unintuitive semantics (see graphql/client-controlled-nullability-wg#2), 
> which require​ other RFCs, such as [fragment boundaries](https://github.com/graphql/graphql-wg/blob/main/rfcs/FragmentModularity.md), or new ideas like inline errors.
> 
> Even though we recognize the value of having a counterpart to `!`, we made a tradeoff decision to provide value 
> to the community sooner than later.
> 
> ### Prior to July 2023
> 
> This proposal started out with a very simple premise and implementation, and has gotten more complex as 
> the community has explored edge cases and facets about how GraphQL is actually used in practice. For 
> example this proposal starts out by talking about accommodating the "best practices" that are recommended 
> by the GraphQL documentation and the community, but we discovered pretty early on that there are 
> legitimate use cases where the "best practices" are rightfully ignored. Some of those use cases are 
> covered in "`?` as a counterpart to `!`". 
> 
> In order to cover instances like that, we've needed to justify additional complexity which can be 
> difficult to understand for newcomers without (at this point a full year) of context. This decision
> log was written with newcomers in mind to avoid rediscussing issues that have already been hashed out,
> and to make it easier to understand why certain decisions have been made. At the time of writing, 
> the decisions here aren't set in stone, so any future discussions can use this log as a starting point.
> 
> #### `?` as a counterpart to `!`
> 
> Lee was the first person [to suggest](https://github.com/graphql/graphql-spec/issues/867#issuecomment-840807186) 
> that the inverse of `!` should exist and that it should be represented by `?`. The 
> [reasoning](https://github.com/graphql/graphql-spec/issues/867#issuecomment-841372320) was that it "completes 
> the story of control" and provides a guaranteed stopping point for `null` propagation if we're using the existing 
> `null` propagation rules. The feeling was that "introducing ! without ? is like introducing `throw` without `catch`". 
> 
> Lee also surfaced that there are some use cases like his own at Robinhood where they're trying to balance 
> developer experience and data preservation, and have opted to mark quite a few fields `Non-Null`. Data 
> preservation is very important because Robinhood is working with financial data, so they have the opposite
> problem where they sometimes want to be able to halt `null` propagation, rather than the inverse use case which 
> this proposal originally supported.
> 
> Developers from Apollo indicated that many of their customers face problems around schema breaking where the 
> solution to developer experience gripes is to make a breaking change and swap a field from nullable to `Non-Nullable`
> or vice versa, which can be a labor intensive process.
> 
> Since there seemed to be general consensus that `?` was a good addition to the proposal, it was adopted without a vote.
> 
> Subsequently there was discussion around whether `?` could be introduced in a later proposal, and there was general 
> agreement that the usability of `!` is limited without `?`, and the selected `null` propagation behavior described 
> below solidifies the decision to introduce both additions in a single proposal.
> 
> #### List syntax
> 
> Developers from Apollo [suggested](https://github.com/graphql/graphql-spec/pull/895#issuecomment-961442966) early
> on that users would want to apply CCN syntax to list elements. The possibility had been suggested earlier than 
> that as well, but it was put off because neither Netflix nor Relay's CCN counterparts had the feature, and it 
> hadn't been a problem yet. However there was enough interest during community feedback sessions to adopt it 
> into the proposal. [Discussions](https://github.com/graphql/graphql-wg/discussions/864) around which specific 
> syntax to adopt happened over the following months.
> 
> Options other than the one that was landed on included the following:
> 
> ```graphql
> twoDimensionalList!!?
> ```
> The folks that voted against this option felt that it was unclear how it should be interpreted, whether operators 
> should be applied from the outside-in, or inside-out.
> 
> ```graphql
> twoDimensionalList as [[Int!]!]
> twoDimensionalList <= [[Int!]!]
> ```
> The folks that voted against this option felt that this option read like a type-cast, and that the inclusion 
> of a type placed an undue burden on client developers. Validation would fail if the type was incorrect, and 
> didn't provide much additional value.
> 
> ```graphql
> twoDimensionalList[[!]!]?
> ```
> This syntax, called "the bracket syntax" during discussions was selected for adoption by majority vote at the 
> [March 3rd, 2022 GraphQL Working Group Meeting](https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-03-03.md). 
> 9 out of 10 participants voted for this option with the final vote going to the `<= [[Int!]!]` option. 
> 
> Initially there was a restriction on the bracket syntax where the depth of the syntax needed to match depth of 
> the field's list type, but participants at the same meeting felt that restriction should be loosened so 
> that developers could opt to apply the syntax to only the field itself and ignore the elements of the 
> list. Under that new rule the following would also be valid, and the two examples would be equivalent.
> 
> ```graphql
> twoDimensionalList!
> twoDimensionalList[[]]!
> ```
> 
> There are however some open concerns that the first of the two examples could be ambiguous as to whether 
> the `!` applies to the field as a whole or to the list elements.
> 
> #### `!` propagates `null` to nearest `?` rather than nearest nullable field
> 
> The selected mechanics were most requested by the folks at Meta working on [Relay](https://relay.dev/). 
> Relay wanted this behavior for a few reasons
> - Relay presents a facade of fragment isolation for its own 
> [`@required` directive](https://relay.dev/docs/next/guides/required-directive/). If a field is `null`, 
> rather than merging fragments and propagating `null` to all sibling fields on selection sets that use 
> that fragment, the most popular option as chosen by ~90% of developers is to have the request throw 
> and utilize React's error boundaries. It also has the option to do `null` propagation, but that too 
> is bound to a single fragment. Because of this, it likely won't be able to use CCN at first, but 
> developers would like to be able to use it in the future once 
> [Fragment Modularity](https://github.com/graphql/graphql-wg/blob/main/rfcs/FragmentModularity.md) 
> makes it into the spec. The selected option preserves the possibility of Relay and other clients that utilize 
> fragments heavily using CCN in the future.
> - The throwing option that Relay provides on their `@required` directive effectively allows developers 
> to indicate "If some required field is missing, throw out everything from this field to the fragment boundary" 
> which is tighter client control than was offered by the initial iteration of this proposal where `!` only 
> transformed a field into a `Non-Null`. In that case, the server still had control over where `null` 
> propagation halted with which fields the schema said were nullable. The selected `null` propagation option 
> is slightly closer to the most popular `@required` option in that way. 
> 
> With the initial iteration of this proposal if users wanted to guarantee that all fields through multiple 
> parents should be lost in the event that a child is `null`, they would need to mark each level with a `!`, 
> but the selected option avoids that.
> 
> With the selected option, forgetting to include a `?` is potentially dangerous because it would result 
> in more fields being lost than intended, all the way up to the `data` field in the worst case scenario. 
> There were concerns that that was a blocker, but arguments were made that because most queries are relatively 
> small, it wasn't actually that dangerous. Clients have also often been treating the existence of any errors 
> as a failed request and thrown out entire responses, so in effect, clients been choosing the "worst case 
> scenario" when given the option.
> 
> The behavior where `!` propagates `null` to nearest `?` was selected for adoption by majority vote at the 
> [March 3rd, 2022 GraphQL Working Group Meeting](https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-03-03.md).
> 7 out of 8 participants voted for this option with the final vote going to behavior where the `!` would be non-destructive. 
> 
> The non-destructive option was turned down because having different behavior per-client wasn't desirable, and 
> it provided no benefits to naive clients (like a bash script) because extra processing would be required 
> for it to be a value-add.
