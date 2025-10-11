# Task 003: Add Echo Functionality to Shared TUI

**Estimated Time**: 1 hour  
**Difficulty**: Junior  
**Prerequisites**: Completed Task 002, basic event handling knowledge

## Overview

This task implements the actual echo functionality in the shared TUI package. You'll replace the placeholder console.log implementations with real opentui widgets that:

1. Display a prompt (e.g., `> `)
2. Accept user input
3. Echo the input back to the output pane
4. Handle the input/output flow

This is the core functionality that makes the terminal interactive.

## What You'll Build

You'll integrate opentui widgets into the `createTUI()` function to create a working terminal that echoes user input.

## Steps

### 1. Research OpenTUI Widgets

Review the opentui documentation for:

- How to create an input widget
- How to create a text/output widget
- How to listen for input events (submit, enter key)
- How to write text to an output widget
- How to create a layout with input and output sections

### 2. Update `packages/tui/src/tui.ts`

Replace the placeholder implementation with actual opentui integration. Here's the structure you should follow:

```typescript
import { TUIInstance, TUIOptions } from "./types.js";
// Add opentui imports here based on documentation
// Example: import { App, Input, Box, Text } from 'opentui';

export function createTUI(options: TUIOptions = {}): TUIInstance {
  const prompt = options.prompt || "> ";
  const inputCallbacks: Array<(input: string) => void> = [];

  // Create opentui app instance
  // const app = new App();

  // Create output pane widget
  // const outputBox = new Box({
  //   // Configuration for output area
  // });

  // Create input widget
  // const inputWidget = new Input({
  //   prompt: prompt,
  //   // Other configuration
  // });

  // Set up layout
  // app.setLayout([
  //   outputBox,
  //   inputWidget
  // ]);

  // Handle input events
  // inputWidget.on('submit', (value: string) => {
  //   // Trigger all registered callbacks
  //   inputCallbacks.forEach(callback => callback(value));
  // });

  const instance: TUIInstance = {
    write: (text: string) => {
      // Write to the output widget
      // outputBox.append(text);
      console.log(text); // Keep as fallback until opentui is integrated
    },

    onInput: (callback: (input: string) => void) => {
      inputCallbacks.push(callback);
    },

    start: () => {
      // Start rendering the opentui app
      // app.render();
      console.log("TUI started with prompt:", prompt);
    },

    stop: () => {
      // Stop and cleanup
      // app.destroy();
      console.log("TUI stopped");
    },
  };

  return instance;
}
```

**Note**: The exact API calls depend on how opentui actually works. You'll need to read the opentui documentation and adjust the code accordingly.

### 3. Create a Test File

Create `packages/tui/src/test.ts` to test the echo functionality:

```typescript
import { createTUI } from "./index.js";

// Create TUI instance
const tui = createTUI({ prompt: "> " });

// Set up echo behavior
tui.onInput((input) => {
  tui.write(`Echo: ${input}\n`);
});

// Write welcome message
tui.write("Welcome to Bsquared TUI!\n");
tui.write("Type something and press Enter.\n");
tui.write("Press Ctrl+C to exit.\n\n");

// Start the TUI
tui.start();

// Handle graceful shutdown
process.on("SIGINT", () => {
  tui.stop();
  process.exit(0);
});
```

### 4. Add Test Script to `package.json`

Update `packages/tui/package.json` to add a test script:

```json
{
  "scripts": {
    "build": "tsc --noEmit",
    "test": "bun run src/test.ts"
  }
}
```

### 5. Implement Echo Logic

The key behavior to implement:

1. **User types input** → Input widget captures it
2. **User presses Enter** → 'submit' event fires
3. **Callbacks are triggered** → All registered onInput callbacks execute
4. **Output is written** → Text appears in the output pane

Example flow:

```
[Output Pane]
Welcome to Bsquared TUI!
Echo: hello
Echo: world

> |  <- [Input Widget with prompt]
```

## Acceptance Criteria

Before submitting your work, verify:

- [ ] `packages/tui/src/tui.ts` integrates opentui widgets (Input, Output/Box)
- [ ] Input widget displays the configured prompt
- [ ] Input widget captures user input
- [ ] Submit event triggers registered callbacks
- [ ] `write()` method appends text to output pane
- [ ] `start()` method begins rendering
- [ ] `stop()` method cleans up properly
- [ ] Test file `src/test.ts` exists and demonstrates echo functionality
- [ ] Running `bun run test` shows a working interactive terminal
- [ ] TypeScript compiles without errors

## Testing Your Work

1. **TypeScript check**:

   ```bash
   cd packages/tui
   bun run build
   ```

2. **Run the test**:

   ```bash
   bun run test
   ```

   You should see:

   - Welcome message
   - A prompt (`> `)
   - When you type and press Enter, your input should be echoed back
   - Ctrl+C should exit cleanly

3. **Test the echo**:
   - Type "hello" and press Enter → Should see "Echo: hello"
   - Type "world" and press Enter → Should see "Echo: world"
   - Type "test 123" and press Enter → Should see "Echo: test 123"

## Troubleshooting

- **If opentui is hard to work with**: Consider using a simpler approach with Node.js readline module as a temporary solution, then migrate to opentui later
- **If input doesn't capture**: Check that you're listening to the correct event ('submit', 'enter', or similar)
- **If output doesn't display**: Verify you're appending to the output widget correctly
- **If the prompt doesn't show**: Make sure the input widget is configured with the prompt option

## Alternative Approach (If OpenTUI is Complex)

If opentui proves too complex for this 1-hour task, you can implement a basic version using Node.js built-in modules:

```typescript
import * as readline from "node:readline";

// Use readline for basic input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: prompt,
});
```

This can be refactored to use opentui later while keeping the same interface.

## Next Steps

Once the shared TUI package has working echo functionality, the next task will integrate it into an SSH server.

