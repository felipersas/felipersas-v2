import { describe, expect, it } from "vitest";

import { resolveLink } from "./message";

describe("resolveLink", () => {
  it("prefixes internal paths with the active locale", () => {
    expect(resolveLink("/projects/go-transfers", "pt-BR")).toEqual({
      href: "/pt-BR/projects/go-transfers",
      kind: "project",
    });
    expect(resolveLink("/projects/go-transfers", "en")).toEqual({
      href: "/en/projects/go-transfers",
      kind: "project",
    });
  });

  it("treats non-project internal paths as plain links", () => {
    expect(resolveLink("/about", "en")).toEqual({
      href: "/en/about",
      kind: "internal",
    });
  });

  it("keeps http, https and mailto links external", () => {
    expect(resolveLink("https://github.com/felipersas", "en")).toEqual({
      href: "https://github.com/felipersas",
      kind: "external",
    });
    expect(resolveLink("mailto:someone@example.com", "en")).toEqual({
      href: "mailto:someone@example.com",
      kind: "external",
    });
  });

  it("rejects hrefs the agent should never be able to emit", () => {
    expect(resolveLink("javascript:alert(1)", "en")).toEqual({ kind: "unsafe" });
    expect(resolveLink("data:text/html,<script>", "en")).toEqual({
      kind: "unsafe",
    });
    expect(resolveLink(undefined, "en")).toEqual({ kind: "unsafe" });
  });

  it("rejects protocol-relative URLs that masquerade as internal paths", () => {
    expect(resolveLink("//evil.com", "en")).toEqual({ kind: "unsafe" });
  });

  it("does not treat a traversal path as a project link", () => {
    expect(resolveLink("/projects/../../etc", "en")).toEqual({
      href: "/en/projects/../../etc",
      kind: "internal",
    });
  });
});
