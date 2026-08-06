import { describe, expect, it } from "vitest";

import {
  groupLinksByCategory,
  parseDelimited,
  rowsToLinks,
  sortLinks,
  sourceFromUrl,
  type ReadingLink,
} from "./reading-links";

const HEADER = "url,title,author,category,note,date,hidden";

function link(overrides: Partial<ReadingLink> = {}): ReadingLink {
  return {
    category: "other",
    source: "example.com",
    title: "Title",
    url: "https://example.com/post",
    ...overrides,
  };
}

describe("parseDelimited", () => {
  it("keeps commas inside quoted fields", () => {
    const rows = parseDelimited('url,title\nhttps://a.com,"Hello, world"');

    expect(rows[1]).toEqual(["https://a.com", "Hello, world"]);
  });

  it("keeps newlines inside quoted fields", () => {
    const rows = parseDelimited(
      'url,title,note\nhttps://a.com,Title,"first line\nsecond line"'
    );

    expect(rows[1][2]).toBe("first line\nsecond line");
  });

  it("unescapes doubled quotes", () => {
    const rows = parseDelimited('url,title\nhttps://a.com,"He said ""hi"""');

    expect(rows[1][1]).toBe('He said "hi"');
  });

  it("handles CRLF line endings", () => {
    const rows = parseDelimited("url,title\r\nhttps://a.com,Title\r\n");

    expect(rows).toEqual([
      ["url", "title"],
      ["https://a.com", "Title"],
    ]);
  });

  it("strips a leading BOM so the header still matches", () => {
    const rows = parseDelimited("﻿url,title\nhttps://a.com,Title");

    expect(rows[0][0]).toBe("url");
  });

  it("drops the blank rows a published sheet trails", () => {
    const rows = parseDelimited("url,title\nhttps://a.com,Title\n,\n,\n");

    expect(rows).toHaveLength(2);
  });

  it("keeps the final row when the file has no trailing newline", () => {
    const rows = parseDelimited("url,title\nhttps://a.com,Title");

    expect(rows[1]).toEqual(["https://a.com", "Title"]);
  });
});

describe("rowsToLinks", () => {
  it("matches the header by name, ignoring order and casing", () => {
    const rows = parseDelimited(
      "Title, URL ,Category\nDeep dive,https://a.com/p,database"
    );

    expect(rowsToLinks(rows)).toEqual([
      {
        category: "database",
        source: "a.com",
        title: "Deep dive",
        url: "https://a.com/p",
      },
    ]);
  });

  it("omits optional fields that are blank", () => {
    const rows = parseDelimited(`${HEADER}\nhttps://a.com,Title,,,,,`);
    const [entry] = rowsToLinks(rows) ?? [];

    expect(entry).not.toHaveProperty("author");
    expect(entry).not.toHaveProperty("note");
    expect(entry).not.toHaveProperty("date");
  });

  it("keeps author, note and date when present", () => {
    const rows = parseDelimited(
      `${HEADER}\nhttps://a.com,Title,Dan,frontend,Worth it,2026-01-15,`
    );

    expect(rowsToLinks(rows)).toEqual([
      {
        author: "Dan",
        category: "frontend",
        date: "2026-01-15",
        note: "Worth it",
        source: "a.com",
        title: "Title",
        url: "https://a.com",
      },
    ]);
  });

  it("rejects rows that are not https", () => {
    const rows = parseDelimited(
      `${HEADER}\nhttp://a.com,Insecure,,,,,\njavascript:alert(1),Hostile,,,,,\nnot a url,Broken,,,,,`
    );

    expect(rowsToLinks(rows)).toEqual([]);
  });

  it("rejects rows without a title", () => {
    const rows = parseDelimited(`${HEADER}\nhttps://a.com, ,,,,,`);

    expect(rowsToLinks(rows)).toEqual([]);
  });

  it("falls back to 'other' for missing or unknown categories", () => {
    const rows = parseDelimited(
      `${HEADER}\nhttps://a.com,One,,quantum-computing,,,\nhttps://b.com,Two,,,,,`
    );

    expect(rowsToLinks(rows)?.map((entry) => entry.category)).toEqual([
      "other",
      "other",
    ]);
  });

  it("drops rows flagged as hidden", () => {
    const rows = parseDelimited(
      `${HEADER}\nhttps://a.com,Visible,,,,,\nhttps://b.com,Hidden,,,,,TRUE\nhttps://c.com,Also hidden,,,,,sim`
    );

    expect(rowsToLinks(rows)?.map((entry) => entry.title)).toEqual(["Visible"]);
  });

  it("ignores a date that is not ISO formatted", () => {
    const rows = parseDelimited(`${HEADER}\nhttps://a.com,Title,,,,15/01/2026,`);

    expect(rowsToLinks(rows)?.[0]).not.toHaveProperty("date");
  });

  it("returns null when the header lacks the required columns", () => {
    expect(rowsToLinks(parseDelimited("name,link\nfoo,bar"))).toBeNull();
    expect(rowsToLinks([])).toBeNull();
  });

  it("returns null for the HTML page an unpublished sheet serves with a 200", () => {
    const html = "<!DOCTYPE html>\n<html><body>Temporarily unavailable</body></html>";

    expect(rowsToLinks(parseDelimited(html))).toBeNull();
  });
});

describe("sortLinks", () => {
  it("puts newest first and undated entries last in sheet order", () => {
    const sorted = sortLinks([
      link({ title: "No date A" }),
      link({ date: "2026-01-01", title: "Older" }),
      link({ title: "No date B" }),
      link({ date: "2026-06-01", title: "Newer" }),
    ]);

    expect(sorted.map((entry) => entry.title)).toEqual([
      "Newer",
      "Older",
      "No date A",
      "No date B",
    ]);
  });
});

describe("groupLinksByCategory", () => {
  it("follows the declared category order and omits empty groups", () => {
    const groups = groupLinksByCategory([
      link({ category: "career" }),
      link({ category: "frontend" }),
      link({ category: "database" }),
    ]);

    expect(groups.map((group) => group.category.slug)).toEqual([
      "frontend",
      "database",
      "career",
    ]);
  });

  it("exposes the bilingual label for each group", () => {
    const [group] = groupLinksByCategory([link({ category: "database" })]);

    expect(group.category.label).toEqual({
      en: "Databases",
      "pt-BR": "Banco de dados",
    });
  });
});

describe("sourceFromUrl", () => {
  it("returns the hostname without www", () => {
    expect(sourceFromUrl("https://www.example.com/a/b")).toBe("example.com");
    expect(sourceFromUrl("https://overreacted.io/post")).toBe("overreacted.io");
  });

  it("returns an empty string for an unparseable URL", () => {
    expect(sourceFromUrl("not a url")).toBe("");
  });
});
