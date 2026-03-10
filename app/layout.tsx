import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import JsonLd from "./components/JsonLd";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-RMZGVPXJ69";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

const BASE_URL = "https://strandandstonellc.com";

export const viewport: Viewport = {
  themeColor: "#C9B99A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Strand & Stone LLC — Digital Studio",
    template: "%s | Strand & Stone LLC",
  },
  description:
    "Strand & Stone LLC is a boutique digital studio crafting unique digital experiences. Founded in 2013 in Santa Monica, CA by three friends with a shared vision for the intersection of craft and technology.",
  keywords: [
    "digital studio",
    "digital experiences",
    "web development",
    "interactive design",
    "brand identity",
    "Santa Monica",
    "Strand and Stone",
    "Strand & Stone",
  ],
  authors: [{ name: "Strand & Stone LLC", url: BASE_URL }],
  creator: "Strand & Stone LLC",
  publisher: "Strand & Stone LLC",
  category: "technology",
  classification: "Digital Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Strand & Stone LLC",
    title: "Strand & Stone LLC — Digital Studio",
    description:
      "Boutique digital studio crafting unique digital experiences. Founded 2013, Santa Monica, CA.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Strand & Stone LLC — Digital Studio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strand & Stone LLC — Digital Studio",
    description:
      "Boutique digital studio crafting unique digital experiences. Founded 2013, Santa Monica, CA.",
    images: ["/og-image.png"],
    creator: "@strandandstone",
    site: "@strandandstone",
  },
  alternates: {
    canonical: BASE_URL,
  },
  // Google Search Console: add verification token when available
  // verification: { google: "your-token" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <JsonLd />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
