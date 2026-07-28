import { describe, expect, it } from "vitest";

import { getPortfolioMode, getPortfolioModeHref } from "./portfolio-mode";

describe("portfolio mode routing", () => {
  it("detects agent and portfolio routes", () => {
    expect(getPortfolioMode("/pt-BR/agent")).toBe("agent");
    expect(getPortfolioMode("/en/agent/")).toBe("agent");
    expect(getPortfolioMode("/pt-BR")).toBe("portfolio");
    expect(getPortfolioMode("/en")).toBe("portfolio");
  });

  it("does not mistake nested content for Agent mode", () => {
    expect(getPortfolioMode("/pt-BR/blog/agent-design")).toBe("portfolio");
  });

  it("builds localized mode URLs", () => {
    expect(getPortfolioModeHref("pt-BR", "agent")).toBe("/pt-BR/agent");
    expect(getPortfolioModeHref("en", "portfolio")).toBe("/en");
  });
});
