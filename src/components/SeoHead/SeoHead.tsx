import Head from "next/head";
import React from "react";

type Props = {
  title?: string;
  description?: string;
  isDynamic?: boolean;
  ogImage?: string;
  ogSite?: string;
  isSameTwitterOg?: boolean;
};

function SeoHead({
  title,
  description,

  ogImage,

  ogSite,
}: Props) {
  return (
    <Head>
      <link rel="manifest" href="/meta/manifest.json" />
      <link rel="icon" href="/meta/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/meta/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff"></meta>

      {/* START : DYNAMIC SEO HEAD  */}

      {/* <!-- Primary Meta Tags --> */}
      <meta
        name="title"
        content={title || "KatanaDomains | Naming service on Katana Network"}
      />
      <meta
        name="description"
        content={
          description ||
          "Web3 domains natively built on Katana Network with seamless interoperability."
        }
      />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={ogSite || "#"} />
      <meta
        property="og:title"
        content={title || "KatanaDomains | Naming service on Katana Network"}
      />
      <meta
        property="og:description"
        content={
          description ||
          "Web3 domains natively built on Katana Network with seamless interoperability."
        }
      />
      <meta
        property="og:image"
        content={ogImage || "https://katana-naming-service.vercel.app/meta/katana.jpeg"}
      />

      {/* <!-- Twitter --> */}
      <link rel="icon" href="/meta/favicon.ico" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@dotzetadomains" />
      <meta name="twitter:site" content="@dotzetadomains" />
      <meta property="twitter:url" content={ogSite || "#"} />
      <meta
        property="twitter:title"
        content={title || "KatanaDomains | Naming service on Katana Network"}
      />
      <meta
        property="twitter:description"
        content={
          description ||
          "Web3 domains natively built on Katana Network with seamless interoperability."
        }
      />
      <meta
        property="twitter:image"
        content={ogImage || "https://katana-naming-service.vercel.app/meta/katana.jpeg"}
      />
      <title>{title || "KatanaDomains | Naming service on Katana Network"}</title>
      {/* END : DYNAMIC SEO HEAD  */}
    </Head>
  );
}

export default SeoHead;
