import type { TUIInstance, TUIOptions, OutputHandler, InputHandler } from "./types.js";

const DEFAULT_WELCOME = `
╔══════════════════════════════════════════════════════════════╗
║                    BSQUARED TERMINAL                         ║
║                                                              ║
║  Type /help for available commands                           ║
║  Or just ask me anything about Brenden                       ║
╚══════════════════════════════════════════════════════════════╝
`;

const DEFAULT_PROMPT = "> ";

/**
 * Creates a new TUI instance
 *
 * The TUI is platform-agnostic - it processes input and produces output.
 * The platform (SSH server, WebSocket, etc.) handles the actual I/O.
 *
 * @example
 * ```ts
 * const tui = createTUI({ echo: true });
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
  const echoEnabled = options.echo ?? true;

  const outputHandlers: OutputHandler[] = [];
  const inputHandlers: InputHandler[] = [];

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

  const instance: TUIInstance = {
    handleInput(input: string): void {
      const trimmed = input.trim();

      // Echo the input back if echo mode is enabled
      if (echoEnabled && trimmed) {
        dispatchOutput(`Echo: ${trimmed}\n`);
      }

      // Dispatch to input handlers for further processing
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
  };

  return instance;
}
