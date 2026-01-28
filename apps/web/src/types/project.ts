export type ProjectStatus = "live" | "development" | "concept";

export interface ProjectLinkItem {
  type: string;
  href: string;
}

export interface ProjectItem {
  title: string;
  href?: string;
  description: string;
  dates: string;
  status: ProjectStatus;
  technologies: readonly string[];
  image?: string;
  video?: string;
  links?: readonly ProjectLinkItem[];
}

export const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  live: {
    label: "Live",
    className:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  development: {
    label: "In Development",
    className:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  concept: {
    label: "Concept",
    className: "bg-muted text-muted-foreground",
  },
};
