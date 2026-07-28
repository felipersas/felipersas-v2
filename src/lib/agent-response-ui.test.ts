import { describe, expect, it } from "vitest";

import {
  parseAgentResponse,
  stripAgentResponseUi,
} from "./agent-response-ui";

describe("agent response UI metadata", () => {
  it("extracts two contextual suggestions and localized evidence", () => {
    const response = [
      "Felipe construiu sistemas financeiros distribuídos.",
      '<!-- portfolio-ui {"suggestions":["Como o Saga mantém a consistência?","Quais testes validam esse fluxo?"],"evidence":["experience","project:real-time-crash-game","code:real-time-crash-game"]} -->',
    ].join("\n\n");

    expect(parseAgentResponse(response, "pt-BR")).toEqual({
      visibleText: "Felipe construiu sistemas financeiros distribuídos.",
      suggestions: [
        "Como o Saga mantém a consistência?",
        "Quais testes validam esse fluxo?",
      ],
      evidence: [
        {
          external: false,
          href: "/pt-BR#experience",
          key: "experience",
          label: "Ver experiência",
        },
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
    });
  });

  it("keeps only two unique, non-empty suggestions and known evidence", () => {
    const response =
      'Answer\n<!-- portfolio-ui {"suggestions":["First?","First?","Second?","Third?"],"evidence":["unknown","projects","projects"]} -->';

    expect(parseAgentResponse(response, "en")).toMatchObject({
      suggestions: ["First?", "Second?"],
      evidence: [
        {
          href: "/en#projects",
          key: "projects",
          label: "View projects",
        },
      ],
    });
  });

  it("hides incomplete or malformed metadata from the rendered answer", () => {
    expect(stripAgentResponseUi("Visible answer\n<!-- portfolio-ui {")).toBe(
      "Visible answer"
    );

    expect(
      parseAgentResponse(
        "Visible answer\n<!-- portfolio-ui {not-json} -->",
        "en"
      )
    ).toEqual({
      evidence: [],
      suggestions: [],
      visibleText: "Visible answer",
    });
  });

  it("does not render a partial follow-up menu", () => {
    const response =
      'Answer\n<!-- portfolio-ui {"suggestions":["Only one?"],"evidence":[]} -->';

    expect(parseAgentResponse(response, "en").suggestions).toEqual([]);
  });
});
