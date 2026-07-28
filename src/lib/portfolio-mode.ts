import type { Locale } from "@/hooks/use-translation";

export type PortfolioMode = "portfolio" | "agent";

export function getPortfolioMode(pathname: string): PortfolioMode {
  return /\/agent\/?$/.test(pathname) ? "agent" : "portfolio";
}

export function getPortfolioModeHref(
  locale: Locale,
  mode: PortfolioMode
): string {
  return mode === "agent" ? `/${locale}/agent` : `/${locale}`;
}
