// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "benjie.dev",
  tagline:
    "Learnings from GraphQL TSC member and community-funded open source developer, Benjie",
  favicon: "favicon.ico",
  url: "https://benjie.dev",
  baseUrl: "/",
  organizationName: "benjie",
  projectName: ".dev",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en-GB",
    locales: ["en-GB"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          path: "pages",
          sidebarCollapsible: false,
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "rfcs",
        path: "rfcs",
        routeBasePath: "rfcs",
        sidebarPath: "./sidebarsRfcs.js",
        // ... other options
      },
    ],
  ],
  scripts: [
    {
      src: "https://assets.calendly.com/assets/external/widget.js",
      async: false,
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/avatar.jpg",
      navbar: {
        title: "benjie.dev",
        logo: {
          alt: "benjie",
          src: "img/avatar.jpg",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "RFCs",
            docsPluginId: "rfcs",
          },
          {
            to: "book",
            position: "right",
            label: "📞 Book a call",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Benjie Gillam; all rights reserved. RFC pages pull content from public GitHub issues/PRs/files/etc; this content remains owned its various authors.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      metadata: [
        // const {
        //   author = "Benjie",
        //   title = "benjie.dev",
        //   description = "GraphQL TSC member and community-funded open source developer, Benjie, works in the intersections between GraphQL, Node.js and PostgreSQL and shares with you his learnings.",
        //   image = "https://github.com/benjie.png",
        //   keywords,
        // } = frontMatter ?? {};
        // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        //<meta name="robots" content="follow, index" />
        //<meta name="description" content={description} />
        //<meta name="author" content={author} />
        //{keywords ? <meta name="keywords" content={keywords} /> : null}
        //<meta property="og:site_name" content="benjie.dev" />
        //<meta property="og:title" content={title} />
        //<meta property="og:image" content={image} />
        //<meta property="og:description" content={description} />
        //<meta name="twitter:card" content="summary" />
        //<meta name="twitter:site" content="@benjie" />
        //<meta name="twitter:title" content={title} />
        //<meta name="twitter:description" content={description} />
        //<meta name="twitter:image" content={image} />
      ],
    }),
};

export default config;
