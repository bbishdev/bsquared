// Core TUI
export { createTUI } from "./tui";
export type {
  TUIInstance,
  TUIOptions,
  TUIData,
  ConfigData,
  OutputHandler,
  InputHandler,
} from "./types";

// Parser
export { parseInput } from "./parser";
export type { ParsedInput } from "./parser";

// Dispatcher
export { createDispatcher } from "./dispatcher";
export type {
  CommandHandler,
  CommandDefinition,
  Dispatcher,
} from "./dispatcher";

// Formatting utilities
export {
  fmt,
  section,
  alignedList,
  bulletList,
  hr,
  spacer,
  box,
} from "./format";

// Commands (for custom registration)
export {
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

// Command data types
export type { ResumeData } from "./commands/resume";
export type { SkillsData } from "./commands/skills";
export type { ProjectsData, Project, ProjectLink } from "./commands/projects";
export type { LinksData } from "./commands/links";
export type { Article } from "./commands/writing";
