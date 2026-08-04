import { describe, expect, it } from "vitest";

import { normalizeQuestion } from "./portfolio-agent";

describe("normalizeQuestion", () => {
  it("treats the same question as equal regardless of case and punctuation", () => {
    expect(normalizeQuestion("O que o Felipe já construiu?")).toBe(
      normalizeQuestion("o que o felipe ja construiu")
    );
  });

  it("ignores accents so a typed question matches a suggested one", () => {
    expect(normalizeQuestion("Quais trade-offs ele assumiu nessas decisões?")).toBe(
      normalizeQuestion("Quais trade offs ele assumiu nessas decisoes")
    );
  });

  it("collapses surrounding and repeated whitespace", () => {
    expect(normalizeQuestion("  Explique   a arquitetura.  ")).toBe(
      "explique a arquitetura"
    );
  });

  it("keeps genuinely different questions distinct", () => {
    expect(normalizeQuestion("Como falo com ele?")).not.toBe(
      normalizeQuestion("Quais tecnologias ele usa?")
    );
  });
});

describe("follow-up filtering", () => {
  const pool = [
    "O que o Felipe já construiu profissionalmente?",
    "Explique a arquitetura do projeto mais forte dele.",
    "Quais vagas mais combinam com a experiência dele?",
    "Quais trade-offs ele assumiu nessas decisões?",
  ];

  function followUps(asked: string[], visible = 3): string[] {
    const seen = new Set(asked.map(normalizeQuestion));
    return pool
      .filter((suggestion) => !seen.has(normalizeQuestion(suggestion)))
      .slice(0, visible);
  }

  it("never offers back the question that was just asked", () => {
    const asked = ["Explique a arquitetura do projeto mais forte dele."];

    expect(followUps(asked)).not.toContain(
      "Explique a arquitetura do projeto mais forte dele."
    );
  });

  it("surfaces deeper questions as earlier ones get used up", () => {
    const asked = [
      "O que o Felipe já construiu profissionalmente?",
      "Explique a arquitetura do projeto mais forte dele.",
    ];

    expect(followUps(asked)).toEqual([
      "Quais vagas mais combinam com a experiência dele?",
      "Quais trade-offs ele assumiu nessas decisões?",
    ]);
  });

  it("returns nothing once every question has been asked", () => {
    expect(followUps(pool)).toEqual([]);
  });
});
