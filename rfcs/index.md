---
title: "GraphQL RFCs"
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
| RFC | Champion | Title | Latest |
| --- | --- | --- | --- |
| [#825](/rfcs/825 "OneOf Input Objects / RFC2") | [@benjie](https://github.com/benjie) | OneOf Input Objects | **Commit pushed**: [Merge branch 'main' into oneof-v2](https://github.com/graphql/graphql-spec/commit/e78d2b5bbe2cca916999a93cfa795861ab6470f4) on 2023-11-13 by [@benjie](https://github.com/benjie) |
| [#793](/rfcs/793 "Default value coercion rules / RFC2") | [@benjie](https://github.com/benjie) | Default value coercion rules | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/12-Dec/07-wg-primary.md)** |
| [#794](/rfcs/794 "Schema Coordinates / RFC2") | [@magicmark](https://github.com/magicmark) | Schema Coordinates | **Added to [2021-06-03 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2021/2021-06-03.md)** |
| [#742](/rfcs/742 "Spec edits for @defer/@stream / RFC2") | [@robrichard](https://github.com/robrichard) | Spec edits for @defer/@stream | **Commit pushed**: [CollectFields does not require path or asyncRecord (#11)](https://github.com/graphql/graphql-spec/commit/c630301560d9819d33255d3ba00f548e8abbcdc6) on 2023-01-16 by [@yaacovCR](https://github.com/yaacovCR) |
| [#525](/rfcs/525 "Allow deprecation of input values / RFC2") | [@smitt04](https://github.com/smitt04) | Allow deprecation of input values | **Mentioned in [2021-02-04 WG notes](https://github.com/graphql/graphql-wg/blob/main/notes/2021/2021-02-04.md)** |




## [Stage 1: Proposal](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-1-proposal)


<!-- prettier-ignore -->
| RFC | Champion | Title | Latest |
| --- | --- | --- | --- |
| [#1010](/rfcs/1010 "Fragment Arguments: Spec Implementation / RFC1") | [@mjmahone](https://github.com/mjmahone) | Fragment Arguments: Spec Implementation | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1010) created** on 2023-01-19 by mjmahone |
| [#997](/rfcs/997 "Expand @deprecated to Objects / RFC1") | [@fotoetienne](https://github.com/fotoetienne) | Expand @deprecated to Objects | **Added to [2023-06-01 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/06-Jun/01-wg-primary.md)** |
| [#955](/rfcs/955 "Add validation rule that operation types exist / RFC1") | [@benjaminjkraft](https://github.com/benjaminjkraft) | Add validation rule that operation types exist | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/04197ab0054fa6c8f7fa160bdfffc698dde4dfaf) on 2022-06-13 by [@benjaminjkraft](https://github.com/benjaminjkraft) |
| [#950](/rfcs/950 "allow unions to include interfaces and unions / RFC1") | [@yaacovCR](https://github.com/yaacovCR) | allow unions to include interfaces and unions | **Added to [2022-08-04 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-08-04.md)** |
| [#939](/rfcs/939 "allow unions to declare implementation of interfaces / RFC1") | [@yaacovCR](https://github.com/yaacovCR) | allow unions to declare implementation of interfaces | **Added to [2022-06-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-06-02.md)** |
| [#907](/rfcs/907 "Add support for directives on directives / RFC1") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add support for directives on directives | **Added to [2022-01-06 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-01-06.md)** |
| [#895](/rfcs/895 "Client Controlled Nullability / RFC1") | [@twof](https://github.com/twof) | Client Controlled Nullability | **Commit pushed**: [updated to reflect newest behavior](https://github.com/graphql/graphql-spec/commit/159d15946bee00c9c4bc2c01016a7b5f77cf47bb) on 2022-05-13 by [@twof](https://github.com/twof) |
| [#892](/rfcs/892 "Add descriptions to executable definitions / RFC1") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add descriptions to executable definitions | **[Spec PR](https://github.com/graphql/graphql-spec/pull/892) created** on 2021-10-07 by IvanGoncharov |
| [#883](/rfcs/883 "Relax SameResponseShape algorithm to be compatible with covariant fields / RFC1") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Relax SameResponseShape algorithm to be compatible with covariant fields | **[Spec PR](https://github.com/graphql/graphql-spec/pull/883) created** on 2021-09-02 by IvanGoncharov |
| [#877](/rfcs/877 "Forbid duplicating argument names / RFC1") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Forbid duplicating argument names | **[Spec PR](https://github.com/graphql/graphql-spec/pull/877) created** on 2021-07-01 by IvanGoncharov |
| [#865](/rfcs/865 "Fragment Arguments (parameterized fragments) for GraphQL / RFC1") | [@mjmahone](https://github.com/mjmahone) | Fragment Arguments (parameterized fragments) for GraphQL | **Commit pushed**: [Split RFC doc into graphql-wg PR](https://github.com/graphql/graphql-spec/commit/c988b54afc72a53f403bafe24c68df0ab6ec8abc) on 2023-01-11 by [@mjmahone](https://github.com/mjmahone) |
| [#860](/rfcs/860 "Prevent @skip and @include on root subscription selection set / RFC1") | [@benjie](https://github.com/benjie) | Prevent @skip and @include on root subscription selection set | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/12-Dec/07-wg-primary.md)** |
| [#733](/rfcs/733 "Tagged type / RFC1") | [@benjie](https://github.com/benjie) | Tagged type | **Commit pushed**: [Separate input and output tagged types](https://github.com/graphql/graphql-spec/commit/ced63be93178f0c76baf93b5dbc05789f170d8f1) on 2021-01-21 by [@benjie](https://github.com/benjie) |
| [#509](/rfcs/509 "Allow singular variables in list locations / RFC1") | [@taion](https://github.com/taion) | Allow singular variables in list locations | **Commit pushed**: [Remove CoerceVariableValues](https://github.com/graphql/graphql-spec/commit/16978d440b8657b443a6fad4983cd8caf692b6d9) on 2018-09-01 by [@taion](https://github.com/taion) |
| [#395](/rfcs/395 "inputUnion type / RFC1") | [@tgriesser](https://github.com/tgriesser) | inputUnion type | **[Spec PR](https://github.com/graphql/graphql-spec/pull/395) created** on 2018-01-11 by tgriesser |




## [Stage 0: Strawman](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-0-strawman)


<!-- prettier-ignore -->
| RFC | Champion | Title | Latest |
| --- | --- | --- | --- |
| [#1063](/rfcs/1063 "Type system ordering of: object interfaces, directive arguments, input object fields, enum values / RFC0") | [@benjie](https://github.com/benjie) | Type system ordering of: object interfaces, directive arguments, input object fields, enum values | **Added to [2024-01-04 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2024/01-Jan/04-wg-primary.md)** |
| [#1059](/rfcs/1059 "Introduce Strict and Legacy All Variable Usages Are Allowed / RFC0") | [@benjie](https://github.com/benjie) | Introduce Strict and Legacy All Variable Usages Are Allowed | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/12-Dec/07-wg-primary.md)** |
| [#1053](/rfcs/1053 "Implementations may not deprecate a field that the interface hasn't deprecated / RFC0") | [@benjie](https://github.com/benjie) | Implementations may not deprecate a field that the interface hasn't deprecated | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/12-Dec/07-wg-primary.md)** |
| [#1056](/rfcs/1056 "Fix CoerceArgumentValues() hasValue / RFC0") | [@benjie](https://github.com/benjie) | Fix CoerceArgumentValues() hasValue | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/12-Dec/07-wg-primary.md)** |
| [#1057](/rfcs/1057 "Fix coercion table for list / RFC0") | [@benjie](https://github.com/benjie) | Fix coercion table for list | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/12-Dec/07-wg-primary.md)** |
| [#1058](/rfcs/1058 "List coercion algorithm / RFC0") | [@benjie](https://github.com/benjie) | List coercion algorithm | **Added to [2023-12-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/12-Dec/07-wg-primary.md)** |
| [wg#1410](/rfcs/wg1410 "Strict Semantic Nullability / RFC0") | [@leebyron](https://github.com/leebyron) | Strict Semantic Nullability | **[WG discussion](https://github.com/graphql/graphql-wg/discussions/1410) created** on 2023-10-05 by leebyron |
| [#1050](/rfcs/1050 "Directive proposal for opting out of null bubbling / RFC0") | [@benjie](https://github.com/benjie) | Directive proposal for opting out of null bubbling | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1050) created** on 2023-10-05 by benjie |
| [#1065](/rfcs/1065 "SemanticNonNull type (null only on error) / RFC0") | [@benjie](https://github.com/benjie) | SemanticNonNull type (null only on error) | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1065) created** on 2023-11-24 by benjie |
| [#1048](/rfcs/1048 "Null-Only-On-Error / Semantically-Non-Null type (asterisk) / RFC0") | [@benjie](https://github.com/benjie) | Null-Only-On-Error / Semantically-Non-Null type (asterisk) | **Added to [2023-10-05 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/10-Oct/05-wg-primary.md)** |
| [wg#1394](/rfcs/wg1394 "True Nullability Schema / RFC0") | [@captbaritone](https://github.com/captbaritone) | True Nullability Schema | **[WG discussion](https://github.com/graphql/graphql-wg/discussions/1394) created** on 2023-09-12 by captbaritone |
| [#1045](/rfcs/1045 "Remove fragmentSpreadName from visitedFragments when visit is complete / RFC0") | [@benjie](https://github.com/benjie) | Remove fragmentSpreadName from visitedFragments when visit is complete | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1045) created** on 2023-09-11 by benjie |
| [FullSchemas](/rfcs/FullSchemas "Full Schemas / RFC0") | - | Full Schemas | **[RFC document created](https://github.com/graphql/graphql-wg/blob/297b11eabb3de0fff2457401ea147ecdb8228e24/rfcs/FullSchemas.md)** on 2023-08-26 by Martin Bonnin |
| [FeatureDiscovery](/rfcs/FeatureDiscovery "Feature Discovery / RFC0") | - | Feature Discovery | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/5bfb8d590cc9693db1149b547d8db5041f05b731/rfcs/FeatureDiscovery.md)** on 2023-11-28 by Benjie Gillam |
| [#1018](/rfcs/1018 "Alternative proposal for @stream/@defer / RFC0") | [@benjie](https://github.com/benjie) | Alternative proposal for @stream/@defer | **Added to [2023-04-06 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/04-Apr/06-wg-primary.md)** |
| [FragmentArguments](/rfcs/FragmentArguments "Fragment Arguments / RFC0") | - | Fragment Arguments | **[RFC document created](https://github.com/graphql/graphql-wg/blob/7f882eb24f26b54b7663f766c69d0a3b0ef76535/rfcs/FragmentArguments.md)** on 2023-02-10 by Matt Mahoney |
| [#1015](/rfcs/1015 "“Root“ Types clarity _ “Operation Type“ / RFC0") | [@leebyron](https://github.com/leebyron) | "Root" Types clarity _ "Operation Type" | **Added to [2023-03-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/03-Mar/02-wg-primary.md)** |
| [wg#1239](/rfcs/wg1239 "Fragment Arguments: RFC + Implementation Details / RFC0") | [@mjmahone](https://github.com/mjmahone) | Fragment Arguments: RFC + Implementation Details | **[WG discussion](https://github.com/graphql/graphql-wg/discussions/1239) created** on 2023-01-19 by mjmahone |
| [#999](/rfcs/999 "introduce ExecuteGroupedFieldSet, CollectRootFields and CollectSubfields / RFC0") | [@yaacovCR](https://github.com/yaacovCR) | introduce ExecuteGroupedFieldSet, CollectRootFields and CollectSubfields | **Added to [2023-06-01 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/06-Jun/01-wg-primary.md)** |
| [#998](/rfcs/998 "add spec edits for references / RFC0") | [@yaacovCR](https://github.com/yaacovCR) | add spec edits for references | **[Spec PR](https://github.com/graphql/graphql-spec/pull/998) created** on 2022-11-03 by yaacovCR |
| [ExpandingSubtyping](/rfcs/ExpandingSubtyping "Expanding Subtyping (for output types) / RFC0") | - | Expanding Subtyping (for output types) | **[RFC document created](https://github.com/graphql/graphql-wg/blob/cb872fe1a574121eb3dd2e9fdb848da70a552d9f/rfcs/ExpandingSubtyping.md)** on 2022-08-31 by Yaacov Rydzinski |
| [AnnotationStructs](/rfcs/AnnotationStructs "Annotation Structs / RFC0") | - | Annotation Structs | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/b7c9e683ea40b776dceb560bac46b7937cdcbeac/rfcs/AnnotationStructs.md)** on 2022-08-31 by Benjie |
| [wg#1096](/rfcs/wg1096 "“Metadata Directives“ Proposal / RFC0") | [@leebyron](https://github.com/leebyron) | "Metadata Directives" Proposal | **[WG discussion](https://github.com/graphql/graphql-wg/discussions/1096) created** on 2022-08-04 by leebyron |
| [wg#1071](/rfcs/wg1071 "Struct type / RFC0") | [@benjie](https://github.com/benjie) | Struct type | **[WG discussion](https://github.com/graphql/graphql-wg/discussions/1071) created** on 2022-07-18 by benjie |
| [MetadataStructs](/rfcs/MetadataStructs "Metadata Structs / RFC0") | - | Metadata Structs | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/6883f460ae07a954e5c9cc240bb280733e2a184b/rfcs/MetadataStructs.md)** on 2022-08-16 by Benjie |
| [Struct](/rfcs/Struct "Polymorphic-capable composite symmetric input/output type (struct) / RFC0") | - | Polymorphic-capable composite symmetric input/output type (struct) | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/c46f67dad4154c3b693d337c815900a5c7909423/rfcs/Struct.md)** on 2023-11-28 by Benjie |
| [#960](/rfcs/960 "Allow recursion within ResolveAbstractType / RFC0") | [@yaacovCR](https://github.com/yaacovCR) | Allow recursion within ResolveAbstractType | **Added to [2022-07-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-07-07.md)** |
| [OptInFeatures](/rfcs/OptInFeatures "Opt-in features / RFC0") | - | Opt-in features | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/f3fa75bc36e91ab8036fdf2350a3baddd00045f2/rfcs/OptInFeatures.md)** on 2022-09-30 by Martin Bonnin |
| [CompositeSchemas](/rfcs/CompositeSchemas "GraphQL Composite Schemas / RFC0") | - | GraphQL Composite Schemas | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/acb8ff08d3f153b7511ddff2441ef11177fefb5b/rfcs/CompositeSchemas.md)** on 2022-07-22 by Daniel Winter |
| [wg#944](/rfcs/wg944 "New Intersection Type / RFC0") | [@yaacovCR](https://github.com/yaacovCR) | New Intersection Type | **[WG discussion](https://github.com/graphql/graphql-wg/discussions/944) created** on 2022-04-30 by yaacovCR |
| [wg#857](/rfcs/wg857 "Fragment Modularity / RFC0") | [@mjmahone](https://github.com/mjmahone) | Fragment Modularity | **[WG discussion](https://github.com/graphql/graphql-wg/discussions/857) created** on 2022-01-07 by mjmahone |
| [FragmentModularity](/rfcs/FragmentModularity "Fragment Modularity / RFC0") | - | Fragment Modularity | **[RFC document created](https://github.com/graphql/graphql-wg/blob/d6103434afc3e516240f7b53721eb7b728ca525c/rfcs/FragmentModularity.md)** on 2022-01-06 by Matt Mahoney |
| [wg#815](/rfcs/wg815 "Nested GraphQL Mutations / RFC0") | [@leebyron](https://github.com/leebyron) | Nested GraphQL Mutations | **[WG discussion](https://github.com/graphql/graphql-wg/discussions/815) created** on 2021-12-02 by leebyron |
| [ClientControlledNullability](/rfcs/ClientControlledNullability "Client Controlled Nullability / RFC0") | - | Client Controlled Nullability | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/ca0fc775c66ae0e31c4ed605503a2679d9390705/rfcs/ClientControlledNullability.md)** on 2023-11-28 by Benjie Gillam |
| [#888](/rfcs/888 "Map type / RFC0") | [@nojvek](https://github.com/nojvek) | Map type | **Added to [2021-10-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2021/2021-10-07.md)** |
| [OperationExpressions](/rfcs/OperationExpressions "Operation Expressions / RFC0") | - | Operation Expressions | **[RFC document created](https://github.com/graphql/graphql-wg/blob/40a5e9ddbb41af18972df0cbc74945c09fb7b935/rfcs/OperationExpressions.md)** on 2021-09-02 by Benjie Gillam |
| [ImplicitInheritance](/rfcs/ImplicitInheritance "Implicit Inheritance / RFC0") | - | Implicit Inheritance | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/06122e6774b9c4237513187068f46be6fa67a26e/rfcs/ImplicitInheritance.md)** on 2021-09-03 by Lee Byron |
| [SchemaFragments](/rfcs/SchemaFragments "Schema Fragments / RFC0") | - | Schema Fragments | **[RFC document created](https://github.com/graphql/graphql-wg/blob/47d7a8004b1469a9d0480446c820dc9ad01e78b9/rfcs/SchemaFragments.md)** on 2021-09-02 by Daniel Starns |
| [#879](/rfcs/879 "__fulfilled meta field / RFC0") | [@mjmahone](https://github.com/mjmahone) | __fulfilled meta field | **Added to [2021-09-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2021/2021-09-02.md)** |
| [#948](/rfcs/948 "OneOf Objects / RFC0") | [@benjie](https://github.com/benjie) | OneOf Objects | **Added to [2022-06-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2022/2022-06-02.md)** |
| [#823](/rfcs/823 "operation expressions / RFC0") | [@benjie](https://github.com/benjie) | operation expressions | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/f982594af97e66591729124e4670e4b965c5f7bb) on 2021-03-16 by [@benjie](https://github.com/benjie) |
| [#1023](/rfcs/1023 "incremental delivery without branching / RFC0") | [@yaacovCR](https://github.com/yaacovCR) | incremental delivery without branching | **[Spec PR](https://github.com/graphql/graphql-spec/pull/1023) created** on 2023-03-24 by yaacovCR |
| [#1026](/rfcs/1026 "incremental delivery with deduplication + concurrent execution / RFC0") | [@yaacovCR](https://github.com/yaacovCR) | incremental delivery with deduplication + concurrent execution | **Added to [2023-06-01 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/06-Jun/01-wg-primary.md)** |
| [#1034](/rfcs/1034 "incremental delivery with deduplication + concurrent execution / RFC0") | [@yaacovCR](https://github.com/yaacovCR) | incremental delivery with deduplication + concurrent execution | **Commit pushed**: [use identifiers instead of records when possible](https://github.com/graphql/graphql-spec/commit/813ea2c84694bb356325cd3fc63d6977c38d42c6) on 2023-09-28 by [@yaacovCR](https://github.com/yaacovCR) |
| [#1052](/rfcs/1052 "deduplicated incremental delivery / RFC0") | [@yaacovCR](https://github.com/yaacovCR) | deduplicated incremental delivery | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/b4fb13cfca9a4df865d1e34a0b10f16029701961) on 2023-11-20 by [@yaacovCR](https://github.com/yaacovCR) |
| [SchemaCoordinates](/rfcs/SchemaCoordinates "Schema Coordinates / RFC0") | - | Schema Coordinates | **[RFC document created](https://github.com/graphql/graphql-wg/blob/257673b7ede31f1856b53ae833a43fc5034ac99b/rfcs/SchemaCoordinates.md)** on 2021-01-07 by Mark Larah |
| [#806](/rfcs/806 "__typename should be valid at subscription root / RFC0") | [@benjie](https://github.com/benjie) | __typename should be valid at subscription root | **[Spec PR](https://github.com/graphql/graphql-spec/pull/806) created** on 2020-12-05 by benjie |
| [#710](/rfcs/710 "Add namedType and punctuatedName to __Type / RFC0") | [@chemisus](https://github.com/chemisus) | Add namedType and punctuatedName to __Type | **Added to [2020-05-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-05-07.md)** |
| [#706](/rfcs/706 "Add support for directives for an object field name / RFC0") | [@francisu](https://github.com/francisu) | Add support for directives for an object field name | **[Spec PR](https://github.com/graphql/graphql-spec/pull/706) created** on 2020-04-07 by francisu |
| [#674](/rfcs/674 "allow empty selections / RFC0") | [@kassens](https://github.com/kassens) | allow empty selections | **[Spec PR](https://github.com/graphql/graphql-spec/pull/674) created** on 2020-01-21 by kassens |
| [#673](/rfcs/673 "Servers must preserve lexical ordering between SDL and introspection / RFC0") | [@spawnia](https://github.com/spawnia) | Servers must preserve lexical ordering between SDL and introspection | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/6e3d2d3fbc2d99fb505e7e268ca779763452ceb4) on 2022-06-16 by [@spawnia](https://github.com/spawnia) |
| [DeferStream](/rfcs/DeferStream "GraphQL Defer and Stream Directives / RFC0") | - | GraphQL Defer and Stream Directives | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/e4ef5f9d5997815d9de6681655c152b6b7838b4c/rfcs/DeferStream.md)** on 2022-01-17 by Rob Richard |
| [#667](/rfcs/667 "\[RFC Sketch] Defer and Stream Directives / RFC0") | [@lilianammmatos](https://github.com/lilianammmatos) | \[RFC Sketch] Defer and Stream Directives | **Added to [2020-01-09 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2020/2020-01-09.md)** |
| [#631](/rfcs/631 "Make root query operation type optional / RFC0") | [@victorandree](https://github.com/victorandree) | Make root query operation type optional | **Added to [2019-12-05 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-12-05.md)** |
| [InputUnion](/rfcs/InputUnion "GraphQL Input Union / RFC0") | - | GraphQL Input Union | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/ca0fc775c66ae0e31c4ed605503a2679d9390705/rfcs/InputUnion.md)** on 2023-11-28 by Benjie Gillam |
| [#586](/rfcs/586 "Input Objects accepting exactly @oneField / RFC0") | [@benjie](https://github.com/benjie) | Input Objects accepting exactly @oneField | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/bba008cc44a322f30da146b197464dbd14d3e36a) on 2019-07-22 by [@benjie](https://github.com/benjie) |
| [#567](/rfcs/567 "allow directives on directive definitions / RFC0") | [@benhead](https://github.com/benhead) | allow directives on directive definitions | **[Spec PR](https://github.com/graphql/graphql-spec/pull/567) created** on 2019-02-28 by benhead |
| [#556](/rfcs/556 "Document Directives / RFC0") | [@langpavel](https://github.com/langpavel) | Document Directives | **Commit pushed**: [Document directives are not special](https://github.com/graphql/graphql-spec/commit/f89de40eb8f7e0c2ab27a81ba9fac9cc1a89fbee) on 2019-02-01 by [@langpavel](https://github.com/langpavel) |
| [#471](/rfcs/471 "Limit uniqueness to @skip, @include and @deprecated directives / RFC0") | [@OlegIlyenko](https://github.com/OlegIlyenko) | Limit uniqueness to @skip, @include and @deprecated directives | **Commit pushed**: [Include @deprecated directive in the validation rule](https://github.com/graphql/graphql-spec/commit/6de60190153402f49ec5fce92a6d6f19ce52a4b8) on 2018-06-25 by [@OlegIlyenko](https://github.com/OlegIlyenko) |
| [#325](/rfcs/325 "Add “Any“ scalar type / RFC0") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add "Any" scalar type | **[Spec PR](https://github.com/graphql/graphql-spec/pull/325) created** on 2017-06-19 by IvanGoncharov |
| [#326](/rfcs/326 "Scalar serialize as built-in scalar type / RFC0") | [@leebyron](https://github.com/leebyron) | Scalar serialize as built-in scalar type | **[Spec PR](https://github.com/graphql/graphql-spec/pull/326) created** on 2017-06-20 by leebyron |
| [#521](/rfcs/521 "Scalar serialize as built-in scalar type / RFC0") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Scalar serialize as built-in scalar type | **[Spec PR](https://github.com/graphql/graphql-spec/pull/521) created** on 2018-10-14 by IvanGoncharov |
| [Subscriptions](/rfcs/Subscriptions "NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official \[June 2018 GraphQL Specification](https://spec.graphql.org/June2018/). / RFC0") | - | NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official \[June 2018 GraphQL Specification](https://spec.graphql.org/June2018/). | **[RFC document updated](https://github.com/graphql/graphql-wg/blob/5db83c773d7950a05a9306d1cd8d7e0704e77bda/rfcs/Subscriptions.md)** on 2020-08-19 by Benjie Gillam |




## [Stage 3: Accepted](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-3-accepted)


<!-- prettier-ignore -->
| RFC | Champion | Title | Latest |
| --- | --- | --- | --- |
| [#987](/rfcs/987 "Fix ambiguity around when schema definition may be omitted / RFC3") | [@benjie](https://github.com/benjie) | Fix ambiguity around when schema definition may be omitted | **Commit pushed**: [add related definition and specific example](https://github.com/graphql/graphql-spec/commit/058b4ec190b01834d3a44647b87795235d925d24) on 2023-02-09 by [@leebyron](https://github.com/leebyron) |
| [#891](/rfcs/891 "Add explanation about argument name uniqueness. / RFC3") | [@dugenkui03](https://github.com/dugenkui03) | Add explanation about argument name uniqueness. | **Added to [2023-02-02 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2023/02-Feb/02-wg-primary.md)** |
| [#849](/rfcs/849 "Allow full unicode range / RFC3") | [@leebyron](https://github.com/leebyron) | Allow full unicode range | **Commit pushed**: [Editorial](https://github.com/graphql/graphql-spec/commit/68713052d9af68756df196b549e86fb47052a802) on 2022-06-02 by [@leebyron](https://github.com/leebyron) |
| [#805](/rfcs/805 "Allow deprecation of input values (field args, directive args, input fields) / RFC3") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Allow deprecation of input values (field args, directive args, input fields) | **Commit pushed**: [Editorial](https://github.com/graphql/graphql-spec/commit/127f0ef23b74f6437ab6d4d26678b0b873adfc89) on 2022-06-03 by [@leebyron](https://github.com/leebyron) |
| [#803](/rfcs/803 "Replace 'query error' with 'request error' / RFC3") | [@benjie](https://github.com/benjie) | Replace 'query error' with 'request error' | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/c63b6a5968cf30ace12e1873c90e05a89c1db13d) on 2021-04-07 by [@leebyron](https://github.com/leebyron) |
| [#776](/rfcs/776 "__typename is not valid at subscription root / RFC3") | [@benjie](https://github.com/benjie) | __typename is not valid at subscription root | **Added to [2021-05-13 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2021/2021-05-13.md)** |
| [#701](/rfcs/701 "Disallow non-breakable chains of circular references in Input Objects / RFC3") | [@spawnia](https://github.com/spawnia) | Disallow non-breakable chains of circular references in Input Objects | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/90744b14e01027a200541d48c2772e605df959f8) on 2021-01-11 by [@leebyron](https://github.com/leebyron) |
| [#649](/rfcs/649 "Custom Scalar Specification URLs / RFC3") | [@eapache](https://github.com/eapache) | Custom Scalar Specification URLs | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/89014b934809e2bfb0da112a9acb5510871b566f) on 2021-04-09 by [@leebyron](https://github.com/leebyron) |
| [#601](/rfcs/601 "Number value literal lookahead restrictions / RFC3") | [@leebyron](https://github.com/leebyron) | Number value literal lookahead restrictions | **Added to [2019-10-10 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-10-10.md)** |
| [#598](/rfcs/598 "Avoid parse ambiguity on types &amp; extensions / RFC3") | [@leebyron](https://github.com/leebyron) | Avoid parse ambiguity on types &amp; extensions | **Added to [2019-08-01 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-08-01.md)** |
| [#599](/rfcs/599 "Clarify that lexing is greedy / RFC3") | [@leebyron](https://github.com/leebyron) | Clarify that lexing is greedy | **Added to [2019-10-10 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-10-10.md)** |
| [#510](/rfcs/510 "Allow directives on variable definitions / RFC3") | [@mjmahone](https://github.com/mjmahone) | Allow directives on variable definitions | **[Spec PR](https://github.com/graphql/graphql-spec/pull/510) created** on 2018-08-29 by mjmahone |
| [#472](/rfcs/472 "Repeatable directives / RFC3") | [@OlegIlyenko](https://github.com/OlegIlyenko) | Repeatable directives | **2 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/69669c3cf773d61ff3adbe243e4c4b0e4e21d7ab) on 2020-01-10 by [@leebyron](https://github.com/leebyron) |
| [#470](/rfcs/470 "“Directive order is significant“ section / RFC3") | [@OlegIlyenko](https://github.com/OlegIlyenko) | "Directive order is significant" section | **[Spec PR](https://github.com/graphql/graphql-spec/pull/470) created** on 2018-06-23 by OlegIlyenko |
| [#466](/rfcs/466 "Add description to Schema / RFC3") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add description to Schema | **[Spec PR](https://github.com/graphql/graphql-spec/pull/466) created** on 2018-06-13 by IvanGoncharov |
| [#463](/rfcs/463 "Ensure validation of directive arguments / RFC3") | [@leebyron](https://github.com/leebyron) | Ensure validation of directive arguments | **[Spec PR](https://github.com/graphql/graphql-spec/pull/463) created** on 2018-06-11 by leebyron |
| [#462](/rfcs/462 "Input &amp; Output type definition / RFC3") | [@leebyron](https://github.com/leebyron) | Input &amp; Output type definition | **[Spec PR](https://github.com/graphql/graphql-spec/pull/462) created** on 2018-06-11 by leebyron |
| [#459](/rfcs/459 "Remove Interface is implemented by 1+ Objects validation / RFC3") | [@mjmahone](https://github.com/mjmahone) | Remove Interface is implemented by 1+ Objects validation | **[Spec PR](https://github.com/graphql/graphql-spec/pull/459) created** on 2018-06-08 by mjmahone |
| [#454](/rfcs/454 "Add validation steps for schema extensions / RFC3") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add validation steps for schema extensions | **[Spec PR](https://github.com/graphql/graphql-spec/pull/454) created** on 2018-06-04 by IvanGoncharov |
| [#445](/rfcs/445 "Disallow non-breakable chains of circular references in Input Objects / RFC3") | [@spawnia](https://github.com/spawnia) | Disallow non-breakable chains of circular references in Input Objects | **Added to [2019-11-07 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-11-07.md)** |
| [#373](/rfcs/373 "Allow interfaces to implement other interfaces / RFC3") | [@mike-marcacci](https://github.com/mike-marcacci) | Allow interfaces to implement other interfaces | **5 commits pushed**: [(latest)](https://github.com/graphql/graphql-spec/commit/db7b7e119f8f23b3033ec70da482f2894f045f3f) on 2020-01-11 by [@leebyron](https://github.com/leebyron) |




## [Stage X: Rejected](https://github.com/graphql/graphql-spec/blob/main/CONTRIBUTING.md#stage-x-rejected)


<!-- prettier-ignore -->
| RFC | Champion | Title | Latest |
| --- | --- | --- | --- |
| [#606](/rfcs/606 "Support empty composite types / RFCX") | [@victorandree](https://github.com/victorandree) | Support empty composite types | **Added to [2019-12-05 WG agenda](https://github.com/graphql/graphql-wg/blob/main/agendas/2019/2019-12-05.md)** |
| [#460](/rfcs/460 "Require Interfaces to have 1+ Objects implementing / RFCX") | [@mjmahone](https://github.com/mjmahone) | Require Interfaces to have 1+ Objects implementing | **Commit pushed**: [Merge branch 'master' into rfc-interfaces-implemented](https://github.com/graphql/graphql-spec/commit/ea1992d3d49d871026f20a3831daff036f5c8b5c) on 2018-06-11 by [@leebyron](https://github.com/leebyron) |
| [#319](/rfcs/319 "Add '@ignoreIfUnknown' to allow forward compatibility for clients / RFCX") | [@IvanGoncharov](https://github.com/IvanGoncharov) | Add '@ignoreIfUnknown' to allow forward compatibility for clients | **Mentioned in [2020-02-06 WG notes](https://github.com/graphql/graphql-wg/blob/main/notes/2020/2020-02-06.md)** |
| [#315](/rfcs/315 "Support DateTime scalar / RFCX") | [@excitement-engineer](https://github.com/excitement-engineer) | Support DateTime scalar | **[Spec PR](https://github.com/graphql/graphql-spec/pull/315) created** on 2017-05-26 by excitement-engineer |
| [#232](/rfcs/232 "__id field for unique identifiers / RFCX") | [@stubailo](https://github.com/stubailo) | __id field for unique identifiers | **Commit pushed**: [Remove .vscode from gitignore](https://github.com/graphql/graphql-spec/commit/c2f2b8e0ba66e774ef17f5dc638920831c595fc1) on 2016-10-31 by Sashko Stubailo |



