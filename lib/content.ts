import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT = join(process.cwd(), "content");

function read(file: string) {
  return matter(readFileSync(file, "utf-8"));
}

function ls(dir: string) {
  return readdirSync(join(CONTENT, dir))
    .filter((f) => f.endsWith(".md"))
    .map((f) => join(CONTENT, dir, f));
}

function formatYM(s: string): string {
  if (s === "present") return "Present";
  const [y, m] = s.split("-");
  if (!m) return y;
  return new Date(+y, +m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// ── Experience ────────────────────────────────────────────────────────────────

export type Experience = {
  slug: string;
  title: string;
  company: string;
  location: string;
  start: string;
  end: string;
  startLabel: string;
  endLabel: string;
  tech: string[];
  body: string;
};

export function getExperiences(): Experience[] {
  return ls("experience")
    .map((file) => {
      const { data, content } = read(file);
      const slug = file.replace(/\\/g, "/").split("/").pop()!.replace(".md", "");
      return {
        slug,
        title: data.title as string,
        company: data.company as string,
        location: data.location as string,
        start: data.start as string,
        end: (data.end as string) ?? "present",
        startLabel: formatYM(data.start as string),
        endLabel: formatYM((data.end as string) ?? "present"),
        tech: (data.tech as string[]) ?? [],
        body: content.trim(),
      };
    })
    .sort((a, b) => (b.start > a.start ? 1 : -1));
}

// ── Projects ──────────────────────────────────────────────────────────────────

export type Project = {
  slug: string;
  name: string;
  status: string;
  year: number;
  tech: string[];
  github?: string;
  body: string;
};

export function getProjects(): Project[] {
  return ls("projects")
    .map((file) => {
      const { data, content } = read(file);
      const slug = file.replace(/\\/g, "/").split("/").pop()!.replace(".md", "");
      return {
        slug,
        name: (data.name as string) ?? slug,
        status: (data.status as string) ?? "",
        year: (data.year as number) ?? 0,
        tech: (data.tech as string[]) ?? [],
        github: data.github as string | undefined,
        body: content.trim(),
      };
    })
    .sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
}

// ── Skills ────────────────────────────────────────────────────────────────────

export type SkillGroup = {
  slug: string;
  category: string;
  body: string;
};

export function getSkillGroups(): SkillGroup[] {
  return ls("skills").map((file) => {
    const { data, content } = read(file);
    const slug = file.replace(/\\/g, "/").split("/").pop()!.replace(".md", "");
    return {
      slug,
      category: data.category as string,
      body: content.trim(),
    };
  });
}

// ── Profile ───────────────────────────────────────────────────────────────────

export type Profile = {
  name: string;
  title: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  body: string;
};

export function getProfile(): Profile {
  const { data, content } = read(join(CONTENT, "profile.md"));
  return {
    name: data.name as string,
    title: data.title as string,
    location: data.location as string,
    email: data.email as string,
    github: data.github as string,
    linkedin: data.linkedin as string,
    body: content.trim(),
  };
}

// ── Education ─────────────────────────────────────────────────────────────────

export type Education = {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  body: string;
};

export function getEducation(): Education[] {
  return ls("education").map((file) => {
    const { data, content } = read(file);
    return {
      degree: data.degree as string,
      institution: data.institution as string,
      location: data.location as string,
      start: data.start as string,
      end: data.end as string,
      body: content.trim(),
    };
  });
}

// ── Certifications ────────────────────────────────────────────────────────────

export type Certification = {
  name: string;
  issuer: string;
  year: number;
  issued: string;
};

export function getCertifications(): Certification[] {
  return ls("certifications")
    .map((file) => {
      const { data } = read(file);
      return {
        name: data.name as string,
        issuer: data.issuer as string,
        year: data.year as number,
        issued: formatYM(data.issued as string),
      };
    })
    .sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
}
