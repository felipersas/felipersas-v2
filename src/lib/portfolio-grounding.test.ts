import { describe, expect, it } from "vitest";

import {
  getPortfolioFacts,
  getPortfolioKnowledgeMarkdown,
  validatePortfolioGrounding,
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

  it("accepts documented metrics when their facts are cited", () => {
    expect(
      validatePortfolioGrounding(
        "At MindGroup, Felipe reduced a query by 95%, from 5s to 240ms.",
        ["experience:mindgroup-consulting-e-marketing"]
      )
    ).toEqual({
      factIds: ["experience:mindgroup-consulting-e-marketing"],
      valid: true,
    });

    expect(
      validatePortfolioGrounding(
        "A consulta caiu 95 %, de 5 s para 240 ms.",
        ["experience:mindgroup-consulting-e-marketing"]
      )
    ).toMatchObject({ valid: true });
  });

  it("rejects unknown facts and unsupported numeric claims", () => {
    expect(
      validatePortfolioGrounding("Felipe worked at Nubank.", [
        "experience:nubank",
      ])
    ).toMatchObject({
      valid: false,
      reason: "unknown-fact",
    });

    expect(
      validatePortfolioGrounding(
        "FazzLeads has 12,000 active users.",
        ["experience:fazzleads"]
      )
    ).toMatchObject({
      valid: false,
      reason: "unsupported-claim",
    });

    expect(
      validatePortfolioGrounding("Felipe has 7 years of Go experience.", [
        "skills:documented",
      ])
    ).toMatchObject({
      valid: false,
      reason: "unsupported-claim",
    });

    expect(
      validatePortfolioGrounding(
        "At MindGroup, the query previously took 5 hours.",
        ["experience:mindgroup-consulting-e-marketing"]
      )
    ).toMatchObject({
      valid: false,
      reason: "unsupported-claim",
    });
  });

  it("rejects technologies borrowed from a different project", () => {
    expect(
      validatePortfolioGrounding(
        "PayFlow uses the Inbox/Outbox pattern for event delivery.",
        ["project:payflow"]
      )
    ).toMatchObject({
      valid: false,
      reason: "unsupported-claim",
    });
  });
});
