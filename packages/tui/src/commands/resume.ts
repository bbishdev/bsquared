import type { CommandDefinition } from "../dispatcher";
import { fmt, responseHeader, card, divider, formatContent } from "../format";

interface WorkEntry {
  company: string;
  title: string;
  start: string;
  end: string;
  description: string;
}

interface EducationEntry {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface ResumeData {
  work: WorkEntry[];
  education: EducationEntry[];
}

function formatWorkEntry(w: WorkEntry): string {
  return card(
    w.company,
    w.title,
    [formatContent(w.description)],
    fmt.badge(`${w.start} - ${w.end}`, "dim"),
  );
}

function formatEducationEntry(e: EducationEntry): string {
  return card(
    e.school,
    e.degree,
    [],
    fmt.badge(`${e.start} - ${e.end}`, "dim"),
  );
}

export function createResumeCommand(data: ResumeData): CommandDefinition {
  return {
    name: "resume",
    description: "View work experience and education",
    usage: "/resume [work|education]",
    handler: (args: string[]) => {
      const section = args[0]?.toLowerCase();
      const lines: string[] = [];

      // Header
      lines.push("");
      lines.push(
        responseHeader("Resume", "Work experience & education", "cyan"),
      );
      lines.push("");

      if (!section || section === "work") {
        lines.push(`  ${fmt.label("EXPERIENCE")}`);
        lines.push("");
        lines.push(data.work.map(formatWorkEntry).join("\n\n"));
      }

      if (!section) {
        lines.push("");
        lines.push(`  ${divider()}`);
        lines.push("");
      }

      if (!section || section === "education") {
        lines.push(`  ${fmt.label("EDUCATION")}`);
        lines.push("");
        lines.push(data.education.map(formatEducationEntry).join("\n\n"));
      }

      lines.push("");

      if (!section) {
        lines.push(
          `  ${fmt.muted("Tip:")} ${fmt.command("/resume work")} ${fmt.muted("or")} ${fmt.command("/resume education")}`,
        );
        lines.push("");
      }

      return lines.join("\n");
    },
  };
}
