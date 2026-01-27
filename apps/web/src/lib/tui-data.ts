import type { TUIData } from "@bsquared/tui";
import config from "../../../../data/config.json";
import resume from "../../../../data/resume.json";
import skills from "../../../../data/skills.json";
import projects from "../../../../data/projects.json";
import links from "../../../../data/links.json";
import { getAllArticles } from "./articles";

/**
 * Load all data needed for the TUI
 * This runs on the server and returns data for client-side TUI
 */
export function loadTUIData(): TUIData {
  const articles = getAllArticles();

  return {
    config: {
      name: config.name,
      title: config.title,
      intro: config.intro,
      bio: config.bio,
    },
    resume: {
      work: resume.work.map((w) => ({
        company: w.company,
        title: w.title,
        start: w.start,
        end: w.end,
        description: w.description,
      })),
      education: resume.education.map((e) => ({
        school: e.school,
        degree: e.degree,
        start: e.start,
        end: e.end,
      })),
    },
    skills: {
      featured: skills.featured,
      categories: skills.categories,
    },
    projects: {
      projects: projects.projects.map((p) => ({
        title: p.title,
        href: p.href,
        dates: p.dates,
        status: p.status as "live" | "development" | "concept",
        description: p.description,
        technologies: p.technologies,
        links: p.links,
      })),
    },
    links: {
      social: links.social,
    },
    articles: articles.map((a) => ({
      slug: a.slug,
      title: a.title,
      description: a.description,
      date: a.date,
    })),
  };
}
