import { describe, expect, it } from "vitest";

import {
  parseAgentResponse,
  stripAgentResponseUi,
} from "./agent-response-ui";
import { getPortfolioFacts } from "./portfolio-grounding";

describe("agent response grounding metadata", () => {
  it("accepts grounded facts and derives evidence and follow-ups locally", () => {
    const response = [
      "O Real-Time Crash Game possui mais de 330 testes automatizados.",
      '<!-- portfolio-ui {"status":"grounded","factIds":["project:real-time-crash-game"]} -->',
    ].join("\n\n");

    const parsed = parseAgentResponse(response, "pt-BR");

    expect(parsed).toMatchObject({
      visibleText:
        "O Real-Time Crash Game possui mais de 330 testes automatizados.",
      suggestions: [
        "Quais decisões arquiteturais esse projeto tomou?",
        "Onde posso ver as evidências desse projeto?",
      ],
      evidence: [
        {
          external: false,
          href: "/pt-BR#project-real-time-crash-game",
          key: "project:real-time-crash-game",
          label: "Abrir Real-Time Crash Game",
        },
        {
          external: true,
          href: "https://github.com/felipersas/crash-game",
          key: "code:real-time-crash-game",
          label: "Ver código",
        },
      ],
      grounding: {
        factIds: ["project:real-time-crash-game"],
        status: "grounded",
        valid: true,
      },
    });
  });

  it("keeps broad grounded answers natural and concise", () => {
    const answer =
      "Professionally, Felipe has built fintech products at Keeper, internal platforms and financial automation at MindGroup, and AI-powered real-estate workflows at FazzLeads.";
    const response = `${answer} [experience:keeper] [experience:mindgroup-consulting-e-marketing] [experience:fazzleads]\n<!-- portfolio-ui {"status":"grounded","factIds":["experience:keeper","experience:mindgroup-consulting-e-marketing","experience:fazzleads"]} -->`;

    const parsed = parseAgentResponse(response, "en");

    expect(parsed.visibleText).toBe(answer);
    expect(parsed.visibleText.split(/\s+/)).toHaveLength(21);
    expect(parsed.grounding).toMatchObject({
      status: "grounded",
      valid: true,
    });
  });

  it("preserves a detailed overview supported by all relevant facts", () => {
    const answer = [
      "Felipe has built production-grade systems and tools across different industries:",
      "",
      "**Fintech & Business Operations:** He currently works as a Mid-Level Full-Stack Developer at Keeper, a fintech for graduation fundraising. Previously, at MindGroup Consulting, he architected modular monolith systems using NestJS and Next.js, automating financial workflows and optimizing database performance.",
      "",
      "**AI & Real Estate:** As Co-Founder of FazzLeads, he developed an AI-powered real estate agent using GoHighLevel, Mastra AI, and MCP to automate lead qualification.",
      "",
      "**Infrastructure & Tools:** He is building DemoCraft, an open-source toolkit for polished, reproducible product demos. Its workflows are defined in TypeScript, executed in a real browser with Playwright, and rendered deterministically with Remotion. This makes product demos repeatable, reviewable, and version-controlled as applications change.",
    ].join("\n");
    const response = `${answer}
<!-- portfolio-ui {"status":"grounded","factIds":["experience:keeper","experience:mindgroup-consulting-e-marketing","experience:fazzleads","project:democraft"]} -->`;

    const parsed = parseAgentResponse(response, "en");

    expect(answer.split(/\s+/).length).toBeGreaterThan(110);
    expect(parsed.visibleText).toBe(answer);
    expect(parsed.grounding).toMatchObject({
      factIds: [
        "experience:keeper",
        "experience:mindgroup-consulting-e-marketing",
        "experience:fazzleads",
        "project:democraft",
      ],
      status: "grounded",
      valid: true,
    });
  });

  it("accepts natural Portuguese date and typography variations", () => {
    const response = [
      "Felipe Marques é Co-Founder e Software Engineer na FazzLeads, desde Junho de 2024 até o presente.",
      "",
      "Nesta empresa, ele arquitetou backends modulares com DDD e CQRS usando NestJS e implementou observabilidade com Grafana e Prometheus.",
      '<!-- portfolio-ui {"status":"grounded","factIds":["identity:profile","experience:fazzleads"]} -->',
    ].join("\n");
    const typographicHyphen = [
      "Felipe trabalha na Keeper como **Mid‑Level Full‑Stack Developer** em uma fintech para formaturas.",
      '<!-- portfolio-ui {"status":"grounded","factIds":["experience:keeper"]} -->',
    ].join("\n");

    expect(parseAgentResponse(response, "pt-BR").grounding.valid).toBe(true);
    expect(
      parseAgentResponse(typographicHyphen, "pt-BR").grounding.valid
    ).toBe(true);
  });

  it("fails closed for unknown facts and unsupported metrics", () => {
    const unknownFact =
      'Felipe trabalhou na Nubank.\n<!-- portfolio-ui {"status":"grounded","factIds":["experience:nubank"]} -->';
    const inventedMetric =
      'A FazzLeads possui 12.000 usuários ativos.\n<!-- portfolio-ui {"status":"grounded","factIds":["experience:fazzleads"]} -->';

    expect(parseAgentResponse(unknownFact, "pt-BR")).toMatchObject({
      visibleText:
        "Não consigo confirmar essa resposta com as informações documentadas no portfólio.",
      grounding: {
        status: "grounded",
        valid: false,
        reason: "unknown-fact",
      },
      evidence: [],
    });
    expect(parseAgentResponse(inventedMetric, "pt-BR")).toMatchObject({
      grounding: {
        valid: false,
        reason: "unsupported-claim",
      },
    });
  });

  it("allows explicit abstention without fabricated citations", () => {
    const response =
      'O portfólio não informa quantos usuários a FazzLeads possui.\n<!-- portfolio-ui {"status":"insufficient","factIds":[]} -->';

    expect(parseAgentResponse(response, "pt-BR")).toMatchObject({
      visibleText:
        "Não consigo confirmar essa resposta com as informações documentadas no portfólio.",
      grounding: {
        factIds: [],
        status: "insufficient",
        valid: true,
      },
      evidence: [],
    });
  });

  it("never renders model-authored claims, regardless of their status label", () => {
    const mislabeled =
      'Felipe trabalhou na Nubank.\n<!-- portfolio-ui {"status":"conversational","factIds":[]} -->';
    const groundedHallucination =
      'A Keeper usa Kubernetes em produção.\n<!-- portfolio-ui {"status":"grounded","factIds":["experience:keeper"]} -->';

    const conversational = parseAgentResponse(mislabeled, "pt-BR");
    const grounded = parseAgentResponse(groundedHallucination, "pt-BR");

    expect(conversational.visibleText).not.toContain("Nubank");
    expect(conversational.visibleText).toContain("Posso responder");
    expect(grounded.visibleText).not.toContain("Kubernetes");
    expect(grounded.grounding).toMatchObject({
      valid: false,
      reason: "unsupported-claim",
    });
  });

  it("fails closed when metadata is missing or malformed", () => {
    expect(stripAgentResponseUi("Visible answer\n<!-- portfolio-ui {")).toBe(
      "Visible answer"
    );
    const tooManyFacts = [
      ...getPortfolioFacts().map((fact) => fact.id),
      "identity:extra",
    ];

    for (const response of [
      "Visible answer",
      "Visible answer\n<!-- portfolio-ui {not-json} -->",
      'Visible answer\n<!-- portfolio-ui {"status":"insufficient","factIds":["experience:fazzleads"]} -->',
      `Visible answer\n<!-- portfolio-ui ${JSON.stringify({ status: "grounded", factIds: tooManyFacts })} -->`,
      'Visible answer\n<!-- portfolio-ui {"status":"grounded","factIds":["experience:keeper","experience:keeper"]} -->',
    ]) {
      expect(parseAgentResponse(response, "en")).toMatchObject({
        visibleText:
          "I can’t verify that answer against the documented portfolio information.",
        grounding: {
          status: "invalid",
          valid: false,
          reason: "invalid-metadata",
        },
      });
    }
  });
});
