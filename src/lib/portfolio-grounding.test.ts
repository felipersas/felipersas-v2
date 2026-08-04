import { describe, expect, it } from "vitest";

import {
  getPortfolioFacts,
  getPortfolioKnowledgeMarkdown,
} from "@/lib/portfolio-grounding";

describe("portfolio grounding", () => {
  it("builds stable facts from the public portfolio sources", () => {
    const facts = getPortfolioFacts();
    const ids = facts.map((fact) => fact.id);

    expect(ids).toContain("identity:profile");
    expect(ids).toContain("experience:keeper");
    expect(ids).toContain("experience:mindgroup-consulting-e-marketing");
    expect(ids).toContain("experience:fazzleads");
    expect(ids).toContain("project:payflow");
    expect(ids).toContain("contact:public");

    expect(
      facts.find(
        (fact) => fact.id === "experience:mindgroup-consulting-e-marketing"
      )?.text
    ).toContain("95%");
    expect(
      facts.find((fact) => fact.id === "project:real-time-crash-game")?.text
    ).toContain("330");
  });

  it("formats the canonical facts as always-on agent instructions", () => {
    const markdown = getPortfolioKnowledgeMarkdown();

    expect(markdown).toContain("# Canonical portfolio facts");
    expect(markdown).toContain("Conversation history is not evidence");
    expect(markdown).toContain("## Experience");
    expect(markdown).toContain("## Projects");
    expect(markdown).toContain("FazzLeads");
    expect(markdown).toContain("DemoCraft");
  });

  it("keeps internal fact ids out of the prompt", () => {
    const markdown = getPortfolioKnowledgeMarkdown();

    for (const fact of getPortfolioFacts()) {
      expect(markdown).not.toContain(fact.id);
    }

    expect(markdown).not.toMatch(/\[[a-z]+:[a-z0-9-]+\]/);
  });

});
