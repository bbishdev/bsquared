import { fmt, responseHeader, card } from "../format";
import type { CommandDefinition } from "../dispatcher";

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export function createWritingCommand(articles: Article[]): CommandDefinition {
  return {
    name: "writing",
    description: "View blog posts and articles",
    usage: "/writing",
    handler: () => {
      if (articles.length === 0) {
        return `\n  ${fmt.muted("No articles yet. Check back soon!")}\n`;
      }

      // Sort by date (newest first)
      const sorted = [...articles].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      const formattedArticles = sorted
        .map((article) => {
          const date = new Date(article.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          });
          return card(
            article.title,
            article.description,
            [fmt.link(`bbish.dev/writing/${article.slug}`)],
            fmt.badge(date, "dim"),
          );
        })
        .join("\n\n");

      const lines = [
        "",
        responseHeader("Writing", "Blog posts & articles", "green"),
        "",
        formattedArticles,
        "",
      ];

      return lines.join("\n");
    },
  };
}
