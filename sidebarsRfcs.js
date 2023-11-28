// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  rfcsSidebar: [
    {
      type: "category",
      label: "GraphQL RFCs",
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: "doc",
          id: "825",
          label: "825*: OneOf Input Objects [RFC2]",
        },
        {
          type: "doc",
          id: "794",
          label: "794: Schema Coordinates [RFC2]",
        },
        {
          type: "doc",
          id: "793",
          label: "793*: Default value coercion rules [RFC2]",
        },
        {
          type: "doc",
          id: "742",
          label: "742: Spec edits for @defer/@stream [RFC2]",
        },
        {
          type: "doc",
          id: "525",
          label: "525: Allow deprecation of input values [RFC2]",
        },
        {
          type: "doc",
          id: "1010",
          label: "1010: Fragment Arguments: Spec Implementation [RFC1]",
        },
        {
          type: "doc",
          id: "997",
          label: "997: Expand @deprecated to Objects [RFC1]",
        },
        {
          type: "doc",
          id: "955",
          label: "955: Add validation rule that operation types exist [RFC1]",
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
          id: "895",
          label: "895: Client Controlled Nullability [RFC1]",
        },
        {
          type: "doc",
          id: "892",
          label: "892: Add descriptions to executable definitions [RFC1]",
        },
        {
          type: "doc",
          id: "883",
          label: "883: Relax SameResponseShape algorithm to be compatible with covariant fields [RFC1]",
        },
        {
          type: "doc",
          id: "877",
          label: "877: Forbid duplicating argument names [RFC1]",
        },
        {
          type: "doc",
          id: "865",
          label: "865: Fragment Arguments (parameterized fragments) for GraphQL [RFC1]",
        },
        {
          type: "doc",
          id: "860",
          label: "860*: Prevent @skip and @include on root subscription selection set [RFC1]",
        },
        {
          type: "doc",
          id: "733",
          label: "733*: Tagged type [RFC1]",
        },
        {
          type: "doc",
          id: "509",
          label: "509: Allow singular variables in list locations [RFC1]",
        },
        {
          type: "doc",
          id: "395",
          label: "395: inputUnion type [RFC1]",
        },
        {
          type: "doc",
          id: "1065",
          label: "1065*: SemanticNonNull type (null only on error) [RFC0]",
        },
        {
          type: "doc",
          id: "1063",
          label: "1063*: Type system ordering of: object interfaces, directive arguments, input object fields, enum values [RFC0]",
        },
        {
          type: "doc",
          id: "1059",
          label: "1059*: Introduce Strict and Legacy All Variable Usages Are Allowed [RFC0]",
        },
        {
          type: "doc",
          id: "1058",
          label: "1058*: List coercion algorithm [RFC0]",
        },
        {
          type: "doc",
          id: "1057",
          label: "1057*: Fix coercion table for list [RFC0]",
        },
        {
          type: "doc",
          id: "1056",
          label: "1056*: Fix CoerceArgumentValues() hasValue [RFC0]",
        },
        {
          type: "doc",
          id: "1053",
          label: "1053*: Implementations may not deprecate a field that the interface hasn't deprecated [RFC0]",
        },
        {
          type: "doc",
          id: "1050",
          label: "1050*: Directive proposal for opting out of null bubbling [RFC0]",
        },
        {
          type: "doc",
          id: "1048",
          label: "1048*: Null-Only-On-Error / Semantically-Non-Null type (asterisk) [RFC0]",
        },
        {
          type: "doc",
          id: "1045",
          label: "1045*: Remove fragmentSpreadName from visitedFragments when visit is complete [RFC0]",
        },
        {
          type: "doc",
          id: "1018",
          label: "1018*: Alternative proposal for `@stream`/`@defer` [RFC0]",
        },
        {
          type: "doc",
          id: "948",
          label: "948*: OneOf Objects [RFC0]",
        },
        {
          type: "doc",
          id: "823",
          label: "823*: operation expressions [RFC0]",
        },
        {
          type: "doc",
          id: "806",
          label: "806*: __typename should be valid at subscription root [RFC0]",
        },
        {
          type: "doc",
          id: "586",
          label: "586*: Input Objects accepting exactly @oneField [RFC0]",
        },
        {
          type: "doc",
          id: "987",
          label: "987*: Fix ambiguity around when schema definition may be omitted [RFC3]",
        },
        {
          type: "doc",
          id: "803",
          label: "803*: Replace 'query error' with 'request error' [RFC3]",
        },
        {
          type: "doc",
          id: "776",
          label: "776*: __typename is not valid at subscription root [RFC3]",
        },
      ],
      link: {
        type: "doc",
        id: "index",
      },
    },
  ],
};

export default sidebars;
