import type { Metadata } from "next";
import HomeHero from "./components/HomeHero";

export const metadata: Metadata = {
  title: "Strand & Stone LLC — Digital Studio",
  description:
    "We build digital experiences that don't apologize for being good. Strand & Stone — founded 2013, Santa Monica.",
  alternates: {
    canonical: "https://strandandstonellc.com",
  },
  openGraph: {
    title: "Strand & Stone LLC — Digital Studio",
    description:
      "We build digital experiences that don't apologize for being good. Strand & Stone — founded 2013, Santa Monica.",
    url: "https://strandandstonellc.com",
  },
};

export default function Home() {
  return <HomeHero />;
}
