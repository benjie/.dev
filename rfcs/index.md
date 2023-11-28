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

Ping `@benjie` on the [GraphQL Discord](https://discord.graphql.org) (`#wg`
channel) and ask for him to run an update!

:::

## [Stage 2: Draft](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-2-draft)


<!-- prettier-ignore -->
| RFC | Champion | Title | Spec&nbsp;PR | Latest |
| --- | --- | --- | --- | --- |
| [#825](/rfcs/825) | [@benjie](https://github.com/benjie) | OneOf Input Objects | [Yes](https://github.com/graphql/graphql-spec/pull/825) | **Added to [2022-12-31 WG agenda](https://github.com/graphql/graphql-wg/blob/main//12-Dec/wg-primary.md)** |
| [#794](/rfcs/794) | [@magicmark](https://github.com/magicmark) | Schema Coordinates | [Yes](https://github.com/graphql/graphql-spec/pull/794) | **Added to [2021-06-03 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2021-06-03.md)** |
| [#793](/rfcs/793) | [@benjie](https://github.com/benjie) | Default value coercion rules | [Yes](https://github.com/graphql/graphql-spec/pull/793) | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//12-Dec/07-wg-primary.md)** |
| [#742](/rfcs/742) | [@robrichard](https://github.com/robrichard) | Spec edits for @defer/@stream | [Yes](https://github.com/graphql/graphql-spec/pull/742) | **Added to [2022-11-30 WG agenda](https://github.com/graphql/graphql-wg/blob/main//11-Nov/wg-primary.md)** |
| [#525](/rfcs/525) | [@smitt04](https://github.com/smitt04) | Allow deprecation of input values | [Yes](https://github.com/graphql/graphql-spec/pull/525) | **Mentioned in [2021-02-04 WG notes](https://github.com/graphql/graphql-wg/blob/main/021-02-04.md)** |




## [Stage 1: Proposal](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-1-proposal)


<!-- prettier-ignore -->
| RFC | Champion | Title | Spec&nbsp;PR | Latest |
| --- | --- | --- | --- | --- |
| [#1010](/rfcs/1010) | [@mjmahone](https://github.com/mjmahone) | Fragment Arguments: Spec Implementation | [Yes](https://github.com/graphql/graphql-spec/pull/1010) | **Mentioned in [2023-01-31 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-01.md)** |
| [#997](/rfcs/997) | [@fotoetienne](https://github.com/fotoetienne) | Expand @deprecated to Objects | [Yes](https://github.com/graphql/graphql-spec/pull/997) | **Mentioned in [2023-06-30 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-06.md)** |
| [#955](/rfcs/955) | [@benjaminjkraft](https://github.com/benjaminjkraft) | Add validation rule that operation types exist | [Yes](https://github.com/graphql/graphql-spec/pull/955) | **Added to [2022-06-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2022-06-02.md)** |
| [#950](/rfcs/950) | [@yaacovCR](https://github.com/yaacovCR) | allow unions to include interfaces and unions | [Yes](https://github.com/graphql/graphql-spec/pull/950) | **Added to [2022-08-04 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2022-08-04.md)** |
| [#939](/rfcs/939) | [@yaacovCR](https://github.com/yaacovCR) | allow unions to declare implementation of interfaces | [Yes](https://github.com/graphql/graphql-spec/pull/939) | **Added to [2022-06-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2022-06-02.md)** |
| [#907](/rfcs/907) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add support for directives on directives | [Yes](https://github.com/graphql/graphql-spec/pull/907) | **Added to [2022-01-06 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2022-01-06.md)** |
| [#895](/rfcs/895) | [@twof](https://github.com/twof) | Client Controlled Nullability | [Yes](https://github.com/graphql/graphql-spec/pull/895) | **Added to [2022-03-03 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2022-03-03.md)** |
| [#892](/rfcs/892) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add descriptions to executable definitions | [Yes](https://github.com/graphql/graphql-spec/pull/892) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/892) created** on 2021-10-07 by IvanGoncharov |
| [#883](/rfcs/883) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Relax SameResponseShape algorithm to be compatible with covariant fields | [Yes](https://github.com/graphql/graphql-spec/pull/883) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/883) created** on 2021-09-02 by IvanGoncharov |
| [#877](/rfcs/877) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Forbid duplicating argument names | [Yes](https://github.com/graphql/graphql-spec/pull/877) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/877) created** on 2021-07-01 by IvanGoncharov |
| [#865](/rfcs/865) | [@mjmahone](https://github.com/mjmahone) | Fragment Arguments (parameterized fragments) for GraphQL | [Yes](https://github.com/graphql/graphql-spec/pull/865) | **Mentioned in [2023-01-31 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-01.md)** |
| [#860](/rfcs/860) | [@benjie](https://github.com/benjie) | Prevent @skip and @include on root subscription selection set | [Yes](https://github.com/graphql/graphql-spec/pull/860) | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//12-Dec/07-wg-primary.md)** |
| [#733](/rfcs/733) | [@benjie](https://github.com/benjie) | Tagged type | [Yes](https://github.com/graphql/graphql-spec/pull/733) | **Added to [2020-10-01 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2020-10-01.md)** |
| [#509](/rfcs/509) | [@taion](https://github.com/taion) | Allow singular variables in list locations | [Yes](https://github.com/graphql/graphql-spec/pull/509) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/509) created** on 2018-08-29 by taion |
| [#395](/rfcs/395) | [@tgriesser](https://github.com/tgriesser) | inputUnion type | [Yes](https://github.com/graphql/graphql-spec/pull/395) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/395) created** on 2018-01-11 by tgriesser |




## [Stage 0: Strawman](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman)


<!-- prettier-ignore -->
| RFC | Champion | Title | Spec&nbsp;PR | Latest |
| --- | --- | --- | --- | --- |
| [#1065](/rfcs/1065) | [@benjie](https://github.com/benjie) | SemanticNonNull type (null only on error) | [Yes](https://github.com/graphql/graphql-spec/pull/1065) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1065) created** on 2023-11-24 by benjie |
| [#1063](/rfcs/1063) | [@benjie](https://github.com/benjie) | Type system ordering of: object interfaces, directive arguments, input object fields, enum values | [Yes](https://github.com/graphql/graphql-spec/pull/1063) | **Added to [2024-01-04 WG agenda](https://github.com/graphql/graphql-wg/blob/main//01-Jan/04-wg-primary.md)** |
| [#1059](/rfcs/1059) | [@benjie](https://github.com/benjie) | Introduce Strict and Legacy All Variable Usages Are Allowed | [Yes](https://github.com/graphql/graphql-spec/pull/1059) | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//12-Dec/07-wg-primary.md)** |
| [#1058](/rfcs/1058) | [@benjie](https://github.com/benjie) | List coercion algorithm | [Yes](https://github.com/graphql/graphql-spec/pull/1058) | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//12-Dec/07-wg-primary.md)** |
| [#1057](/rfcs/1057) | [@benjie](https://github.com/benjie) | Fix coercion table for list | [Yes](https://github.com/graphql/graphql-spec/pull/1057) | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//12-Dec/07-wg-primary.md)** |
| [#1056](/rfcs/1056) | [@benjie](https://github.com/benjie) | Fix CoerceArgumentValues() hasValue | [Yes](https://github.com/graphql/graphql-spec/pull/1056) | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//12-Dec/07-wg-primary.md)** |
| [#1053](/rfcs/1053) | [@benjie](https://github.com/benjie) | Implementations may not deprecate a field that the interface hasn't deprecated | [Yes](https://github.com/graphql/graphql-spec/pull/1053) | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//12-Dec/07-wg-primary.md)** |
| [#1052](/rfcs/1052) | [@yaacovCR](https://github.com/yaacovCR) | deduplicated incremental delivery | [Yes](https://github.com/graphql/graphql-spec/pull/1052) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1052) created** on 2023-11-06 by yaacovCR |
| [#1050](/rfcs/1050) | [@benjie](https://github.com/benjie) | Directive proposal for opting out of null bubbling | [Yes](https://github.com/graphql/graphql-spec/pull/1050) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1050) created** on 2023-10-05 by benjie |
| [#1048](/rfcs/1048) | [@benjie](https://github.com/benjie) | Null-Only-On-Error / Semantically-Non-Null type (asterisk) | [Yes](https://github.com/graphql/graphql-spec/pull/1048) | **Mentioned in [2023-10-31 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-10.md)** |
| [#1045](/rfcs/1045) | [@benjie](https://github.com/benjie) | Remove fragmentSpreadName from visitedFragments when visit is complete | [Yes](https://github.com/graphql/graphql-spec/pull/1045) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1045) created** on 2023-09-11 by benjie |
| [FullSchemas](/rfcs/FullSchemas) | - | Full Schemas | No? | **[RFC document created](https://github.com/graphql/graphql-wg/blob/297b11eabb3de0fff2457401ea147ecdb8228e24/rfcs/FullSchemas.md)** on 2023-08-26 by Martin Bonnin |
| [FeatureDiscovery](/rfcs/FeatureDiscovery) | - | Feature Discovery | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/5bfb8d590cc9693db1149b547d8db5041f05b731/rfcs/FeatureDiscovery.md)** on 2023-11-28 by Benjie Gillam |
| [#1034](/rfcs/1034) | [@yaacovCR](https://github.com/yaacovCR) | incremental delivery with deduplication + concurrent execution | [Yes](https://github.com/graphql/graphql-spec/pull/1034) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1034) created** on 2023-07-12 by yaacovCR |
| [#1026](/rfcs/1026) | [@yaacovCR](https://github.com/yaacovCR) | incremental delivery with deduplication + concurrent execution | [Yes](https://github.com/graphql/graphql-spec/pull/1026) | **Mentioned in [2023-06-30 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-06.md)** |
| [#1023](/rfcs/1023) | [@yaacovCR](https://github.com/yaacovCR) | incremental delivery without branching | [Yes](https://github.com/graphql/graphql-spec/pull/1023) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1023) created** on 2023-03-24 by yaacovCR |
| [#1018](/rfcs/1018) | [@benjie](https://github.com/benjie) | Alternative proposal for `@stream`/`@defer` | [Yes](https://github.com/graphql/graphql-spec/pull/1018) | **Added to [2023-04-06 WG agenda](https://github.com/graphql/graphql-wg/blob/main//04-Apr/06-wg-primary.md)** |
| [FragmentArguments](/rfcs/FragmentArguments) | - | Fragment Arguments | No? | **[RFC document created](https://github.com/graphql/graphql-wg/blob/7f882eb24f26b54b7663f766c69d0a3b0ef76535/rfcs/FragmentArguments.md)** on 2023-02-10 by Matt Mahoney |
| [#1015](/rfcs/1015) | [@leebyron](https://github.com/leebyron) | "Root" Types clarity → "Operation Type" | [Yes](https://github.com/graphql/graphql-spec/pull/1015) | **Mentioned in [2023-03-31 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-03.md)** |
| [#999](/rfcs/999) | [@yaacovCR](https://github.com/yaacovCR) | introduce ExecuteGroupedFieldSet, CollectRootFields and CollectSubfields | [Yes](https://github.com/graphql/graphql-spec/pull/999) | **Mentioned in [2023-06-30 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-06.md)** |
| [#998](/rfcs/998) | [@yaacovCR](https://github.com/yaacovCR) | add spec edits for references | [Yes](https://github.com/graphql/graphql-spec/pull/998) | **Added to [2022-11-30 WG agenda](https://github.com/graphql/graphql-wg/blob/main//11-Nov/wg-secondary-apac.md)** |
| [ExpandingSubtyping](/rfcs/ExpandingSubtyping) | - | Expanding Subtyping (for output types) | No? | **[RFC document created](https://github.com/graphql/graphql-wg/blob/cb872fe1a574121eb3dd2e9fdb848da70a552d9f/rfcs/ExpandingSubtyping.md)** on 2022-08-31 by Yaacov Rydzinski |
| [AnnotationStructs](/rfcs/AnnotationStructs) | - | Annotation Structs | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/b7c9e683ea40b776dceb560bac46b7937cdcbeac/rfcs/AnnotationStructs.md)** on 2022-08-31 by Benjie |
| [MetadataStructs](/rfcs/MetadataStructs) | - | Metadata Structs | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/6883f460ae07a954e5c9cc240bb280733e2a184b/rfcs/MetadataStructs.md)** on 2022-08-16 by Benjie |
| [Struct](/rfcs/Struct) | - | Polymorphic-capable composite symmetric input/output type (`struct`) | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/c46f67dad4154c3b693d337c815900a5c7909423/rfcs/Struct.md)** on 2023-11-28 by Benjie |
| [#960](/rfcs/960) | [@yaacovCR](https://github.com/yaacovCR) | Allow recursion within ResolveAbstractType | [Yes](https://github.com/graphql/graphql-spec/pull/960) | **Added to [2022-07-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2022-07-07.md)** |
| [OptInFeatures](/rfcs/OptInFeatures) | - | Opt-in features | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/f3fa75bc36e91ab8036fdf2350a3baddd00045f2/rfcs/OptInFeatures.md)** on 2022-09-30 by Martin Bonnin |
| [CompositeSchemas](/rfcs/CompositeSchemas) | - | GraphQL Composite Schemas | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/acb8ff08d3f153b7511ddff2441ef11177fefb5b/rfcs/CompositeSchemas.md)** on 2022-07-22 by Daniel Winter |
| [#948](/rfcs/948) | [@benjie](https://github.com/benjie) | OneOf Objects | [Yes](https://github.com/graphql/graphql-spec/pull/948) | **Added to [2022-06-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2022-06-02.md)** |
| [FragmentModularity](/rfcs/FragmentModularity) | - | Fragment Modularity | No? | **[RFC document created](https://github.com/graphql/graphql-wg/blob/d6103434afc3e516240f7b53721eb7b728ca525c/rfcs/FragmentModularity.md)** on 2022-01-06 by Matt Mahoney |
| [ClientControlledNullability](/rfcs/ClientControlledNullability) | - | Client Controlled Nullability | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/ca0fc775c66ae0e31c4ed605503a2679d9390705/rfcs/ClientControlledNullability.md)** on 2023-11-28 by Benjie Gillam |
| [#888](/rfcs/888) | [@nojvek](https://github.com/nojvek) | Map type | [Yes](https://github.com/graphql/graphql-spec/pull/888) | **Added to [2021-10-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2021-10-07.md)** |
| [OperationExpressions](/rfcs/OperationExpressions) | - | Operation Expressions | No? | **[RFC document created](https://github.com/graphql/graphql-wg/blob/40a5e9ddbb41af18972df0cbc74945c09fb7b935/rfcs/OperationExpressions.md)** on 2021-09-02 by Benjie Gillam |
| [ImplicitInheritance](/rfcs/ImplicitInheritance) | - | Implicit Inheritance | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/06122e6774b9c4237513187068f46be6fa67a26e/rfcs/ImplicitInheritance.md)** on 2021-09-03 by Lee Byron |
| [SchemaFragments](/rfcs/SchemaFragments) | - | Schema Fragments | No? | **[RFC document created](https://github.com/graphql/graphql-wg/blob/47d7a8004b1469a9d0480446c820dc9ad01e78b9/rfcs/SchemaFragments.md)** on 2021-09-02 by Daniel Starns |
| [#879](/rfcs/879) | [@mjmahone](https://github.com/mjmahone) | __fulfilled meta field | [Yes](https://github.com/graphql/graphql-spec/pull/879) | **Added to [2021-09-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2021-09-02.md)** |
| [#823](/rfcs/823) | [@benjie](https://github.com/benjie) | operation expressions | [Yes](https://github.com/graphql/graphql-spec/pull/823) | **Added to [2021-03-04 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2021-03-04.md)** |
| [SchemaCoordinates](/rfcs/SchemaCoordinates) | - | Schema Coordinates | No? | **[RFC document created](https://github.com/graphql/graphql-wg/blob/257673b7ede31f1856b53ae833a43fc5034ac99b/rfcs/SchemaCoordinates.md)** on 2021-01-07 by Mark Larah |
| [#806](/rfcs/806) | [@benjie](https://github.com/benjie) | __typename should be valid at subscription root | [Yes](https://github.com/graphql/graphql-spec/pull/806) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/806) created** on 2020-12-05 by benjie |
| [#710](/rfcs/710) | [@chemisus](https://github.com/chemisus) | Add namedType and punctuatedName to __Type | [Yes](https://github.com/graphql/graphql-spec/pull/710) | **Added to [2020-05-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2020-05-07.md)** |
| [#706](/rfcs/706) | [@francisu](https://github.com/francisu) | Add support for directives for an object field name | [Yes](https://github.com/graphql/graphql-spec/pull/706) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/706) created** on 2020-04-07 by francisu |
| [#674](/rfcs/674) | [@kassens](https://github.com/kassens) | allow empty selections | [Yes](https://github.com/graphql/graphql-spec/pull/674) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/674) created** on 2020-01-21 by kassens |
| [#673](/rfcs/673) | [@spawnia](https://github.com/spawnia) | Servers must preserve lexical ordering between SDL and introspection | [Yes](https://github.com/graphql/graphql-spec/pull/673) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/673) created** on 2020-01-13 by spawnia |
| [DeferStream](/rfcs/DeferStream) | - | GraphQL Defer and Stream Directives | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/e4ef5f9d5997815d9de6681655c152b6b7838b4c/rfcs/DeferStream.md)** on 2022-01-17 by Rob Richard |
| [#667](/rfcs/667) | [@lilianammmatos](https://github.com/lilianammmatos) | [RFC Sketch] Defer and Stream Directives | [Yes](https://github.com/graphql/graphql-spec/pull/667) | **Added to [2020-01-09 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2020-01-09.md)** |
| [#631](/rfcs/631) | [@victorandree](https://github.com/victorandree) | Make root query operation type optional | [Yes](https://github.com/graphql/graphql-spec/pull/631) | **Added to [2019-12-05 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2019-12-05.md)** |
| [InputUnion](/rfcs/InputUnion) | - | GraphQL Input Union | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/ca0fc775c66ae0e31c4ed605503a2679d9390705/rfcs/InputUnion.md)** on 2023-11-28 by Benjie Gillam |
| [#586](/rfcs/586) | [@benjie](https://github.com/benjie) | Input Objects accepting exactly @oneField | [Yes](https://github.com/graphql/graphql-spec/pull/586) | **Mentioned in [2019-06-06 WG notes](https://github.com/graphql/graphql-wg/blob/main/019-06-06.md)** |
| [#567](/rfcs/567) | [@benhead](https://github.com/benhead) | allow directives on directive definitions | [Yes](https://github.com/graphql/graphql-spec/pull/567) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/567) created** on 2019-02-28 by benhead |
| [#556](/rfcs/556) | [@langpavel](https://github.com/langpavel) | Document Directives | [Yes](https://github.com/graphql/graphql-spec/pull/556) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/556) created** on 2019-01-31 by langpavel |
| [#521](/rfcs/521) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Scalar serialize as built-in scalar type | [Yes](https://github.com/graphql/graphql-spec/pull/521) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/521) created** on 2018-10-14 by IvanGoncharov |
| [#471](/rfcs/471) | [@OlegIlyenko](https://github.com/OlegIlyenko) | Limit uniqueness to `@skip`, `@include` and `@deprecated` directives | [Yes](https://github.com/graphql/graphql-spec/pull/471) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/471) created** on 2018-06-24 by OlegIlyenko |
| [#326](/rfcs/326) | [@leebyron](https://github.com/leebyron) | Scalar serialize as built-in scalar type | [Yes](https://github.com/graphql/graphql-spec/pull/326) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/326) created** on 2017-06-20 by leebyron |
| [#325](/rfcs/325) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add "Any" scalar type | [Yes](https://github.com/graphql/graphql-spec/pull/325) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/325) created** on 2017-06-19 by IvanGoncharov |
| [Subscriptions](/rfcs/Subscriptions) | - | NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official [June 2018 GraphQL Specification](https://spec.graphql.org/June2018/). | No? | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/5db83c773d7950a05a9306d1cd8d7e0704e77bda/rfcs/Subscriptions.md)** on 2020-08-19 by Benjie Gillam |




## [Stage 3: Accepted](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-3-accepted)


<!-- prettier-ignore -->
| RFC | Champion | Title | Spec&nbsp;PR | Latest |
| --- | --- | --- | --- | --- |
| [#987](/rfcs/987) | [@benjie](https://github.com/benjie) | Fix ambiguity around when schema definition may be omitted | [Yes](https://github.com/graphql/graphql-spec/pull/987) | **Mentioned in [2023-02-28 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-02.md)** |
| [#891](/rfcs/891) | [@dugenkui03](https://github.com/dugenkui03) | Add explanation about argument name uniqueness. | [Yes](https://github.com/graphql/graphql-spec/pull/891) | **Mentioned in [2023-02-28 WG notes](https://github.com/graphql/graphql-wg/blob/main/023-02.md)** |
| [#849](/rfcs/849) | [@leebyron](https://github.com/leebyron) | Allow full unicode range | [Yes](https://github.com/graphql/graphql-spec/pull/849) | **Added to [2021-07-01 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2021-07-01.md)** |
| [#805](/rfcs/805) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Allow deprecation of input values (field args, directive args, input fields) | [Yes](https://github.com/graphql/graphql-spec/pull/805) | **Added to [2022-02-03 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2022-02-03.md)** |
| [#803](/rfcs/803) | [@benjie](https://github.com/benjie) | Replace 'query error' with 'request error' | [Yes](https://github.com/graphql/graphql-spec/pull/803) | **Added to [2021-03-04 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2021-03-04.md)** |
| [#776](/rfcs/776) | [@benjie](https://github.com/benjie) | __typename is not valid at subscription root | [Yes](https://github.com/graphql/graphql-spec/pull/776) | **Added to [2021-05-13 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2021-05-13.md)** |
| [#701](/rfcs/701) | [@spawnia](https://github.com/spawnia) | Disallow non-breakable chains of circular references in Input Objects | [Yes](https://github.com/graphql/graphql-spec/pull/701) | **Mentioned in [2020-12-03 WG notes](https://github.com/graphql/graphql-wg/blob/main/020-12-03.md)** |
| [#649](/rfcs/649) | [@eapache](https://github.com/eapache) | Custom Scalar Specification URLs | [Yes](https://github.com/graphql/graphql-spec/pull/649) | **Added to [2020-07-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2020-07-02.md)** |
| [#601](/rfcs/601) | [@leebyron](https://github.com/leebyron) | Number value literal lookahead restrictions | [Yes](https://github.com/graphql/graphql-spec/pull/601) | **Added to [2019-10-10 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2019-10-10.md)** |
| [#599](/rfcs/599) | [@leebyron](https://github.com/leebyron) | Clarify that lexing is greedy | [Yes](https://github.com/graphql/graphql-spec/pull/599) | **Added to [2019-10-10 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2019-10-10.md)** |
| [#598](/rfcs/598) | [@leebyron](https://github.com/leebyron) | Avoid parse ambiguity on types & extensions | [Yes](https://github.com/graphql/graphql-spec/pull/598) | **Added to [2019-08-01 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2019-08-01.md)** |
| [#510](/rfcs/510) | [@mjmahone](https://github.com/mjmahone) | Allow directives on variable definitions | [Yes](https://github.com/graphql/graphql-spec/pull/510) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/510) created** on 2018-08-29 by mjmahone |
| [#472](/rfcs/472) | [@OlegIlyenko](https://github.com/OlegIlyenko) | Repeatable directives | [Yes](https://github.com/graphql/graphql-spec/pull/472) | **Added to [2019-10-10 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2019-10-10.md)** |
| [#470](/rfcs/470) | [@OlegIlyenko](https://github.com/OlegIlyenko) | "Directive order is significant" section | [Yes](https://github.com/graphql/graphql-spec/pull/470) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/470) created** on 2018-06-23 by OlegIlyenko |
| [#466](/rfcs/466) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add description to Schema | [Yes](https://github.com/graphql/graphql-spec/pull/466) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/466) created** on 2018-06-13 by IvanGoncharov |
| [#463](/rfcs/463) | [@leebyron](https://github.com/leebyron) | Ensure validation of directive arguments | [Yes](https://github.com/graphql/graphql-spec/pull/463) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/463) created** on 2018-06-11 by leebyron |
| [#462](/rfcs/462) | [@leebyron](https://github.com/leebyron) | Input & Output type definition | [Yes](https://github.com/graphql/graphql-spec/pull/462) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/462) created** on 2018-06-11 by leebyron |
| [#459](/rfcs/459) | [@mjmahone](https://github.com/mjmahone) | Remove Interface is implemented by 1+ Objects validation | [Yes](https://github.com/graphql/graphql-spec/pull/459) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/459) created** on 2018-06-08 by mjmahone |
| [#454](/rfcs/454) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add validation steps for schema extensions | [Yes](https://github.com/graphql/graphql-spec/pull/454) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/454) created** on 2018-06-04 by IvanGoncharov |
| [#445](/rfcs/445) | [@spawnia](https://github.com/spawnia) | Disallow non-breakable chains of circular references in Input Objects | [Yes](https://github.com/graphql/graphql-spec/pull/445) | **Added to [2019-11-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2019-11-07.md)** |
| [#373](/rfcs/373) | [@mike-marcacci](https://github.com/mike-marcacci) | Allow interfaces to implement other interfaces | [Yes](https://github.com/graphql/graphql-spec/pull/373) | **Added to [2019-11-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2019-11-07.md)** |




## [Stage X: Rejected](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-x-rejected)


<!-- prettier-ignore -->
| RFC | Champion | Title | Spec&nbsp;PR | Latest |
| --- | --- | --- | --- | --- |
| [#606](/rfcs/606) | [@victorandree](https://github.com/victorandree) | Support empty composite types | [Yes](https://github.com/graphql/graphql-spec/pull/606) | **Added to [2019-12-05 WG agenda](https://github.com/graphql/graphql-wg/blob/main//2019-12-05.md)** |
| [#460](/rfcs/460) | [@mjmahone](https://github.com/mjmahone) | Require Interfaces to have 1+ Objects implementing | [Yes](https://github.com/graphql/graphql-spec/pull/460) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/460) created** on 2018-06-08 by mjmahone |
| [#319](/rfcs/319) | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add '@ignoreIfUnknown' to allow forward compatibility for clients | [Yes](https://github.com/graphql/graphql-spec/pull/319) | **Mentioned in [2020-02-06 WG notes](https://github.com/graphql/graphql-wg/blob/main/020-02-06.md)** |
| [#315](/rfcs/315) | [@excitement-engineer](https://github.com/excitement-engineer) | Support DateTime scalar | [Yes](https://github.com/graphql/graphql-spec/pull/315) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/315) created** on 2017-05-26 by excitement-engineer |
| [#232](/rfcs/232) | [@stubailo](https://github.com/stubailo) | __id field for unique identifiers | [Yes](https://github.com/graphql/graphql-spec/pull/232) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/232) created** on 2016-10-29 by stubailo |



