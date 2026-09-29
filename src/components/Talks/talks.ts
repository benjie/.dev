export type DescriptionBlock = string | { items: string[] };

export type Talk = {
  year: number;
  title: string;
  event: string;
  location: string;
  sessionType?: string;
  topics: string[];
  subcategory?: string;
  description: DescriptionBlock[];
  replay?: string;
  resources?: string;
  featured?: boolean;
  embedUrl?: string;
  replayLabel?: string;
  resourcesLabel?: string;
};

// Keep newest talks first. Only one talk should have featured: true.
export const talks: Talk[] = [
  {
    year: 2026,
    title: "Gra*fast*: A Declarative Solution To GraphQL’s Execution Woes",
    event: "GraphQL Conf",
    location: "San Francisco",
    topics: ["GraphQL", "Gra*fast*"],
    description: [
      "A new approach to GraphQL execution, enabling engineers to build next-level efficiency into new or existing GraphQL APIs. This declarative approach to execution eliminates the many pitfalls of traditional resolvers and optimizes communications with your business logic. This is achieved through understanding the request's full data requirements and planning the best batched execution strategy before requesting anything from the business logic. This decoupling of data fetching from the GraphQL request shape results in fewer and more efficient operations against your backend services and data sources, eliminating both over- and under-fetching on the backend along with deduplication of redundant work, leading to reduced operational costs and delightful user experiences! A passion project of a founding GraphQL TSC member, this MIT-licensed open source technology has already been in production at a number of companies for over a year!",
    ],
    replay:
      "https://graphql.org/conf/2026/schedule/4173396a76b0052395608ef918aacdbf/",
    replayLabel: "Watch replay",
  },
  {
    year: 2026,
    title: "Creating a Golden Path for GraphQL",
    event: "GraphQL Conf",
    location: "San Francisco",
    sessionType: "Keynote presentation",
    topics: ["GraphQL"],
    subcategory: "Developer Experience",
    description: [
      "GraphQL's precise specification gives us incredible interoperability and a rich ecosystem of tooling to be used with any compliant GraphQL service... And yet, that hasn't led to every adopter of GraphQL having a great experience. Some leave disillusioned with performance pitfalls, security concerns, and unforeseen complexity. This can be frustrating for successful GraphQL practitioners since in many cases the solutions to these problems have existed for most of the last decade.",
      "The Golden Path Initiative aims to make it so avoiding common pitfalls becomes the path of least resistance. By encouraging off-the-shelf GraphQL-related software to implement the recommended default behaviours, we hope that GraphQL adopters will have the greatest chance of being successful even without ingesting the vast amount of information in the ecosystem. The Golden Path is not centred on building the most optimal experience, instead it is focused on minimizing downsides: making it so users are exploring around the  “pit of success”, and taking them far from the “pit of despair”.",
      "But to do this will take a huge, coordinated community effort! We need successful GraphQL practitioners; maintainers of key GraphQL libraries, frameworks and tooling; and documentation writers to join us over the next 6 months as we lay out the Golden Path, its recommendations and requirements; and then next year: time to start implementing it across the ecosystem!",
    ],
    replay:
      "https://www.graphql.org/conf/2026/schedule/0466574bdb1df2c888e087738a0248f8/",
    replayLabel: "Watch replay",
  },
  {
    year: 2026,
    title: "Celebrating Ten Years of PostGraphile",
    event: "London GraphQL",
    location: "London",
    topics: ["GraphQL", "PostGraphile"],
    description: [
      "GraphQL celebrated it's 10 year birthday last year, today it's PostGraphile's turn! Hear from maintainer Benjie about the origins of the project, the lessons learned along the way, and how the project has evolved to meet the needs of its users despite being MIT-licensed OSS.",
    ],
    replay: "https://youtu.be/47zxXJ2rUbc?si=xKH0zIrhNIfiH9eS",
    replayLabel: "Watch replay",
  },
  {
    year: 2025,
    title: "Fixing GraphQL’s Biggest Mistake in 512 Bytes",
    event: "GraphQL Conf",
    location: "Amsterdam",
    topics: ["GraphQL"],
    subcategory: "Nullability",
    description: [
      "GraphQL error handling sucks. There, I said it.",
      "Ever hunted through the errors list to figure out if a null was legit or caused by an error? If you're like me, you gave up and now treat nulls as “maybe errored, maybe absent, maybe both.”",
      "And nullability. Schema designers make anything that might fail nullable, producing partial responses when errors occur. But since anything can fail, now everything is nullable—and we're drowning in null checks. We recklessly cast to non-null or fall back to the empty string out of desperation. And we still don't know what's truly nullable.",
      "No more.",
      "This talk introduces a new, pragmatic approach, born from years of work by the Nullability WG. We propose a future where schemas reflect the true nullability of business entities, and error handling is where it belongs: in your code, not your data. Use your language's built-in tools to handle errors ergonomically; and drop the unnecessary null checks. When you read a null, it should mean one thing: the absence of data.",
      "This isn't some distant ideal on the horizon of GraphQL's future; with just 512 bytes added to your GraphQL client, you can start adopting this today. Come see how.",
    ],
    replay:
      "https://graphql.org/conf/2025/schedule/4ed67778faddda05ce0a191e525d43ee/",
    replayLabel: "Watch replay",
  },
  {
    year: 2025,
    title: "Imagining GraphQL 2.0: Choices in a Hypothetical Reboot",
    event: "GraphQL Conf",
    location: "Amsterdam",
    sessionType: "Panel discussion",
    topics: ["GraphQL"],
    description: [
      "This discussion embarks on a thought experiment to redesign GraphQL from the ground up. We will explore the choices that might be made if we could start over, free from the constraints of existing implementations.",
      "The session focuses on key areas where the current GraphQL specification has faced challenges and sparked debate within the community. Discussions will cover:",
      {
        items: [
          "Union Types: Exploring alternative approaches to improve flexibility and usability.",
          "Schema-Defined Nullability: Rethinking how nullability is handled to enhance clarity and consistency.",
          "Error Handling: Proposing new strategies for more robust and intuitive error management.",
        ],
      },
      "Through collaborative discussions and interactive exercises, participants will contribute insights and ideas, shaping a theoretical vision of what GraphQL 2.0 could look like. This thought exercise is designed to challenge assumptions and inspire innovative solutions.",
      "The session will conclude with a focus on the practicalities of evolving GraphQL towards a 2.0 version in the real world, exploring how to address these design challenges while considering migration paths and maintaining backward compatibility.",
    ],
    replay:
      "https://graphql.org/conf/2025/schedule/ad5afe76bbdfd270a14cbee25d11bd40/",
    replayLabel: "Watch replay",
  },
  {
    year: 2025,
    title: "Community Update 2025: Growing in the Open",
    event: "GraphQL Conf",
    location: "Amsterdam",
    sessionType: "Keynote presentation",
    topics: ["GraphQL"],
    subcategory: "Community",
    description: [
      "Even ten years in, GraphQL continues to evolve—not just in code, but in connection. This year the Foundation has doubled down on transparency, support, and shared leadership: board minutes are now public, Subject Matter Experts have helped shape the conference agenda, and we'll be launching a new program live on stage! There are also updates on our existing initiatives including community grants and GraphQL Locals.",
      "This talk is a thank you to the people behind the progress and a celebration of our growing constellation of contributors. It's also an invitation to step forward and get involved—one of the best ways to do that is by joining our new Community Working Group, giving passionate community members a voice in shaping the Foundation's directions and initiatives for the next ten years of GraphQL.",
    ],
    replay:
      "https://graphql.org/conf/2025/schedule/f31a60c9bffdbc04ea8fe446bd8d644b/",
    replayLabel: "Watch replay",
  },
  {
    year: 2025,
    title: "Updates from the GraphQL Working Groups",
    event: "London GraphQL",
    location: "London",
    topics: ["GraphQL"],
    subcategory: "GraphQL Spec",
    description: [
      "This ad-hoc talk is just Benjie (and Michael Staib from ChilliCream!) riffing about some of the work that's going on in the GraphQL Working Groups currently. Topics covered include: GraphQL Spec Freeze, incremental delivery, schema coordinates, fragment arguments, nullability, operation descriptions, service capabilities, GraphQL-over-HTTP, partial success status code, composite schemas, GraphQL.js 17, GraphiQL v5, open telemetry, documentation overhaul, community working group, website redesign",
      "GET INVOLVED!",
    ],
    replay: "https://guild.host/presentations/updates-from-the-graphql-65vw05",
    replayLabel: "Watch replay",
  },
  {
    year: 2024,
    title: "Techniques to Protect Your GraphQL API",
    event: "GraphQLConf",
    location: "San Francisco",
    topics: ["GraphQL", "Security"],
    subcategory: "Trusted Documents",
    description: [
      "GraphQL poses unique challenges when it comes to security due to the nature of its powerful query language. In this talk we'll explore different types of GraphQL APIs and their varying and common security needs. We'll then look at the techniques that can be used to protect these APIs and which techniques pair well with each API type. These techniques are not specific to any one vendor or programming language but general best practices that help protect your servers from threats both known and unknown. Attendees will come away with an understanding of common threats GraphQL APIs face, and suitable techniques to address them.",
    ],
    featured: true,
    embedUrl: "https://www.youtube.com/embed/W7qIux5BAvs",
    replay:
      "https://graphql.org/conf/2024/schedule/4dc607a403a2316846b59d0c5a9858c9/",
    resources: "/talks/techniques-to-protect",
    replayLabel: "Watch replay",
    resourcesLabel: "Slides & resources",
  },
  {
    year: 2024,
    title: "The Billion D∅Llar Panel — Nullability in GraphQL",
    event: "GraphQL Conf",
    location: "San Francisco",
    sessionType: "Panel discussion",
    topics: ["GraphQL"],
    subcategory: "GraphQL Spec",
    description: ["Panel discussion on Client Controlled/Semantic Nullability"],
    replay:
      "https://graphql.org/conf/2024/schedule/c12a426b75f4851c04a7e16e54135887/",
    replayLabel: "Watch replay",
  },
  {
    year: 2024,
    title: "You’re Our Universe: GraphQL Community Update 2024",
    event: "GraphQL Conf",
    location: "San Francisco",
    sessionType: "Keynote presentation",
    topics: ["GraphQL"],
    subcategory: "Community",
    description: [
      "The GraphQL ecosystem is vast, composed of tools and libraries in many programming languages, people and organizations from across the globe, and a plethora of maintainers, contributors and developers pulling them together. The primary mission of the GraphQL Foundation is to ensure that the GraphQL community is able to focus on the continued evolution of the specification, the shared contract that competitors and collaborators alike implement to enable maximal interoperability. This talk is to thank YOU, the GraphQL community, and highlight some of the heroes that have arisen to heed this call. Find out about their efforts over the last year improving our shared specifications, implementations, documentation, tooling, tests, and websites; about how you can get involved and help shape GraphQL to fit your organization's needs; about the support we have available; and about other community initiatives you may wish to avail yourself of.",
    ],
    replay:
      "https://graphql.org/conf/2024/schedule/5245297ed1f7b82885c742d77f209bda/",
    replayLabel: "Watch replay",
  },
  {
    year: 2023,
    title: "The Future of Efficiency Is Here: Add Planning to Your Schema!",
    event: "GraphQL Conf",
    location: "San Francisco",
    topics: ["GraphQL", "Gra*fast*"],
    description: [
      "Discover an entirely new approach to GraphQL execution that enables engineers to build next-level efficiency into new or existing GraphQL APIs – improving application performance, reducing operational costs, and delivering delightful user experiences. Learn how, by using a declarative analog to resolvers, your schema can gain a full understanding of the incoming GraphQL request and optimize communications with your business logic, enabling fewer and more efficient operations against your backend services and data sources. A passion project of one of the top contributors to the GraphQL specification, this MIT-licensed open source technology will support JavaScript at launch and, with the help of the community, is hopefully coming to other programming languages soon!",
    ],
    replay: "https://www.youtube.com/watch?v=4ao-zjiOGx8",
    replayLabel: "Watch replay",
  },
  {
    year: 2023,
    title:
      "Navigating the Future: GraphQL’s Expansion, AI Adoption, and Modern Languages - Adapting for Success in 2025 ",
    event: "GraphQL Conf",
    location: "San Francisco",
    sessionType: "Panel discussion",
    topics: ["GraphQL"],
    subcategory: "GraphQL Spec",
    description: [
      "According to Gartner, GraphQL was implemented in just over 10% of enterprises in 2021 and they predict that GraphQL implementations will increase to over 50% of all enterprises by 2025.",
      "The unprecedented surge in GraphQL’s popularity within enterprise ecosystems calls for an urgent introspective analysis and forward-thinking strategies. This panel discussion delves into the foreseeable future, envisioning GraphQL’s evolution by 2025 in response to expanding horizons, AI integration, and the embrace of contemporary programming languages.",
      "As GraphQL cements its position as an indispensable tool in enterprise architectures, the necessity for the project to evolve rapidly without compromising consistency becomes apparent. Our esteemed panelists will shed light on the innovations and adaptations necessary for the GraphQL project to flourish. This includes a discussion on evolving governance models, project sustainability, and community engagement to ensure the GraphQL Foundation remains a steward of progress.",
      "Another focal point is the emergence of AI in API ecosystems. How can GraphQL integrate with AI-driven systems? What challenges and opportunities does AI present for GraphQL APIs? Our experts will discuss the promising avenues where GraphQL and AI can complement each other, and how this synergy could redefine data-fetching paradigms.",
      "Additionally, the panel will tackle the inevitable shift toward modern programming languages. With languages such as Rust, Kotlin, and Swift gaining traction, the GraphQL ecosystem must adapt. We’ll discuss the opportunities these languages present and how GraphQL can harness their strengths to remain a versatile and powerful tool for contemporary development.",
      "The final segment will engage the audience in a thought-provoking dialogue on the GraphQL Foundation’s role in these evolving landscapes. Panelists will offer perspectives on what's next for the GraphQL Foundation from today through 2025.",
    ],
  },
  {
    year: 2023,
    title: "Step aside resolvers: a new approach to GraphQL execution",
    event: "GraphQL Wrocław",
    location: "Wrocław",
    topics: ["GraphQL", "Gra*fast*"],
    description: [
      "Though GraphQL is declarative, resolvers operate field-by-field, layer-by-layer, often resulting in unnecessary work for your business logic even when using techniques such as DataLoader. In this talk, Benjie will introduce his vision for a new general-purpose GraphQL execution strategy whose holistic approach could lead to significant efficiency and scalability gains for all GraphQL APIs.",
    ],
    replay: "https://www.youtube.com/watch?v=30--YIw07pY",
    replayLabel: "Event livestream",
  },
  {
    year: 2022,
    title: "Step aside resolvers: a new approach to GraphQL execution",
    event: "GraphQL Galaxy",
    location: "Online",
    topics: ["GraphQL", "Gra*fast*"],
    description: [
      "Though GraphQL is declarative, resolvers operate field-by-field, layer-by-layer, often resulting in unnecessary work for your business logic even when using techniques such as DataLoader. In this talk, Benjie will introduce his vision for a new general-purpose GraphQL execution strategy whose holistic approach could lead to significant efficiency and scalability gains for all GraphQL APIs.",
    ],
    replay:
      "https://gitnation.com/contents/step-aside-resolvers-a-new-approach-to-graphql-execution",
    replayLabel: "Watch replay",
  },
  {
    year: 2022,
    title: "The Future of Server-side GraphQL",
    event: "GraphQL Galaxy",
    location: "Online",
    sessionType: "Panel discussion",
    topics: ["GraphQL"],
    description: [
      "Panel discussion on the evolution of GraphQL server development, including advanced GraphQL features, education and best practices, schema design, deployment, and alternative execution models. Benjie discussed the early work on Grafast and its approach to replacing resolver-by-resolver execution to address issues such as N+1 queries and caching.",
    ],
    replay:
      "https://gitnation.com/contents/panel-discussion-the-future-of-server-side-graphql",
    replayLabel: "Watch replay",
  },
  {
    year: 2022,
    title:
      "Benjie Gillam on PostGraphile, The GraphQL Foundation, Independence From Facebook, Supporting Open Source, and beyond",
    event: "GraphQL Radio",
    location: "Online",
    sessionType: "Podcast interview",
    topics: ["GraphQL", "PostGraphile"],
    description: [
      "Benjie Gillam is a community-funded open source developer and maintainer of PostGraphile from the UK. He's also a GraphQL Technical Steering Committee member, and a GraphQL trainer and consultant. Tune in to learn about his perspective on all things PostGraphile, GraphQL, working on open source, and the GraphQL Foundation.",
    ],
    replay:
      "https://graphqlradio.com/episodes/postgraphile-and-beyond-w-benjie-gillam-graphql-technical-steering-committee-member",
    replayLabel: "Listen",
  },
  {
    year: 2021,
    title: "What’s Next for the GraphQL Spec?",
    event: "Apollo GraphQL Summit",
    location: "Online",
    topics: ["GraphQL"],
    subcategory: "GraphQL Spec",
    description: [
      "As long-standing community contributors to the GraphQL Specification Working Group, Ivan and Benjie will present highlights of the 2021 GraphQL Specification release and an introduction to some of the exciting new features currently working their way towards becoming part of the GraphQL Specification.",
    ],
    replay: "https://www.youtube.com/watch?v=yA2qHxSiPqM",
    replayLabel: "Watch replay",
  },
  {
    year: 2021,
    title: "GraphQL Working Group Discussion",
    event: "GraphQL Galaxy",
    location: "Online",
    sessionType: "Panel discussion",
    topics: ["GraphQL"],
    description: [
      "GraphQL Working Group Panel Discussion with: Lee Byron, Sasha Solomon, Benjie, Brielle Harrison and Uri Goldshtein",
    ],
    replay:
      "https://gitnation.com/contents/panel-discussion-graphql-working-group",
    replayLabel: "Watch replay",
  },
  {
    year: 2019,
    title: "Increasing Velocity with GraphQL and PostgreSQL",
    event: "Reactive Conf",
    location: "Prague",
    sessionType: "Keynote session",
    topics: ["GraphQL", "PostGraphile"],
    description: [
      "GraphQL has exploded in popularity since its public launch in 2015, and PostgreSQL is still going strong after 20 years of development, gaining market share and impressive features at an ever-increasing rate. These tools can pair beautifully, in particular, because they’re both strongly typed and declarative. In this talk, we’ll learn how combining these two technologies can lead to massively increased software development and delivery speed, faster APIs, fewer bugs, and ultimately enable you to focus on delivering value on the frontend rather than maintaining three different layers of data models and associated logic on the backend (DB, application, API).",
    ],
    replay: "https://www.youtube.com/watch?v=BNLcHlMn5X4",
    replayLabel: "Watch replay",
  },
  {
    year: 2018,
    title: "Database-first GraphQL Development",
    event: "GraphQL Finland",
    location: "Helsinki",
    topics: ["GraphQL", "PostGraphile"],
    description: [
      "Learn how a database-centric approach to GraphQL API development can give your engineers more time to focus on the important parts of your application. Topics covered include authorization, adhering to GraphQL best practices, embracing the power of PostgreSQL, and avoiding common pitfalls.",
    ],
  },
];
