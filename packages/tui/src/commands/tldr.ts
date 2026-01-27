import { fmt, responseHeader } from "../format";
import type { CommandDefinition } from "../dispatcher";

export interface TldrConfig {
  name: string;
  title: string;
  intro: string;
}

export function createTldrCommand(config: TldrConfig): CommandDefinition {
  return {
    name: "tldr",
    description: "Quick summary of who Brenden is",
    usage: "/tldr",
    handler: () => {
      const lines = [
        "",
        responseHeader("TL;DR", "The short version", "cyan"),
        "",
        `  ${fmt.header(config.name)} ${fmt.muted("·")} ${fmt.muted(config.title)}`,
        "",
        `  ${config.intro}`,
        "",
      ];

      return lines.join("\n");
    },
  };
}
