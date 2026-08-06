import { AskDock } from "@/components/ask-dock";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { TranslationProvider, Locale } from "@/hooks/use-translation";
import { Analytics } from "@vercel/analytics/next";
import { getPortfolioJsonLd } from "@/lib/public-profile";

const geistSans = Geist({
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

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt-BR" }];
}

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
    manifest: "/manifest.webmanifest",
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
  const jsonLd = getPortfolioJsonLd(locale);

  return (
    <html lang={locale} className={cn(geistSans.variable, geistMono.variable)} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TranslationProvider key={locale} initialLocale={locale}>
            <TooltipProvider delayDuration={0}>
              <SiteHeader />
              {children}
              <AskDock />
            </TooltipProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
