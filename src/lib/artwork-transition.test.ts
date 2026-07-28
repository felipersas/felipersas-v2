import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const projectFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

describe("artwork route transition", () => {
  it("keeps an opaque surface above the artwork while routes change", () => {
    const artwork = projectFile("src/components/artwork-hero.tsx");
    const styles = projectFile("src/app/globals.css");

    expect(artwork).toContain('name="portfolio-surface"');
    expect(styles).toMatch(
      /::view-transition-group\(portfolio-artwork\)[\s\S]*z-index:\s*0/
    );
    expect(styles).toMatch(
      /::view-transition-group\(portfolio-surface\)[\s\S]*z-index:\s*1/
    );
  });

  it("matches the transition surface to each central column", () => {
    expect(projectFile("src/components/agent/agent-artwork.tsx")).toContain(
      'desktopMaskClassName="max-w-3xl"'
    );
    expect(projectFile("src/components/sections/portfolio-hero.tsx")).toContain(
      'desktopMaskClassName="max-w-2xl"'
    );
  });
});
