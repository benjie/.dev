import React, { FC } from "react";
import Script from "next/script";
export const Calendly: FC<{ url?: string }> = ({
  url = "https://calendly.com/graphile/one_on_one",
}) => (
  <>
    <div
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: 320, height: 1200 }}
    ></div>
    <Script src="https://assets.calendly.com/assets/external/widget.js"></Script>
  </>
);
