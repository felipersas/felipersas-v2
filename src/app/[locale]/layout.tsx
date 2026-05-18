import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { MusicPlayerProvider } from "@/hooks/use-music-player";
import { MusicPlayer } from "@/components/music-player/music-player";
import { playlist } from "@/data/playlist";
import { TranslationProvider, Locale } from "@/hooks/use-translation";
import { Analytics } from "@vercel/analytics/next";
import { FlickeringGridClient } from "@/components/flickering-grid-client";

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
          "min-h-screen bg-background font-sans antialiased relative",
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
        <ThemeProvider attribute="class" defaultTheme="light">
          <TranslationProvider initialLocale={locale}>
            <MusicPlayerProvider defaultPlaylist={playlist}>
              <TooltipProvider delayDuration={0}>
                <div className="absolute inset-0 top-0 left-0 right-0 h-[100px] overflow-hidden z-0">
                <FlickeringGridClient
                    className="h-full w-full"
                    squareSize={2}
                    gridGap={2}
                    style={{
                      maskImage: "linear-gradient(to bottom, black, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
                    }}
                  />
                </div>
                <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
                  {children}
                </div>
                <Navbar />
                <div className="hidden md:block">
                  <MusicPlayer />
                </div>
              </TooltipProvider>
            </MusicPlayerProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
