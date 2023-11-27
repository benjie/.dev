// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "benjie.dev",
  tagline:
    "Learnings from GraphQL TSC member and community-funded open source developer, Benjie",
  favicon: "img/favicon.ico",
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
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
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
            to: "book",
            position: "right",
            label: "📞 Book a call",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Benjie Gillam; all rights reserved`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
