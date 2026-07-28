import { DATA } from "@/data/resume";
import { featuredProjects } from "@/data/featured-projects";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

export const alt = "Felipe Marques project case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export default async function Image(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  const project = featuredProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  const currentLocale = locale === "pt-BR" ? "pt-BR" : "en";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d0d0f",
          color: "#f5f5f6",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 84px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#a1a1aa",
            display: "flex",
            fontSize: 24,
            justifyContent: "space-between",
          }}
        >
          <span>{DATA.name}</span>
          <span>Case Study</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              color: "#b8b8c0",
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            {project.description[currentLocale]}
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {project.technologies.map((technology) => (
            <span
              key={technology}
              style={{
                border: "1px solid #34343a",
                color: "#d4d4d8",
                fontSize: 20,
                padding: "8px 12px",
              }}
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    ),
    size
  );
}
