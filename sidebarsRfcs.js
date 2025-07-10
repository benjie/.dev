// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
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
    {
      type: "category",
      label: "Stage 3: Accepted",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "1056",
          label: "1056*: Fix CoerceArgumentValues() hasValue [RFC3]",
        },
        {
          type: "doc",
          id: "793",
          label: "793*: Default value coercion rules [RFC3]",
        },
        {
          type: "doc",
          id: "1102",
          label: "1102*: Define Data Collections used in the spec [RFC3]",
        },
        {
          type: "doc",
          id: "1170",
          label: "1170: Add descriptions to executable documents | 2025 Update [RFC3]",
        },
        {
          type: "doc",
          id: "955",
          label: "955: Add validation rule that operation types exist [RFC3]",
        },
        {
          type: "doc",
          id: "1167",
          label: "1167*: Do not exclude schema keyword if schema has description [RFC3]",
        },
        {
          type: "doc",
          id: "860",
          label: "860*: Prevent @skip and @include on root subscription selection set [RFC3]",
        },
        {
          type: "doc",
          id: "1053",
          label: "1053*: Implementations may not deprecate a field that the interface hasn't deprecated [RFC3]",
        },
        {
          type: "doc",
          id: "1142",
          label: "1142: make `includeDeprecated` non nullable [RFC3]",
        },
        {
          type: "doc",
          id: "976",
          label: "976*: Add 'extensions' to request [RFC3]",
        },
        {
          type: "doc",
          id: "1040",
          label: "1040: Make the reason argument in `@deprecated` non-nullable [RFC3]",
        },
        {
          type: "doc",
          id: "1073",
          label: "1073: Be strict about error paths format [RFC3]",
        },
        {
          type: "doc",
          id: "987",
          label: "987*: Fix ambiguity around when schema definition may be omitted [RFC3]",
        },
        {
          type: "doc",
          id: "891",
          label: "891: Add explanation about argument name uniqueness. [RFC3]",
        },
        {
          type: "doc",
          id: "805",
          label: "805: Allow deprecation of input values (field args, directive args, input fields) [RFC3]",
        },
        {
          type: "doc",
          id: "849",
          label: "849: Allow full unicode range [RFC3]",
        },
        {
          type: "doc",
          id: "776",
          label: "776*: __typename is not valid at subscription root [RFC3]",
        },
        {
          type: "doc",
          id: "649",
          label: "649: Custom Scalar Specification URLs [RFC3]",
        },
        {
          type: "doc",
          id: "803",
          label: "803*: Replace 'query error' with 'request error' [RFC3]",
        },
        {
          type: "doc",
          id: "525",
          label: "525: Allow deprecation of input values [RFC3]",
        },
        {
          type: "doc",
          id: "701",
          label: "701: Disallow non-breakable chains of circular references in Input Objects [RFC3]",
        },
        {
          type: "doc",
          id: "373",
          label: "373: Allow interfaces to implement other interfaces [RFC3]",
        },
        {
          type: "doc",
          id: "472",
          label: "472: Repeatable directives [RFC3]",
        },
        {
          type: "doc",
          id: "599",
          label: "599: Clarify that lexing is greedy [RFC3]",
        },
        {
          type: "doc",
          id: "601",
          label: "601: Number value literal lookahead restrictions [RFC3]",
        },
        {
          type: "doc",
          id: "598",
          label: "598: Avoid parse ambiguity on types & extensions [RFC3]",
        },
        {
          type: "doc",
          id: "510",
          label: "510: Allow directives on variable definitions [RFC3]",
        },
        {
          type: "doc",
          id: "470",
          label: "470: \"Directive order is significant\" section [RFC3]",
        },
        {
          type: "doc",
          id: "466",
          label: "466: Add description to Schema [RFC3]",
        },
        {
          type: "doc",
          id: "463",
          label: "463: Ensure validation of directive arguments [RFC3]",
        },
        {
          type: "doc",
          id: "462",
          label: "462: Input & Output type definition [RFC3]",
        },
        {
          type: "doc",
          id: "459",
          label: "459: Remove Interface is implemented by 1+ Objects validation [RFC3]",
        },
        {
          type: "doc",
          id: "454",
          label: "454: Add validation steps for schema extensions [RFC3]",
        },
        {
          type: "doc",
          id: "445",
          label: "445: Disallow non-breakable chains of circular references in Input Objects [RFC3]",
        },
      ],
    },
    {
      type: "category",
      label: "Stage 3: Accepted (pending edits)",
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "794",
          label: "794: Schema Coordinates [RFC3]",
        },
        {
          type: "doc",
          id: "825",
          label: "825*: OneOf Input Objects [RFC3]",
        },
        {
          type: "doc",
          id: "1092",
          label: "1092*: Recommend that order of unordered collections is maintained where possible [RFC3]",
        },
      ],
    },
    {
      type: "category",
      label: "Stage 2: Draft",
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "1058",
          label: "1058*: List coercion algorithm [RFC2]",
        },
        {
          type: "doc",
          id: "1081",
          label: "1081: Fragment arguments/variables (syntax/validation/execution) [RFC2]",
        },
        {
          type: "doc",
          id: "1063",
          label: "1063*: Type system ordering of: object interfaces, directive arguments, input object fields, enum values [RFC2]",
        },
      ],
    },
    {
      type: "category",
      label: "Stage 1: Proposal",
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "1177",
          label: "1177*: Incorporate meta-fields into ExecuteCollectedFields [RFC1]",
        },
        {
          type: "doc",
          id: "1163",
          label: "1163*: Allow clients to disable error propagation via request parameter (take 2) [RFC1]",
        },
        {
          type: "doc",
          id: "1179",
          label: "1179: CoerceInputValue() [RFC1]",
        },
        {
          type: "doc",
          id: "997",
          label: "997: Expand @deprecated to Objects [RFC1]",
        },
        {
          type: "doc",
          id: "1110",
          label: "1110: Incremental Delivery spec draft [RFC1]",
        },
        {
          type: "doc",
          id: "1127",
          label: "1127*: When `sourceStream` errors, yield a `{ errors: [...] }` response [RFC1]",
        },
        {
          type: "doc",
          id: "1059",
          label: "1059*: Introduce Strict and Legacy All Variable Usages Are Allowed [RFC1]",
        },
        {
          type: "doc",
          id: "950",
          label: "950: allow unions to include interfaces and unions [RFC1]",
        },
        {
          type: "doc",
          id: "939",
          label: "939: allow unions to declare implementation of interfaces [RFC1]",
        },
        {
          type: "doc",
          id: "907",
          label: "907: Add support for directives on directives [RFC1]",
        },
        {
          type: "doc",
          id: "509",
          label: "509: Allow singular variables in list locations [RFC1]",
        },
      ],
    },
    {
      type: "category",
      label: "Stage 0: Strawman",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "521",
          label: "521: Scalar serialize as built-in scalar type [RFC0]",
        },
        {
          type: "doc",
          id: "1045",
          label: "1045*: Remove fragmentSpreadName from visitedFragments when visit is complete [RFC0]",
        },
        {
          type: "doc",
          id: "1184",
          label: "1184*: Sibling errors should not be added after propagation [RFC0]",
        },
        {
          type: "doc",
          id: "InputUnion",
          label: "InputUnion: GraphQL Input Union [RFC0]",
        },
        {
          type: "doc",
          id: "SemanticNullability",
          label: "SemanticNullability: Semantic Nullability [RFC0]",
        },
        {
          type: "doc",
          id: "1165",
          label: "1165*: Add Transitional Non-Null appendix (`@noPropagate` directive) [RFC0]",
        },
        {
          type: "doc",
          id: "FieldExtensions",
          label: "FieldExtensions: Field Extensions [RFC0]",
        },
        {
          type: "doc",
          id: "1065",
          label: "1065*: SemanticNonNull type (null only on error) [RFC0]",
        },
        {
          type: "doc",
          id: "wg1700",
          label: "wg1700: Lee's new nullability & error propagation proposal [RFC0]",
        },
        {
          type: "doc",
          id: "DisableErrorPropagationDirective",
          label: "DisableErrorPropagationDirective: Disable Error Propagation Directive [RFC0]",
        },
        {
          type: "doc",
          id: "1050",
          label: "1050*: Directive proposal for opting out of null bubbling [RFC0]",
        },
        {
          type: "doc",
          id: "ClientControlledNullability",
          label: "ClientControlledNullability: Client Controlled Nullability [RFC0]",
        },
        {
          type: "doc",
          id: "1114",
          label: "1114: add __directive meta field parallel to __type [RFC0]",
        },
        {
          type: "doc",
          id: "1057",
          label: "1057*: Fix coercion table for list [RFC0]",
        },
        {
          type: "doc",
          id: "DeferStream",
          label: "DeferStream: GraphQL Defer and Stream Directives [RFC0]",
        },
        {
          type: "doc",
          id: "SchemaCoordinates",
          label: "SchemaCoordinates: Schema Coordinates [RFC0]",
        },
        {
          type: "doc",
          id: "FeatureDiscovery",
          label: "FeatureDiscovery: Feature Discovery [RFC0]",
        },
        {
          type: "doc",
          id: "Struct",
          label: "Struct: Polymorphic-capable composite symmetric input/output type (`struct`) [RFC0]",
        },
        {
          type: "doc",
          id: "1049",
          label: "1049: Introduce SourceSchemaDocument and FullSchemaDocument [RFC0]",
        },
        {
          type: "doc",
          id: "wg1410",
          label: "wg1410: Strict Semantic Nullability [RFC0]",
        },
        {
          type: "doc",
          id: "wg1394",
          label: "wg1394: True Nullability Schema [RFC0]",
        },
        {
          type: "doc",
          id: "FullSchemas",
          label: "FullSchemas: Full Schemas [RFC0]",
        },
        {
          type: "doc",
          id: "1015",
          label: "1015: \"Root\" Types clarity → \"Operation Type\" [RFC0]",
        },
        {
          type: "doc",
          id: "FragmentArguments",
          label: "FragmentArguments: Fragment Arguments [RFC0]",
        },
        {
          type: "doc",
          id: "wg1239",
          label: "wg1239: Fragment Arguments: RFC + Implementation Details [RFC0]",
        },
        {
          type: "doc",
          id: "998",
          label: "998: add spec edits for references [RFC0]",
        },
        {
          type: "doc",
          id: "OptInFeatures",
          label: "OptInFeatures: Opt-in features [RFC0]",
        },
        {
          type: "doc",
          id: "ExpandingSubtyping",
          label: "ExpandingSubtyping: Expanding Subtyping (for output types) [RFC0]",
        },
        {
          type: "doc",
          id: "AnnotationStructs",
          label: "AnnotationStructs: Annotation Structs [RFC0]",
        },
        {
          type: "doc",
          id: "MetadataStructs",
          label: "MetadataStructs: Metadata Structs [RFC0]",
        },
        {
          type: "doc",
          id: "wg1096",
          label: "wg1096: \"Metadata Directives\" Proposal [RFC0]",
        },
        {
          type: "doc",
          id: "CompositeSchemas",
          label: "CompositeSchemas: GraphQL Composite Schemas [RFC0]",
        },
        {
          type: "doc",
          id: "wg1071",
          label: "wg1071*: Struct type [RFC0]",
        },
        {
          type: "doc",
          id: "673",
          label: "673: Servers must preserve lexical ordering between SDL and introspection [RFC0]",
        },
        {
          type: "doc",
          id: "wg944",
          label: "wg944: New Intersection Type [RFC0]",
        },
        {
          type: "doc",
          id: "wg857",
          label: "wg857: Fragment Modularity [RFC0]",
        },
        {
          type: "doc",
          id: "FragmentModularity",
          label: "FragmentModularity: Fragment Modularity [RFC0]",
        },
        {
          type: "doc",
          id: "wg815",
          label: "wg815: Nested GraphQL Mutations [RFC0]",
        },
        {
          type: "doc",
          id: "ImplicitInheritance",
          label: "ImplicitInheritance: Implicit Inheritance [RFC0]",
        },
        {
          type: "doc",
          id: "OperationExpressions",
          label: "OperationExpressions: Operation Expressions [RFC0]",
        },
        {
          type: "doc",
          id: "SchemaFragments",
          label: "SchemaFragments: Schema Fragments [RFC0]",
        },
        {
          type: "doc",
          id: "879",
          label: "879: __fulfilled meta field [RFC0]",
        },
        {
          type: "doc",
          id: "Subscriptions",
          label: "Subscriptions: NOTE: this document is kept for historic purposes; GraphQL Subscriptions have been specified and released as part of the official [June 2018 GraphQL Specification](https://spec.graphql.org/June2018/). [RFC0]",
        },
        {
          type: "doc",
          id: "710",
          label: "710: Add namedType and punctuatedName to __Type [RFC0]",
        },
        {
          type: "doc",
          id: "706",
          label: "706: Add support for directives for an object field name [RFC0]",
        },
        {
          type: "doc",
          id: "674",
          label: "674: allow empty selections [RFC0]",
        },
        {
          type: "doc",
          id: "631",
          label: "631: Make root query operation type optional [RFC0]",
        },
        {
          type: "doc",
          id: "567",
          label: "567: allow directives on directive definitions [RFC0]",
        },
        {
          type: "doc",
          id: "556",
          label: "556: Document Directives [RFC0]",
        },
        {
          type: "doc",
          id: "325",
          label: "325: Add \"Any\" scalar type [RFC0]",
        },
      ],
    },
    {
      type: "category",
      label: "Stage X: Rejected",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "1166",
          label: "1166*: Enable 'schema' keyword to be provided without root operations [RFCX]",
        },
        {
          type: "doc",
          id: "1018",
          label: "1018*: Alternative proposal for `@stream`/`@defer` [RFCX]",
        },
        {
          type: "doc",
          id: "960",
          label: "960: Allow recursion within ResolveAbstractType [RFCX]",
        },
        {
          type: "doc",
          id: "948",
          label: "948*: OneOf Objects [RFCX]",
        },
        {
          type: "doc",
          id: "895",
          label: "895: Client Controlled Nullability [RFCX]",
        },
        {
          type: "doc",
          id: "888",
          label: "888: Map type [RFCX]",
        },
        {
          type: "doc",
          id: "883",
          label: "883: Relax SameResponseShape algorithm to be compatible with covariant fields [RFCX]",
        },
        {
          type: "doc",
          id: "733",
          label: "733*: Tagged type [RFCX]",
        },
        {
          type: "doc",
          id: "806",
          label: "806*: __typename should be valid at subscription root [RFCX]",
        },
        {
          type: "doc",
          id: "319",
          label: "319: Add '@ignoreIfUnknown' to allow forward compatibility for clients [RFCX]",
        },
        {
          type: "doc",
          id: "606",
          label: "606: Support empty composite types [RFCX]",
        },
        {
          type: "doc",
          id: "460",
          label: "460: Require Interfaces to have 1+ Objects implementing [RFCX]",
        },
        {
          type: "doc",
          id: "395",
          label: "395: inputUnion type [RFCX]",
        },
        {
          type: "doc",
          id: "315",
          label: "315: Support DateTime scalar [RFCX]",
        },
        {
          type: "doc",
          id: "232",
          label: "232: __id field for unique identifiers [RFCX]",
        },
      ],
    },
    {
      type: "category",
      label: "Stage X: Superseded",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "823",
          label: "823*: operation expressions [RFCS]",
        },
        {
          type: "doc",
          id: "667",
          label: "667: [RFC Sketch] Defer and Stream Directives [RFCS]",
        },
        {
          type: "doc",
          id: "892",
          label: "892: Add descriptions to executable definitions [RFCS]",
        },
        {
          type: "doc",
          id: "1153",
          label: "1153*: Allow clients to disable error propagation via request parameter [RFCS]",
        },
        {
          type: "doc",
          id: "1157",
          label: "1157: Exclude custom scalar literals from validation [RFCS]",
        },
        {
          type: "doc",
          id: "1126",
          label: "1126*: GraphQL Subscriptions should handle errors in the source stream [RFCS]",
        },
        {
          type: "doc",
          id: "1098",
          label: "1098: Add 5.2.4 Operation Type Exists [RFCS]",
        },
        {
          type: "doc",
          id: "1091",
          label: "1091*: Define Data Collections used in the spec [RFCS]",
        },
        {
          type: "doc",
          id: "1010",
          label: "1010: Fragment Arguments: Spec Implementation [RFCS]",
        },
        {
          type: "doc",
          id: "1052",
          label: "1052: deduplicated incremental delivery [RFCS]",
        },
        {
          type: "doc",
          id: "1048",
          label: "1048*: Null-Only-On-Error / Semantically-Non-Null type (asterisk) [RFCS]",
        },
        {
          type: "doc",
          id: "1034",
          label: "1034: incremental delivery with deduplication + concurrent execution [RFCS]",
        },
        {
          type: "doc",
          id: "999",
          label: "999: introduce ExecuteGroupedFieldSet, CollectRootFields and CollectSubfields [RFCS]",
        },
        {
          type: "doc",
          id: "1026",
          label: "1026: incremental delivery with deduplication + concurrent execution [RFCS]",
        },
        {
          type: "doc",
          id: "1023",
          label: "1023: incremental delivery without branching [RFCS]",
        },
        {
          type: "doc",
          id: "742",
          label: "742: Spec edits for @defer/@stream [RFCS]",
        },
        {
          type: "doc",
          id: "865",
          label: "865: Fragment Arguments (parameterized fragments) for GraphQL [RFCS]",
        },
        {
          type: "doc",
          id: "877",
          label: "877: Forbid duplicating argument names [RFCS]",
        },
        {
          type: "doc",
          id: "586",
          label: "586*: Input Objects accepting exactly @oneField [RFCS]",
        },
        {
          type: "doc",
          id: "471",
          label: "471: Limit uniqueness to `@skip`, `@include` and `@deprecated` directives [RFCS]",
        },
        {
          type: "doc",
          id: "326",
          label: "326: Scalar serialize as built-in scalar type [RFCS]",
        },
      ],
    },
  ],
};

export default sidebars;
