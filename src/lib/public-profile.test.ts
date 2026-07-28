import { describe, expect, it } from "vitest";

import {
  getLlmsText,
  getPortfolioJsonLd,
  getPublicProfile,
} from "@/lib/public-profile";

describe("public portfolio surfaces", () => {
  it("returns a JSON-serializable localized profile", () => {
    const profile = getPublicProfile("pt-BR");
    const serialized = JSON.stringify(profile);

    expect(JSON.parse(serialized)).toEqual(profile);
    expect(profile.currentRole.company).toBe("Keeper");
    expect(profile.projects.every((project) => project.url.startsWith("https://"))).toBe(true);
  });

  it("publishes profile, project, and source-code structured data", () => {
    const jsonLd = getPortfolioJsonLd("en");
    const types = jsonLd["@graph"].map((node) => node["@type"]);

    expect(types).toContain("ProfilePage");
    expect(types).toContain("Person");
    expect(types).toContain("Project");
    expect(types).toContain("SoftwareSourceCode");
    expect(JSON.stringify(jsonLd)).toContain("Keeper");
  });

  it("lists canonical machine-readable and project links in llms.txt", () => {
    const text = getLlmsText();

    expect(text).toContain("Structured profile: https://felipersas-dev.vercel.app/profile.json");
    expect(text).toContain("Canonical case study:");
    expect(text).toContain("https://github.com/felipersas/democraft");
  });
});
