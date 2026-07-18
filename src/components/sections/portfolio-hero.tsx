"use client";

import { useEffect, useState } from "react";
import { DitherShader } from "@/components/ui/dither-shader";

const HERO_IMAGE = "/images/kanagawa.jpeg";

function getInitialPosition() {
  if (typeof window === "undefined") return "65% center";
  return window.matchMedia("(max-width: 639px)").matches
    ? "58% center"
    : "65% center";
}

export function PortfolioHero() {
  const [objectPosition, setObjectPosition] = useState(getInitialPosition);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const handler = (e: MediaQueryListEvent) => {
      setObjectPosition(e.matches ? "58% center" : "65% center");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section
      aria-hidden="true"
      className="relative h-[150px] w-full overflow-hidden border-x border-t border-line sm:h-[210px]"
    >k
      <DitherShader
        src={HERO_IMAGE}
        gridSize={4}
        ditherMode="bayer"
        colorMode="grayscale"
        invert={false}
        animated={false}
        animationSpeed={0.02}
        primaryColor="#08070a"
        secondaryColor="#b0aeb6"
        threshold={0.52}
        objectFit="cover"
        objectPosition={objectPosition}
        className="absolute inset-0 h-full w-full"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-background/50 to-black" />
    </section>
  );
}
