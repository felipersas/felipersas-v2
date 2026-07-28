import { ArtworkHero } from "@/components/artwork-hero";

export function PortfolioHero() {
  return (
    <ArtworkHero
      desktopMaskClassName="max-w-2xl"
      desktopPosition="65% center"
      mobilePosition="58% center"
      src="/images/kanagawa.jpeg"
    />
  );
}
