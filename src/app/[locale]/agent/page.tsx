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
  searchParams: Promise<{ prompt?: string | string[] }>;
}) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const rawPrompt = Array.isArray(searchParams.prompt)
    ? searchParams.prompt[0]
    : searchParams.prompt;
  // The ask dock is a plain GET form, so an empty submit still lands here with
  // `?prompt=`. Normalize that to "no prompt" instead of an empty turn.
  const initialPrompt = rawPrompt?.trim().slice(0, 1_200) || undefined;

  return (
    <main className="h-[100svh] overflow-hidden pt-12">
      <PortfolioAgent
        initialPrompt={initialPrompt}
        locale={locale as Locale}
      />
    </main>
  );
}
