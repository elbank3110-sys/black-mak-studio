import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BLACK-MAK® — Logo & Visual Identity Design",
    short_name: "BLACK-MAK",
    description:
      "Independent logo and visual identity practice by Muhamed Alaa — Arabic & Latin typography, calligraphy, identity systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#070708",
    theme_color: "#070708",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
