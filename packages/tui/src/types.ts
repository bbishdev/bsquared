/**
 * Callback for handling TUI output
 */
export type OutputHandler = (text: string) => void;

/**
 * Callback for handling user input
 */
export type InputHandler = (input: string) => void;

/**
 * Interface for the TUI instance
 *
 * The TUI is a platform-agnostic text processor. It doesn't render anything -
 * instead it processes input and produces output that the platform (SSH/Web) displays.
 */
export interface TUIInstance {
  /**
   * Process a line of user input.
   * Triggers the input handler and may produce output via the output handler.
   */
  handleInput: (input: string) => void;

  /**
   * Write text to output (goes to registered output handler)
   */
  write: (text: string) => void;

  /**
   * Write a line to output (adds newline)
   */
  writeLine: (text: string) => void;

  /**
   * Register a handler for TUI output
   * The platform (SSH/Web) uses this to receive text to display
   */
  onOutput: (handler: OutputHandler) => void;

  /**
   * Register a handler for processed input
   * Used for custom input processing (commands, AI, etc.)
   */
  onInput: (handler: InputHandler) => void;

  /**
   * Get the welcome message
   */
  getWelcome: () => string;

  /**
   * Get the prompt string
   */
  getPrompt: () => string;
}

/**
 * Options for creating a TUI instance
 */
export interface TUIOptions {
  /**
   * Custom prompt string (default: "> ")
   */
  prompt?: string;

  /**
   * Custom welcome message
   */
  welcome?: string;

  /**
   * Enable echo mode - automatically echo input back (default: true for testing)
   */
  echo?: boolean;
}
