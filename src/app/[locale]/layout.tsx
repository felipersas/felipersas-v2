import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { TranslationProvider, Locale } from "@/hooks/use-translation";
import { Analytics } from "@vercel/analytics/next";
import { Dither } from "@/components/magicui/dither";
import { TuiStatusBar } from "@/components/tui-status-bar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const { locale } = await props.params;
  const isPtBR = locale === "pt-BR";

  const title = isPtBR
    ? `${DATA.name} | Desenvolvedor Full Stack em Sorocaba, SP`
    : `${DATA.name} | Full Stack Developer — Sorocaba, Brazil`;
  const description = isPtBR
    ? DATA.description["pt-BR"]
    : DATA.description["en"];
  const canonicalUrl = `${DATA.url}/${locale}`;

  return {
    metadataBase: new URL(DATA.url),
    title: {
      default: title,
      template: `%s | ${DATA.name}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: DATA.name,
      locale: isPtBR ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "pt-BR": `${DATA.url}/pt-BR`,
        "en": `${DATA.url}/en`,
        "x-default": `${DATA.url}/pt-BR`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children } = props;
  const params = await props.params;
  const locale = params.locale as Locale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: DATA.name,
              jobTitle: "Desenvolvedor Full Stack",
              url: DATA.url,
              sameAs: [
                "https://github.com/felipersas",
                "https://linkedin.com/in/felipe-marques-a748b9299",
              ],
              worksFor: {
                "@type": "Organization",
                name: "MindGroup Consulting",
              },
            }),
          }}
        />
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TranslationProvider key={locale} initialLocale={locale}>
            <TooltipProvider delayDuration={0}>
              <div className="fixed inset-0 z-0 pointer-events-none">
                <Dither
                  waveAmplitude={0.18}
                  waveFrequency={2.2}
                  waveSpeed={0.025}
                  colorNum={4}
                  pixelSize={3}
                  mouseRadius={0.3}
                />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto py-12 pb-28 sm:py-24 px-6 flex flex-col gap-6">
                {children}
              </div>
              <Navbar />
              <TuiStatusBar />
            </TooltipProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
