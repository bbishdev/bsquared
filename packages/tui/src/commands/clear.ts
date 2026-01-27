import type { CommandDefinition } from "../dispatcher";

/**
 * Clear command - returns ANSI escape sequence to clear terminal
 */
export const clearCommand: CommandDefinition = {
  name: "clear",
  description: "Clear the terminal screen",
  usage: "/clear",
  handler: () => {
    // \x1b[2J - Clear entire screen
    // \x1b[H  - Move cursor to home position (top-left)
    return "\x1b[2J\x1b[H";
  },
};
