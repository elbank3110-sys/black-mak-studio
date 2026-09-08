import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";

const BASE = "https://black-mak-v4.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: BASE + "/",
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: { en: BASE + "/", ar: BASE + "/" },
    },
  };

  const cases: MetadataRoute.Sitemap = CASES.map((c) => ({
    url: BASE + "/work/" + c.slug,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [home, ...cases];
}
