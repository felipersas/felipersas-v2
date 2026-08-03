import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import {
  OPENROUTER_APP_NAME,
  OPENROUTER_APP_URL,
  OPENROUTER_DEFAULT_MODEL,
} from "../../agent/openrouter-config";

describe("OpenRouter attribution headers", () => {
  it("uses only OpenRouter's zero-cost model router", () => {
    const agentSource = readFileSync(
      resolve(process.cwd(), "agent/agent.ts"),
      "utf8"
    );

    expect(OPENROUTER_DEFAULT_MODEL).toBe("openrouter/free");
    expect(agentSource).not.toMatch(/process\.env\.OPENROUTER_MODEL/);
    expect(agentSource).toMatch(/exclude:\s*true/);
    expect(agentSource).toMatch(/modelContextWindowTokens:\s*200_000/);
  });

  it("keeps an output ceiling that only guards runaways", () => {
    const agentSource = readFileSync(
      resolve(process.cwd(), "agent/agent.ts"),
      "utf8"
    );

    const ceiling = agentSource.match(/maxOutputTokens:\s*([\d_]+)/);
    expect(ceiling).not.toBeNull();
    expect(Number(ceiling![1].replaceAll("_", ""))).toBeGreaterThanOrEqual(
      1_500
    );
  });

  it("uses values accepted by the Node.js Headers implementation", () => {
    expect(
      () =>
        new Headers({
          "HTTP-Referer": OPENROUTER_APP_URL,
          "X-OpenRouter-Title": OPENROUTER_APP_NAME,
        })
    ).not.toThrow();
  });
});
