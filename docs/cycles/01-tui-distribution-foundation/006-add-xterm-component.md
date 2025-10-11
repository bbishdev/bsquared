# Task 006: Add xterm.js Terminal Component

**Estimated Time**: 1 hour  
**Difficulty**: Junior  
**Prerequisites**: Completed Task 005, basic React knowledge

## Overview

This task adds xterm.js to the Next.js web application to render a terminal interface in the browser. Xterm.js is the same library used by VS Code, providing a full-featured terminal emulator.

You'll create a React component that:

- Renders an xterm.js terminal
- Handles terminal lifecycle (mount/unmount)
- Fits the terminal to the container size
- Accepts basic configuration

The terminal will be displayed on the `/terminal` page, replacing the placeholder.

## What You'll Build

A `<Terminal />` React component that:

- Initializes xterm.js on mount
- Renders the terminal in the browser
- Properly cleans up on unmount
- Responds to container size changes

## Steps

### 1. Install xterm.js Dependencies

```bash
cd apps/web
bun add xterm xterm-addon-fit
bun add -D @types/xterm
```

**Packages**:

- `xterm` - The core terminal library
- `xterm-addon-fit` - Addon to fit terminal to container size

### 2. Import xterm CSS

Next.js requires CSS to be imported. Update `apps/web/src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";
import "xterm/css/xterm.css"; // Add this line

export const metadata: Metadata = {
  title: "Bsquared Portfolio",
  description: "Interactive terminal-style portfolio for Brenden",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 3. Create Terminal Component

Create `apps/web/src/components/Terminal.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export interface TerminalProps {
  /**
   * Callback when user inputs data
   */
  onData?: (data: string) => void;

  /**
   * Initial text to display
   */
  welcome?: string;
}

export function Terminal({ onData, welcome }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Create xterm instance
    const xterm = new XTerm({
      cursorBlink: true,
      fontSize: 14,
      fontFamily: '"Cascadia Code", Menlo, Monaco, "Courier New", monospace',
      theme: {
        background: "#000000",
        foreground: "#00ff00",
        cursor: "#00ff00",
        cursorAccent: "#000000",
        selection: "#00ff0044",
      },
      rows: 30,
      cols: 80,
    });

    // Create and load fit addon
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);

    // Open terminal in the container
    xterm.open(terminalRef.current);

    // Fit terminal to container
    fitAddon.fit();

    // Store refs
    xtermRef.current = xterm;
    fitAddonRef.current = fitAddon;

    // Handle user input
    if (onData) {
      xterm.onData((data) => {
        onData(data);
      });
    }

    // Write welcome message
    if (welcome) {
      xterm.writeln(welcome);
    }

    // Handle window resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      xterm.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, [onData, welcome]);

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
```

**Key points**:

- `'use client'` directive makes this a client component (required for browser APIs)
- `useEffect` initializes xterm on mount and cleans up on unmount
- `FitAddon` automatically sizes the terminal to fit its container
- `onData` callback receives user input (keystrokes)

### 4. Create Terminal Manager Hook (Optional but Recommended)

Create `apps/web/src/hooks/useTerminal.ts`:

```tsx
"use client";

import { useCallback, useRef } from "react";
import { Terminal } from "xterm";

export function useTerminal() {
  const terminalRef = useRef<Terminal | null>(null);

  const write = useCallback((text: string) => {
    terminalRef.current?.write(text);
  }, []);

  const writeln = useCallback((text: string) => {
    terminalRef.current?.writeln(text);
  }, []);

  const clear = useCallback(() => {
    terminalRef.current?.clear();
  }, []);

  const setTerminal = useCallback((terminal: Terminal | null) => {
    terminalRef.current = terminal;
  }, []);

  return {
    write,
    writeln,
    clear,
    setTerminal,
  };
}
```

### 5. Update Terminal Page to Use Component

Update `apps/web/src/app/terminal/page.tsx`:

```tsx
"use client";

import { Terminal } from "@/components/Terminal";
import { useState } from "react";

export default function TerminalPage() {
  const [output, setOutput] = useState<string[]>([]);

  const handleData = (data: string) => {
    // For now, just log the input
    // In the next task, this will connect to the TUI backend
    console.log("User input:", data);

    // Echo the input (basic implementation)
    setOutput((prev) => [...prev, data]);
  };

  const welcome = `Welcome to Bsquared Portfolio!
Type something and press Enter.
(Backend connection coming in next task)

> `;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #0f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "1.2rem" }}>$ bsquared/terminal</h1>
        <a
          href="/"
          style={{
            color: "#0ff",
            fontSize: "0.9rem",
          }}
        >
          ← Back to Home
        </a>
      </div>

      {/* Terminal Container */}
      <div
        style={{
          flex: 1,
          padding: "1rem",
          overflow: "hidden",
        }}
      >
        <Terminal onData={handleData} welcome={welcome} />
      </div>
    </div>
  );
}
```

### 6. Create hooks Directory

```bash
mkdir -p apps/web/src/hooks
```

Then create the `useTerminal.ts` file from step 4 in this directory.

### 7. Update path alias (if needed)

The `@/` alias should already be configured in `tsconfig.json` from Task 005. Verify it's there:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Acceptance Criteria

Before submitting your work, verify:

- [ ] xterm and xterm-addon-fit are installed
- [ ] xterm CSS is imported in layout
- [ ] `Terminal` component exists and renders xterm instance
- [ ] Terminal has proper styling (green text on black background)
- [ ] Terminal fits to container size
- [ ] Terminal resizes when window resizes
- [ ] `onData` callback receives user input
- [ ] Welcome message displays on load
- [ ] Terminal page uses the new Terminal component
- [ ] Component properly cleans up on unmount
- [ ] Dev server runs without errors
- [ ] Terminal renders correctly in browser

## Testing Your Work

1. **Start the dev server**:

   ```bash
   cd apps/web
   bun run dev
   ```

2. **Open terminal page**:

   - Go to http://localhost:3000/terminal
   - Should see a terminal with the welcome message
   - Terminal should have green text on black background

3. **Test input**:

   - Click in the terminal
   - Type some characters
   - Characters should appear in the terminal
   - Check browser console for "User input: ..." logs

4. **Test resizing**:

   - Resize the browser window
   - Terminal should resize to fit
   - Text should remain visible

5. **Test navigation**:
   - Click "← Back to Home"
   - Should go back to home page
   - Go back to /terminal
   - Terminal should initialize fresh

## Terminal Behavior Notes

Currently the terminal will:

- Display characters as you type
- Not have command history (↑/↓ arrows)
- Not have line editing (backspace might show ^?)
- Not have proper newline handling

These are expected! The next task will connect the terminal to the TUI backend which handles all this properly.

## Troubleshooting

- **Terminal doesn't render**: Check browser console for errors, verify xterm CSS is imported
- **Styling is off**: Ensure xterm.css is loaded and theme is configured
- **Can't type**: Click in the terminal area to focus it
- **Terminal too small**: Check that container has explicit height (100vh)
- **Build error "document is not defined"**: Make sure Terminal.tsx has `'use client'` directive

## Optional Enhancements (If Time Permits)

If you finish early, consider adding:

- Copy/paste support (`xterm-addon-webgl` for better performance)
- Fullscreen toggle button
- Terminal theme selector
- Font size controls

## Next Steps

The next task will connect this xterm.js terminal to the shared TUI backend via WebSocket, enabling the same echo functionality that SSH users get.

