import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";
import Image from "next/image";

export default {
  logo: (
    <span>
      <Image
        width="36"
        height="36"
        style={{
          display: "inline-block",
          borderRadius: "50%",
          overflow: "hidden",
        }}
        src="/img/avatar.jpg"
        alt="Benjie"
      />{" "}
      benjie.dev
    </span>
  ),
  project: {
    link: "https://github.com/benjie/.dev",
  },
  chat: {
    link: "https://discord.gg/graphile",
  },
  docsRepositoryBase: "https://github.com/benjie/.dev/tree/main",
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – benjie.dev",
      };
    }
  },
  head: () => {
    const { frontMatter } = useConfig();
    const {
      author = "Benjie",
      title = "benjie.dev",
      description = "GraphQL TSC member and community-funded open source developer, Benjie, works in the intersections between GraphQL, Node.js and PostgreSQL and shares with you his learnings.",
      image = "https://github.com/benjie.png",
      keywords,
    } = frontMatter ?? {};
    return (
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        {keywords ? <meta name="keywords" content={keywords} /> : null}
        <meta property="og:site_name" content="benjie.dev" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@benjie" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <script src="https://assets.calendly.com/assets/external/widget.js"></script>
      </>
    );
  },
  footer: {
    text: "Copyright © 2023 Benjie Gillam; all rights reserved.",
  },
};
