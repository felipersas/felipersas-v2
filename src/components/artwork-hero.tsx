"use client";

import { DitherShader } from "@/components/ui/dither-shader";
import { cn } from "@/lib/utils";
import { useEffect, useState, ViewTransition } from "react";

type ArtworkHeroProps = {
  desktopMaskClassName: string;
  desktopPosition: string;
  mobilePosition: string;
  src: string;
};

function initialPosition(mobile: string, desktop: string): string {
  if (typeof window === "undefined") return desktop;
  return window.matchMedia("(max-width: 639px)").matches ? mobile : desktop;
}

export function ArtworkHero({
  desktopMaskClassName,
  desktopPosition,
  mobilePosition,
  src,
}: ArtworkHeroProps) {
  const [objectPosition, setObjectPosition] = useState(() =>
    initialPosition(mobilePosition, desktopPosition)
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updatePosition = (event: MediaQueryListEvent) => {
      setObjectPosition(event.matches ? mobilePosition : desktopPosition);
    };

    mediaQuery.addEventListener("change", updatePosition);
    return () => mediaQuery.removeEventListener("change", updatePosition);
  }, [desktopPosition, mobilePosition]);

  return (
    <>
      <link
        as="image"
        crossOrigin="anonymous"
        fetchPriority="high"
        href={src}
        rel="preload"
      />

      <ViewTransition name="portfolio-artwork">
        <section
          aria-hidden="true"
          className="relative h-[clamp(7rem,18svh,9.375rem)] w-full shrink-0 overflow-hidden border-x border-t border-line sm:absolute sm:inset-x-0 sm:top-0 sm:h-[clamp(10rem,20svh,12rem)]"
        >
          <DitherShader
            animated={false}
            animationSpeed={0.02}
            className="absolute inset-0 h-full w-full"
            colorMode="grayscale"
            ditherMode="bayer"
            gridSize={4}
            invert={false}
            objectFit="cover"
            objectPosition={objectPosition}
            primaryColor="#08070a"
            secondaryColor="#b0aeb6"
            src={src}
            threshold={0.52}
          />

          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent via-background/40 to-background/90" />
        </section>
      </ViewTransition>

      <ViewTransition name="portfolio-surface">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-1 mx-auto hidden h-[clamp(10rem,20svh,12rem)] bg-background sm:block",
            desktopMaskClassName
          )}
        />
      </ViewTransition>
    </>
  );
}
