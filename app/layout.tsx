import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Strand & Stone LLC",
  description: "Crafting unique digital experiences. Founded 2013, Santa Monica.",
  metadataBase: new URL("https://strandandstonellc.com"),
  openGraph: {
    title: "Strand & Stone LLC",
    description: "Crafting unique digital experiences.",
    url: "https://strandandstonellc.com",
    siteName: "Strand & Stone LLC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
