import { fmt, responseHeader } from "../format";
import type { CommandDefinition } from "../dispatcher";

interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsData {
  featured: string[];
  categories: SkillCategory[];
}

function formatSkillList(skills: string[], highlight = false): string {
  const sep = fmt.muted(" · ");
  return skills.map((s) => (highlight ? fmt.highlight(s) : s)).join(sep);
}

export function createSkillsCommand(data: SkillsData): CommandDefinition {
  return {
    name: "skills",
    description: "View technical skills",
    usage: "/skills [category]",
    handler: (args: string[]) => {
      const categoryFilter = args[0]?.toLowerCase();
      const lines: string[] = [];

      lines.push("");
      lines.push(responseHeader("Skills", "Technical expertise", "yellow"));
      lines.push("");

      if (categoryFilter) {
        // Find matching category
        const category = data.categories.find((c) =>
          c.name.toLowerCase().includes(categoryFilter),
        );

        if (!category) {
          const available = data.categories.map((c) => c.name).join(", ");
          return `\n  ${fmt.error("Category not found.")} ${fmt.muted("Available:")} ${available}\n`;
        }

        lines.push(`  ${fmt.label(category.name.toUpperCase())}`);
        lines.push("");
        lines.push(`  ${formatSkillList(category.skills, true)}`);
        lines.push("");
      } else {
        // Show featured first
        lines.push(`  ${fmt.label("FEATURED")}`);
        lines.push(`  ${formatSkillList(data.featured, true)}`);
        lines.push("");

        // Show all categories
        for (const category of data.categories) {
          lines.push(`  ${fmt.label(category.name.toUpperCase())}`);
          lines.push(`  ${formatSkillList(category.skills)}`);
          lines.push("");
        }

        lines.push(
          `  ${fmt.muted("Tip:")} ${fmt.command("/skills languages")} ${fmt.muted("or")} ${fmt.command("/skills frameworks")}`,
        );
        lines.push("");
      }

      return lines.join("\n");
    },
  };
}
