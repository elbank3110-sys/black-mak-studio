import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";

const BASE = "https://black-mak.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: BASE + "/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  };

  const cases: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: BASE + "/work/" + c.slug,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  // SEO landing pages — the practice's differentiators meet actual search demand
  const seo: MetadataRoute.Sitemap = [
    { url: BASE + "/arabic-logo-design", priority: 0.9, changeFrequency: "monthly" as const },
    { url: BASE + "/calligraphic-wordmark", priority: 0.9, changeFrequency: "monthly" as const },
    { url: BASE + "/bilingual-brand-identity", priority: 0.9, changeFrequency: "monthly" as const },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  return [home, ...seo, ...cases];
}
