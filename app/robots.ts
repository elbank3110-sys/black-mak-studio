import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://black-mak.vercel.app/sitemap.xml",
    host: "https://black-mak.vercel.app",
  };
}
