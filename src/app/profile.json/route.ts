import { getPublicProfile } from "@/lib/public-profile";

export function GET() {
  return Response.json(
    {
      generatedAt: new Date().toISOString(),
      profiles: {
        en: getPublicProfile("en"),
        "pt-BR": getPublicProfile("pt-BR"),
      },
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
