import { fmt, responseHeader, card, formatContent } from "../format";
import type { CommandDefinition } from "../dispatcher";

export interface ProjectLink {
  type: string;
  href: string;
}

export interface Project {
  title: string;
  href: string;
  dates: string;
  status: "live" | "development" | "concept";
  description: string;
  technologies: string[];
  links: ProjectLink[];
}

export interface ProjectsData {
  projects: Project[];
}

function getStatusBadge(status: Project["status"]): string {
  switch (status) {
    case "live":
      return fmt.badge("LIVE", "green");
    case "development":
      return fmt.badge("DEV", "yellow");
    case "concept":
      return fmt.badge("CONCEPT", "dim");
  }
}

function formatProject(project: Project): string {
  const content: string[] = [formatContent(project.description)];

  if (project.technologies.length > 0) {
    content.push("");
    content.push(
      project.technologies.map((t) => fmt.muted(t)).join(fmt.muted(" · ")),
    );
  }

  return card(
    project.title,
    project.dates,
    content,
    getStatusBadge(project.status),
  );
}

export function createProjectsCommand(data: ProjectsData): CommandDefinition {
  return {
    name: "projects",
    description: "View personal projects",
    usage: "/projects [live|dev|concept]",
    handler: (args: string[]) => {
      const filter = args[0]?.toLowerCase();

      let projects = data.projects;

      if (filter === "live") {
        projects = projects.filter((p) => p.status === "live");
      } else if (filter === "dev" || filter === "development") {
        projects = projects.filter((p) => p.status === "development");
      } else if (filter === "concept") {
        projects = projects.filter((p) => p.status === "concept");
      } else if (filter) {
        return `\n  ${fmt.error("Unknown filter.")} ${fmt.muted("Use:")} live, dev, ${fmt.muted("or")} concept\n`;
      }

      if (projects.length === 0) {
        return `\n  ${fmt.muted("No projects found with that filter.")}\n`;
      }

      const filterLabel = filter ? ` — ${filter}` : "";
      const lines = [
        "",
        responseHeader("Projects", `Personal work${filterLabel}`, "green"),
        "",
        projects.map(formatProject).join("\n\n"),
        "",
      ];

      if (!filter) {
        lines.push(
          `  ${fmt.muted("Tip:")} ${fmt.command("/projects live")} ${fmt.muted("or")} ${fmt.command("/projects dev")}`,
        );
        lines.push("");
      }

      return lines.join("\n");
    },
  };
}
