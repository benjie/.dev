import { useConfig } from "nextra-theme-docs";
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
export const Calendly: FC<{ url?: string }> = ({
  url: baseUrl = "https://calendly.com/graphile/one_on_one",
}) => {
  const ref = useRef(null);
  const config = useConfig();
  const [isDarkMode, setIsDarkMode] = useState(undefined);
  useLayoutEffect(() => {
    setIsDarkMode(
      getComputedStyle(document.documentElement).colorScheme === "dark",
    );
  }, []);
  const url =
    baseUrl +
    `?hide_event_type_details=1` +
    (isDarkMode
      ? `&background_color=111111&text_color=ffffff&primary_color=008ae6`
      : `&background_color=ffffff&text_color=000000&primary_color=008ae6`);

  useEffect(() => {
    ref.current.innerHTML = "";
    (window as any).Calendly?.initInlineWidget({
      url,
      parentElement: ref.current,
      prefill: {},
      utm: {},
    });
  }, [url]);
  // ?hide_event_type_details=1&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=ff00d5
  return (
    <>
      <div
        ref={ref}
        style={{
          minWidth: 320,
          maxWidth: 649,
          minHeight: 600,
          height: 600,
          margin: "1rem auto",
        }}
      />
    </>
  );
};
