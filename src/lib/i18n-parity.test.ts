import { describe, expect, it } from "vitest";

import en from "@/i18n/locales/en.json";
import ptBR from "@/i18n/locales/pt-BR.json";

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix];

  return Object.entries(value as Record<string, unknown>).flatMap(
    ([key, child]) => flattenKeys(child, prefix ? `${prefix}.${key}` : key)
  );
}

describe("locale bundles", () => {
  it("declare exactly the same keys", () => {
    // getNestedValue in use-translation.tsx returns the key itself on a miss,
    // so a key added to only one bundle ships the raw key to users instead of
    // failing anywhere. This is the only thing that catches it.
    expect(flattenKeys(ptBR).sort()).toEqual(flattenKeys(en).sort());
  });
});
