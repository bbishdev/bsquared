import { fmt, alignedList, responseHeader } from "../format";
import type { CommandDefinition } from "../dispatcher";

interface SocialLink {
  name: string;
  url: string;
}

export interface LinksData {
  social: SocialLink[];
}

export function createLinksCommand(data: LinksData): CommandDefinition {
  return {
    name: "links",
    description: "Get social links and contact info",
    usage: "/links",
    handler: () => {
      const items: Array<[string, string]> = data.social.map((link) => [
        fmt.value(link.name),
        fmt.link(link.url),
      ]);

      const lines = [
        "",
        responseHeader("Links", "Connect with me", "blue"),
        "",
        alignedList(items, 14),
        "",
      ];

      return lines.join("\n");
    },
  };
}
