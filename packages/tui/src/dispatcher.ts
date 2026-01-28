/**
 * Command handler function type
 */
export type CommandHandler = (args: string[]) => string | Promise<string>;

/**
 * Definition for a registered command
 */
export interface CommandDefinition {
  name: string;
  description: string;
  usage: string;
  handler: CommandHandler;
}

const COMMAND_NAME_PATTERN = /^[a-z0-9-]+$/;
const MAX_COMMAND_LENGTH = 32;

function isValidCommandName(command: string): boolean {
  return (
    command.length > 0 &&
    command.length <= MAX_COMMAND_LENGTH &&
    COMMAND_NAME_PATTERN.test(command)
  );
}

/**
 * Command dispatcher interface
 */
export interface Dispatcher {
  /**
   * Register a command with the dispatcher
   */
  register(command: CommandDefinition): void;

  /**
   * Execute a command by name with arguments
   */
  execute(command: string, args: string[]): Promise<string>;

  /**
   * Get all registered commands
   */
  getCommands(): CommandDefinition[];

  /**
   * Check if a command is registered
   */
  hasCommand(name: string): boolean;
}

/**
 * Create a new command dispatcher instance
 */
export function createDispatcher(): Dispatcher {
  const commands = new Map<string, CommandDefinition>();

  return {
    register(cmd) {
      commands.set(cmd.name, cmd);
    },

    async execute(command, args) {
      if (!isValidCommandName(command)) {
        return "Invalid command. Type /help for available commands.";
      }
      const cmd = commands.get(command);
      if (!cmd) {
        return `Unknown command: /${command}. Type /help for available commands.`;
      }
      return cmd.handler(args);
    },

    getCommands() {
      return Array.from(commands.values());
    },

    hasCommand(name) {
      return commands.has(name);
    },
  };
}
