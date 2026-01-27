import type { Dispatcher } from "./dispatcher";
import type { ResumeData } from "./commands/resume";
import type { SkillsData } from "./commands/skills";
import type { ProjectsData } from "./commands/projects";
import type { LinksData } from "./commands/links";
import type { Article } from "./commands/writing";

/**
 * Callback for handling TUI output
 */
export type OutputHandler = (text: string) => void;

/**
 * Callback for handling user input
 */
export type InputHandler = (input: string) => void;

/**
 * Config data for about/tldr commands
 */
export interface ConfigData {
  name: string;
  title: string;
  intro: string;
  bio: string;
}

/**
 * Data sources for TUI commands
 */
export interface TUIData {
  config?: ConfigData;
  resume?: ResumeData;
  skills?: SkillsData;
  projects?: ProjectsData;
  links?: LinksData;
  articles?: Article[];
}

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
  handleInput: (input: string) => Promise<void>;

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

  /**
   * Get the command dispatcher for registering additional commands
   */
  getDispatcher: () => Dispatcher;
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
   * Data sources for commands
   */
  data?: TUIData;
}
