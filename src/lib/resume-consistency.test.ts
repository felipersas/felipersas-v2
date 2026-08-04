import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";
import { parse } from "yaml";

import { DATA, localize } from "@/data/resume";
import type { Locale } from "@/hooks/use-translation";

type CvEntry = Record<string, string>;

type CvFile = {
  cv: {
    name: string;
    email: string;
    website: string;
    sections: Record<string, CvEntry[]>;
  };
};

const LOCALES: ReadonlyArray<{
  certifications: string;
  education: string;
  experience: string;
  file: string;
  locale: Locale;
}> = [
  {
    certifications: "Certificações Profissionais",
    education: "Educação",
    experience: "Experiência",
    file: "felipe-marques-pt.yaml",
    locale: "pt-BR",
  },
  {
    certifications: "Professional Certificates",
    education: "Education",
    experience: "Experience",
    file: "felipe-marques-en.yaml",
    locale: "en",
  },
];

const MONTHS: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Fev: "02",
  Mar: "03",
  Apr: "04",
  Abr: "04",
  May: "05",
  Mai: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Ago: "08",
  Sep: "09",
  Set: "09",
  Oct: "10",
  Out: "10",
  Nov: "11",
  Dec: "12",
  Dez: "12",
};

function readCv(file: string): CvFile {
  return parse(readFileSync(join(process.cwd(), "cv", file), "utf8")) as CvFile;
}

function toIsoMonth(value: string | undefined): string {
  if (!value) return "present";

  const [month, year] = value.split(" ");
  const numeric = MONTHS[month];
  if (!numeric || !year) return value;

  return `${year}-${numeric}`;
}

function normalizeEnd(value: string | undefined, locale: Locale): string {
  if (!value) return "present";

  const present = locale === "pt-BR" ? "Presente" : "Present";
  if (value === present) return "present";

  return toIsoMonth(value);
}

describe.each(LOCALES)(
  "$file stays consistent with src/data/resume.tsx",
  ({ certifications, education, experience, file, locale }) => {
    const cv = readCv(file);

    it("agrees on the identity block", () => {
      expect(cv.cv.name).toBe(DATA.name);
      expect(cv.cv.email).toBe(DATA.contact.email);
      expect(cv.cv.website).toBe(DATA.url);
    });

    it("covers exactly the same employers", () => {
      const inCv = cv.cv.sections[experience].map((entry) => entry.company);
      const inSite = DATA.work.map((job) => job.company);

      expect([...inCv].sort()).toEqual([...inSite].sort());
    });

    it.each(DATA.work.map((job) => job.company))(
      "agrees on title and dates for %s",
      (company) => {
        const entry = cv.cv.sections[experience].find(
          (candidate) => candidate.company === company
        );
        const job = DATA.work.find((candidate) => candidate.company === company);
        const position = job?.positions[0];

        expect(entry).toBeDefined();
        expect(position).toBeDefined();

        expect(entry!.position).toBe(localize(position!.title, locale));
        expect(String(entry!.start_date)).toBe(toIsoMonth(position!.start));
        expect(String(entry!.end_date)).toBe(
          normalizeEnd(position!.end, locale)
        );
      }
    );

    it("agrees on education", () => {
      const inCv = cv.cv.sections[education].map((entry) => ({
        degree: `${entry.degree}, ${entry.area}`,
        end: String(entry.end_date),
        school: entry.institution,
        start: String(entry.start_date),
      }));
      const inSite = DATA.education.map((item) => ({
        degree: localize(item.degree, locale),
        end: normalizeEnd(localize(item.end, locale), locale),
        school: item.school,
        start: toIsoMonth(item.start),
      }));

      expect(inCv).toEqual(inSite);
    });

    it("agrees on certifications, including credential IDs", () => {
      const inCv = cv.cv.sections[certifications].map((entry) => ({
        credentialId: entry.summary.replace("Credential ID: ", ""),
        date: String(entry.date),
        institution: entry.location,
        name: entry.name,
      }));
      const inSite = DATA.certifications.map((item) => ({
        credentialId: item.credentialId,
        date: toIsoMonth(item.date),
        institution: item.institution,
        name: item.name,
      }));

      expect(inCv).toEqual(inSite);
    });
  }
);
