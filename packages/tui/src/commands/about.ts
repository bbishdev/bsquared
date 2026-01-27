import { fmt, responseHeader, formatContent } from "../format";
import type { CommandDefinition } from "../dispatcher";

export interface AboutConfig {
  name: string;
  title: string;
  bio: string;
}

export function createAboutCommand(config: AboutConfig): CommandDefinition {
  return {
    name: "about",
    description: "Learn about Brenden",
    usage: "/about",
    handler: () => {
      // Format bio paragraphs with proper indentation
      const bioLines = config.bio
        .split("\n\n")
        .map((p) => `  ${formatContent(p.trim())}`)
        .join("\n\n");

      const lines = [
        "",
        responseHeader("About", config.name, "cyan"),
        "",
        `  ${fmt.header(config.name)}`,
        `  ${fmt.muted(config.title)}`,
        "",
        bioLines,
        "",
      ];

      return lines.join("\n");
    },
  };
}
