import { Reading } from "@/components/sections/reading";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/ui/panel";
import { DATA } from "@/data/resume";
import type { Locale } from "@/hooks/use-translation";
import { getReadingLinks } from "@/lib/reading-links";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

type ReadingPageProps = {
  params: Promise<{ locale: string }>;
};

// Mirrors READING_LINKS_REVALIDATE_SECONDS. Kept as a literal because Next
// requires this export to be statically analyzable. The fetch inside
// getReadingLinks already lowers the route's revalidate on its own; this is
// here so the ISR window is visible at the top of the route.
export const revalidate = 600;

// `[locale]` is owned by src/app/[locale]/layout.tsx — no generateStaticParams here.

export async function generateMetadata(
  props: ReadingPageProps
): Promise<Metadata> {
  const { locale } = await props.params;
  const currentLocale = locale === "pt-BR" ? "pt-BR" : "en";
  const isPtBR = currentLocale === "pt-BR";

  const title = isPtBR ? "Leituras" : "Reading";
  const description = isPtBR
    ? "Posts de engenharia que o Felipe leu e recomenda, agrupados por tema."
    : "Engineering posts Felipe has read and recommends, grouped by topic.";
  const url = `${DATA.url}/${currentLocale}/reading`;

  return {
    metadataBase: new URL(DATA.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": `${DATA.url}/pt-BR/reading`,
        en: `${DATA.url}/en/reading`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ReadingPage(props: ReadingPageProps) {
  const { locale: localeParam } = await props.params;
  const locale: Locale = localeParam === "pt-BR" ? "pt-BR" : "en";
  const isPtBR = locale === "pt-BR";

  const { links, ok } = await getReadingLinks();

  return (
    // The wrapper is not decoration: Panel's screen-line utilities draw a 200vw
    // hairline at -z-1, so they need the clipping and the opaque stacking
    // context this pair provides. Same shape as src/app/[locale]/page.tsx.
    <main className="relative max-w-screen overflow-x-clip">
      <div className="relative z-1 mx-auto max-w-2xl bg-background px-6 pt-16 pb-28">
        <div className="py-6">
          <a
            className="link-underline inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            href={`/${locale}`}
          >
            <ArrowLeft className="size-4" aria-hidden />
            {isPtBR ? "Voltar ao portfólio" : "Back to portfolio"}
          </a>

          <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {isPtBR
              ? "Posts que eu li e achei que valiam o tempo de alguém, agrupados por tema. A lista cresce conforme eu encontro coisa boa."
              : "Posts I have read and thought were worth someone's time, grouped by topic. The list grows as I run into good writing."}
          </p>
        </div>

        {links.length > 0 ? (
          <Reading links={links} locale={locale} />
        ) : (
          <Panel id="reading">
            <PanelHeader>
              <PanelTitle>{isPtBR ? "Leituras" : "Reading"}</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ok
                  ? isPtBR
                    ? "Ainda não há nada por aqui. Volte em breve."
                    : "Nothing here yet. Check back soon."
                  : isPtBR
                    ? "Não consegui carregar as leituras agora. Tente de novo em alguns minutos."
                    : "I couldn't load the reading list right now. Try again in a few minutes."}
              </p>
            </PanelContent>
          </Panel>
        )}
      </div>
    </main>
  );
}
