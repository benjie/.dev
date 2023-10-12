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
    link: "https://github.com/benjie/benjie.dev",
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – benjie.dev",
      };
    }
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const title = frontMatter?.title ?? "benjie.dev";
    const description =
      frontMatter?.description ??
      "GraphQL TSC member and community-funded open source developer, Benjie, works in the intersections between GraphQL, Node.js and PostgreSQL and shares with you his learnings.";
    const url =
      "https://my-app.com" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);
    const image = frontMatter?.image ?? "https://github.com/benjie.png";
    return (
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={description} />
        <meta property="og:site_name" content="benjie.dev" />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@benjie" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </>
    );
  },
  footer: {
    text: "Copyright © 2023 Benjie Gillam; all rights reserved.",
  },
};
