import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://black-mak-v4.vercel.app/sitemap.xml",
    host: "https://black-mak-v4.vercel.app",
  };
}
