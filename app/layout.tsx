import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/hooks/use-translation";
import { MusicPlayerProvider } from "@/hooks/use-music-player";
import { ProgressBookmarkProvider } from "@/hooks/use-progress-bookmark";
import { defaultPlaylist } from "@/content/music-playlist";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MusicPlayer } from "@/components/music-player/music-player";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { CoffeeCounter, ProgressBookmark, CozyCursor } from "@/components/cozy-elements";
import { PersonStructuredData, WebSiteStructuredData } from "@/components/seo/structured-data";
import { getPersonStructuredData, getWebSiteStructuredData, siteConfig } from "@/lib/seo";
import { WebVitals } from "@/components/analytics/web-vitals";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Don't preload mono font
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Felipe Marques | Desenvolvedor Full Stack",
    template: "%s | Felipe Marques",
  },
  description: siteConfig.description,
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "NestJS",
    "TypeScript",
    "React",
    "Portfolio",
    "Desenvolvedor Web",
    "Web Developer",
    "Frontend",
    "Backend",
    "Node.js",
    "Rust",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    url: siteConfig.url,
    title: "Felipe Marques | Desenvolvedor Full Stack",
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'Felipe Marques - Desenvolvedor Full Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Felipe Marques | Desenvolvedor Full Stack",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

// Structured data - will be updated dynamically based on locale
const personData = getPersonStructuredData('pt-BR')
const webSiteData = getWebSiteStructuredData('pt-BR')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {/* Performance Monitoring */}
        <WebVitals />

        {/* SEO Structured Data */}
        <PersonStructuredData {...personData} />
        <WebSiteStructuredData {...webSiteData} />

        <TranslationProvider initialLocale="pt-BR">
          <ProgressBookmarkProvider>
            <MusicPlayerProvider defaultPlaylist={defaultPlaylist}>
              <ScrollProgress />
              <CozyCursor />
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <MusicPlayer />
              <ProgressBookmark />
              <CoffeeCounter />
            </MusicPlayerProvider>
          </ProgressBookmarkProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
