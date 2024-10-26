import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ChooseTale",
    short_name: "ChooseTale",
    description: "create and share text-based games",
    start_url: "/",
    display: "standalone",
    background_color: "#191919",
    theme_color: "#191919",
    icons: [
      {
        src: "/app-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
