import { lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const resumeFiles = ["curriculo.pdf", "resume_en.pdf"];

describe("public resume assets", () => {
  it.each(resumeFiles)("%s is deployable and matches the RenderCV output", (file) => {
    const generatedPath = join(process.cwd(), "output", "pdf", file);
    const publicPath = join(process.cwd(), "public", file);

    expect(lstatSync(publicPath).isSymbolicLink()).toBe(false);
    expect(readFileSync(publicPath)).toEqual(readFileSync(generatedPath));
  });
});
