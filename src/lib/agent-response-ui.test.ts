import { describe, expect, it } from "vitest";

import {
  parseAgentResponse,
  stripAgentResponseUi,
} from "./agent-response-ui";

describe("agent response grounding metadata", () => {
  it("accepts grounded facts and derives evidence and follow-ups locally", () => {
    const response = [
      "O Real-Time Crash Game possui mais de 330 testes automatizados.",
      '<!-- portfolio-ui {"status":"grounded","factIds":["project:real-time-crash-game"]} -->',
    ].join("\n\n");

    expect(parseAgentResponse(response, "pt-BR")).toEqual({
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
      'O portfólio não informa quantos usuários a FazzLeads possui.\n<!-- portfolio-ui {"status":"insufficient","factIds":["experience:fazzleads"]} -->';

    expect(parseAgentResponse(response, "pt-BR")).toMatchObject({
      visibleText:
        "O portfólio não informa quantos usuários a FazzLeads possui.",
      grounding: {
        factIds: [],
        status: "insufficient",
        valid: true,
      },
      evidence: [],
    });
  });

  it("fails closed when metadata is missing or malformed", () => {
    expect(stripAgentResponseUi("Visible answer\n<!-- portfolio-ui {")).toBe(
      "Visible answer"
    );

    for (const response of [
      "Visible answer",
      "Visible answer\n<!-- portfolio-ui {not-json} -->",
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
