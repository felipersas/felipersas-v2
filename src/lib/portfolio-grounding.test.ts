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
    expect(markdown).toContain("[experience:fazzleads]");
    expect(markdown).toContain("[project:democraft]");
    expect(markdown).toContain("Conversation history is not evidence");
  });

});
