import { PortfolioAgent } from "@/components/agent/portfolio-agent";
import type { Locale } from "@/hooks/use-translation";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title:
      locale === "pt-BR"
        ? "Agente do portfólio"
        : "Portfolio agent",
  };
}

export default async function AgentPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  return (
    <main className="h-[100svh] overflow-hidden pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))]">
      <PortfolioAgent locale={locale as Locale} />
    </main>
  );
}
