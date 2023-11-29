import React from "react";
import Metadata from "@theme-original/DocItem/Metadata";
import Head from "@docusaurus/Head";
import { useTitleFormatter, useDoc } from "@docusaurus/theme-common/internal";

export default function MetadataWrapper(props) {
  const { metadata, frontMatter, assets } = useDoc();
  const { title } = frontMatter;
  const pageTitle = useTitleFormatter(title);

  return (
    <>
      <Head>
        {title && <meta property="twitter:title" content={pageTitle} />}
      </Head>
      <Metadata {...props} />
    </>
  );
}
