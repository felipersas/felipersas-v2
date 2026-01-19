import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/hooks/use-translation";
import { MusicPlayerProvider } from "@/hooks/use-music-player";
import { defaultPlaylist } from "@/content/music-playlist";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MusicPlayer } from "@/components/music-player/music-player";
import { ScrollProgress } from "@/components/animations/scroll-progress";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Felipe Marques | Full Stack Developer",
  description: "Building cozy digital experiences, one commit at a time. Full Stack Developer specializing in Next.js, NestJS, and TypeScript.",
  keywords: ["Full Stack Developer", "Next.js", "NestJS", "TypeScript", "Portfolio"],
  authors: [{ name: "Felipe Marques" }],
  openGraph: {
    title: "Felipe Marques | Full Stack Developer",
    description: "Building cozy digital experiences, one commit at a time.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <TranslationProvider initialLocale="pt-BR">
          <MusicPlayerProvider defaultPlaylist={defaultPlaylist}>
            <ScrollProgress />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <MusicPlayer />
          </MusicPlayerProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
