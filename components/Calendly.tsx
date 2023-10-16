import React, { FC, useEffect, useRef } from "react";
export const Calendly: FC<{ url?: string }> = ({
  url = "https://calendly.com/graphile/one_on_one",
}) => {
  const ref = useRef(null);
  useEffect(() => {
    (window.Calendly as any)?.initInlineWidget({
      url,
      parentElement: ref.current,
      prefill: {},
      utm: {},
    });
  }, [url]);
  return (
    <>
      <div
        ref={ref}
        className="calendly-inline-widget"
        // data-url={url}
        style={{ minWidth: 320, height: 1200 }}
      ></div>
    </>
  );
};
