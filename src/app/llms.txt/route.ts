import { getLlmsText } from "@/lib/public-profile";

export function GET() {
  return new Response(getLlmsText("en"), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
