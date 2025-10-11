# Task 002: Create Shared TUI Package with OpenTUI

**Estimated Time**: 1 hour  
**Difficulty**: Junior  
**Prerequisites**: Basic TypeScript knowledge, reading library documentation

## Overview

This task creates the shared TUI (Text User Interface) package using opentui. This package will be used by both the SSH server and Web application to provide a consistent terminal experience.

OpenTUI is a library for building terminal user interfaces with widgets like input fields, output panes, and layouts. By centralizing the TUI logic in a shared package, we ensure both access methods (SSH and Web) behave identically.

## What You'll Build

A TypeScript package that exports a `createTUI()` function which:

- Creates an opentui instance
- Sets up an input widget for user input
- Sets up an output pane to display content
- Returns an interface to interact with the TUI

## Steps

### 1. Research OpenTUI

Before starting, read the opentui documentation to understand:

- How to create a basic TUI app
- How to create input and output widgets
- How to handle layout

**OpenTUI GitHub**: https://github.com/imbsky/opentui

Look for examples of basic input/output setups.

### 2. Add OpenTUI Dependency

Navigate to the `packages/tui` directory and add opentui:

```bash
cd packages/tui
bun add opentui
```

### 3. Create TypeScript Configuration

Create `packages/tui/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Create Source Directory

```bash
mkdir -p packages/tui/src
```

### 5. Create Type Definitions

Create `packages/tui/src/types.ts`:

```typescript
/**
 * Interface for the TUI instance returned by createTUI()
 */
export interface TUIInstance {
  /**
   * Writes text to the output pane
   */
  write: (text: string) => void;

  /**
   * Reads input from the user (when they submit)
   */
  onInput: (callback: (input: string) => void) => void;

  /**
   * Starts the TUI (begins rendering)
   */
  start: () => void;

  /**
   * Stops the TUI and cleans up
   */
  stop: () => void;
}

/**
 * Options for creating a TUI instance
 */
export interface TUIOptions {
  prompt?: string;
}
```

### 6. Create Main TUI Module

Create `packages/tui/src/tui.ts`:

```typescript
import { TUIInstance, TUIOptions } from "./types.js";

/**
 * Creates a new TUI instance using opentui
 *
 * This sets up:
 * - An input widget for user commands
 * - An output pane for displaying results
 * - Basic layout and styling
 *
 * @param options - Configuration options
 * @returns A TUI instance with methods to interact with the interface
 */
export function createTUI(options: TUIOptions = {}): TUIInstance {
  const prompt = options.prompt || "> ";
  const inputCallbacks: Array<(input: string) => void> = [];

  // TODO: Initialize opentui here
  // For now, we'll create a placeholder implementation
  // that can be connected to opentui in the next step

  const instance: TUIInstance = {
    write: (text: string) => {
      // TODO: Write to opentui output widget
      console.log(text);
    },

    onInput: (callback: (input: string) => void) => {
      inputCallbacks.push(callback);
    },

    start: () => {
      // TODO: Start opentui rendering
      console.log("TUI started");
    },

    stop: () => {
      // TODO: Stop opentui and cleanup
      console.log("TUI stopped");
    },
  };

  return instance;
}
```

**Note**: The TODO comments indicate where opentui integration will happen. For this task, we're setting up the structure and interface. The actual opentui widgets will be added based on the library's API.

### 7. Create Package Entry Point

Create `packages/tui/src/index.ts`:

```typescript
export { createTUI } from "./tui.js";
export type { TUIInstance, TUIOptions } from "./types.js";
```

### 8. Add Example Usage

Create `packages/tui/README.md`:

````markdown
# @bsquared/tui

Shared TUI package for Bsquared portfolio, built with opentui.

## Usage

```typescript
import { createTUI } from "@bsquared/tui";

// Create a TUI instance
const tui = createTUI({
  prompt: "> ",
});

// Handle user input
tui.onInput((input) => {
  tui.write(`You typed: ${input}`);
});

// Start the TUI
tui.start();
```
````

## API

### `createTUI(options?)`

Creates a new TUI instance.

**Options:**

- `prompt` (string): The prompt to display (default: `'> '`)

**Returns:** `TUIInstance`

### `TUIInstance`

**Methods:**

- `write(text: string)`: Writes text to the output pane
- `onInput(callback: (input: string) => void)`: Registers a callback for user input
- `start()`: Starts the TUI
- `stop()`: Stops the TUI and cleans up

## Development

This package uses opentui for terminal UI rendering. Both the SSH and Web apps depend on this package to ensure a consistent experience.

````

## Acceptance Criteria

Before submitting your work, verify:

- [ ] `packages/tui/package.json` includes opentui dependency
- [ ] `packages/tui/tsconfig.json` exists with proper TypeScript configuration
- [ ] `packages/tui/src/types.ts` exists with `TUIInstance` and `TUIOptions` interfaces
- [ ] `packages/tui/src/tui.ts` exists with `createTUI()` function
- [ ] `packages/tui/src/index.ts` exports the main functions and types
- [ ] `packages/tui/README.md` documents the API
- [ ] TypeScript compiles without errors: `cd packages/tui && bun run build`
- [ ] Package can be imported by other workspaces

## Testing Your Work

1. **Install dependencies**:
   ```bash
   cd packages/tui
   bun install
````

2. **TypeScript check**:

   ```bash
   bun run build
   ```

   Should complete without type errors.

3. **Verify exports**:
   ```bash
   cd ../../
   bun install
   ```
   Then check that apps can see the package:
   ```bash
   ls apps/ssh/node_modules/@bsquared/tui
   ```

## Notes for Implementation

- The TODOs in `tui.ts` mark where opentui-specific code should go
- For now, the implementation uses console.log as a placeholder
- The interface is designed to abstract away opentui details
- Both SSH and Web will use this same interface

## Next Steps

The next task will implement the actual echo functionality by filling in the TODOs and integrating opentui widgets properly.

