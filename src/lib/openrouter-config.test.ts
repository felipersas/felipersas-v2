import { describe, expect, it } from "vitest";

import {
  OPENROUTER_APP_NAME,
  OPENROUTER_APP_URL,
  OPENROUTER_DEFAULT_MODEL,
} from "../../agent/openrouter-config";

describe("OpenRouter attribution headers", () => {
  it("uses the OpenRouter Auto Router by default", () => {
    expect(OPENROUTER_DEFAULT_MODEL).toBe("openrouter/auto");
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
