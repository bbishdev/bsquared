import type {
  TUIInstance,
  TUIOptions,
  TUIData,
  OutputHandler,
  InputHandler,
} from "./types";
import { parseInput } from "./parser";
import { createDispatcher } from "./dispatcher";
import { fmt, box } from "./format";
import {
  createHelpCommand,
  clearCommand,
  createAboutCommand,
  createTldrCommand,
  createResumeCommand,
  createSkillsCommand,
  createLinksCommand,
  createProjectsCommand,
  createWritingCommand,
} from "./commands/index";

const DEFAULT_WELCOME = `
${fmt.brand("HARDCORE")}

Type ${fmt.command("/help")} for commands, or just ask me anything.

`;

const DEFAULT_PROMPT = `${fmt.muted(">")} `;

/**
 * Creates a new TUI instance
 *
 * The TUI is platform-agnostic - it processes input and produces output.
 * The platform (SSH server, WebSocket, etc.) handles the actual I/O.
 *
 * @example
 * ```ts
 * const tui = createTUI({
 *   data: { config, resume, skills, projects, links, articles }
 * });
 *
 * // Platform sends output to terminal/xterm
 * tui.onOutput((text) => socket.send(text));
 *
 * // Platform receives input from user
 * socket.on('data', (data) => tui.handleInput(data));
 *
 * // Send welcome message
 * tui.write(tui.getWelcome());
 * tui.write(tui.getPrompt());
 * ```
 */
export function createTUI(options: TUIOptions = {}): TUIInstance {
  const prompt = options.prompt ?? DEFAULT_PROMPT;
  const welcome = options.welcome ?? DEFAULT_WELCOME;
  const data = options.data;

  const outputHandlers: OutputHandler[] = [];
  const inputHandlers: InputHandler[] = [];

  // Create command dispatcher
  const dispatcher = createDispatcher();

  // Register commands if data is provided
  if (data) {
    // Static commands
    dispatcher.register(clearCommand);

    // Data-driven commands
    if (data.config) {
      dispatcher.register(createAboutCommand(data.config));
      dispatcher.register(createTldrCommand(data.config));
    }
    if (data.resume) {
      dispatcher.register(createResumeCommand(data.resume));
    }
    if (data.skills) {
      dispatcher.register(createSkillsCommand(data.skills));
    }
    if (data.projects) {
      dispatcher.register(createProjectsCommand(data.projects));
    }
    if (data.links) {
      dispatcher.register(createLinksCommand(data.links));
    }
    if (data.articles) {
      dispatcher.register(createWritingCommand(data.articles));
    }

    // Help command needs dispatcher reference (register last)
    dispatcher.register(createHelpCommand(dispatcher));
  }

  /**
   * Dispatch text to all registered output handlers
   */
  function dispatchOutput(text: string): void {
    for (const handler of outputHandlers) {
      handler(text);
    }
  }

  /**
   * Dispatch input to all registered input handlers
   */
  function dispatchInput(input: string): void {
    for (const handler of inputHandlers) {
      handler(input);
    }
  }

  /**
   * Handle AI messages (non-command input)
   * For now, just show a placeholder. Will be replaced with actual AI agent.
   */
  function handleMessage(message: string): string {
    // TODO: Integrate with AI agent
    return fmt.muted(
      "AI agent coming soon! For now, try /help to see available commands.",
    );
  }

  const instance: TUIInstance = {
    async handleInput(input: string): Promise<void> {
      const trimmed = input.trim();

      if (!trimmed) {
        dispatchOutput(prompt);
        return;
      }

      // Parse the input
      const parsed = parseInput(trimmed);

      let output: string;

      if (parsed.type === "command") {
        // Execute the command
        output = await dispatcher.execute(parsed.command, parsed.args);
      } else {
        // Handle as AI message
        output = handleMessage(parsed.raw);
      }

      // Send output
      dispatchOutput(output + "\n");

      // Dispatch to input handlers for additional processing
      dispatchInput(trimmed);

      // Show prompt for next input
      dispatchOutput(prompt);
    },

    write(text: string): void {
      dispatchOutput(text);
    },

    writeLine(text: string): void {
      dispatchOutput(text + "\n");
    },

    onOutput(handler: OutputHandler): void {
      outputHandlers.push(handler);
    },

    onInput(handler: InputHandler): void {
      inputHandlers.push(handler);
    },

    getWelcome(): string {
      return welcome;
    },

    getPrompt(): string {
      return prompt;
    },

    getDispatcher() {
      return dispatcher;
    },
  };

  return instance;
}
