import type { Dispatcher } from "../dispatcher";
import { fmt, alignedList, responseHeader } from "../format";

export function createHelpCommand(dispatcher: Dispatcher) {
  return {
    name: "help",
    description: "List all available commands",
    usage: "/help",
    handler: () => {
      const commands = dispatcher.getCommands();

      // Build aligned command list with indentation
      const commandItems: Array<[string, string]> = commands.map((cmd) => [
        fmt.command(`/${cmd.name}`),
        fmt.muted(cmd.description),
      ]);

      const lines = [
        "",
        responseHeader("Help", "Available commands", "blue"),
        "",
        alignedList(commandItems, 16),
        "",
        `  ${fmt.muted("─")}`,
        "",
        `  ${fmt.muted("You can also just")} ${fmt.highlight("ask me anything")} ${fmt.muted("in plain English.")}`,
        "",
      ];

      return lines.join("\n");
    },
  };
}
