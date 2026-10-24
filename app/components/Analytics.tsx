"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type NavigatorWithGpc = Navigator & { globalPrivacyControl?: boolean };

/**
 * Loads GA4 unless the browser sends Global Privacy Control.
 * Google Signals and ads personalization are off for this tag.
 * Event retention (14 months) is a GA4 Admin → Data settings control, not a gtag parameter.
 */
export default function Analytics({ gaId }: { gaId: string }) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const gpc = (navigator as NavigatorWithGpc).globalPrivacyControl === true;
    if (!gpc) setLoad(true);
  }, []);

  if (!load) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('set', 'allow_ad_personalization_signals', false);
          gtag('config', '${gaId}', { allow_google_signals: false, allow_ad_personalization_signals: false });
        `}
      </Script>
    </>
  );
}
