/**
 * Parsed input result - either a command or a message for the AI
 */
export type ParsedInput =
  | { type: "command"; command: string; args: string[]; raw: string }
  | { type: "message"; raw: string };

/**
 * Parse user input into a command or message
 *
 * Commands start with "/" and are parsed into command name + args
 * Everything else is treated as a message for the AI
 *
 * @example
 * parseInput("/help") → { type: "command", command: "help", args: [], raw: "/help" }
 * parseInput("/skills react") → { type: "command", command: "skills", args: ["react"], raw: "/skills react" }
 * parseInput("tell me about forwheel") → { type: "message", raw: "tell me about forwheel" }
 */
export function parseInput(input: string): ParsedInput {
  const trimmed = input.trim();

  // Commands start with /
  if (trimmed.startsWith("/")) {
    // Split on whitespace, filter out empty strings
    const parts = trimmed.slice(1).split(/\s+/).filter(Boolean);

    // Extract command name (first part) and args (rest)
    const command = parts[0]?.toLowerCase() ?? "";
    const args = parts.slice(1);

    return {
      type: "command",
      command,
      args,
      raw: input,
    };
  }

  // Everything else is a message for the AI
  return {
    type: "message",
    raw: input,
  };
}
