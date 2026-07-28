import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Felipe Marques — Software Engineer",
    short_name: "Felipe Marques",
    description:
      "Portfolio de Felipe Marques: engenharia full-stack, sistemas distribuídos, developer tools e um agente de IA interativo.",
    start_url: "/pt-BR",
    display: "standalone",
    background_color: "#0d0d0f",
    theme_color: "#0d0d0f",
    orientation: "any",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["portfolio", "software engineering", "technology"],
    lang: "pt-BR",
  };
}
