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
