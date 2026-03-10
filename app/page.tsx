import type { Metadata } from "next";
import HomeHero from "./components/HomeHero";

export const metadata: Metadata = {
  title: "Strand & Stone LLC — Digital Studio",
  description:
    "Strand & Stone LLC is a boutique digital studio crafting unique digital experiences. Founded in 2013 in Santa Monica, CA.",
  alternates: {
    canonical: "https://strandandstonellc.com",
  },
  openGraph: {
    title: "Strand & Stone LLC — Digital Studio",
    description:
      "Boutique digital studio crafting unique digital experiences. Founded 2013, Santa Monica, CA.",
    url: "https://strandandstonellc.com",
  },
};

export default function Home() {
  return <HomeHero />;
}
