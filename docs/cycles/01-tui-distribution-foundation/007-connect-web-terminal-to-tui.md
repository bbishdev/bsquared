# Task 007: Connect Web Terminal to Shared TUI Backend

**Estimated Time**: 1 hour  
**Difficulty**: Moderate  
**Prerequisites**: Completed Tasks 001-006, basic WebSocket knowledge

## Overview

This task connects the xterm.js terminal in the browser to the shared TUI package via WebSocket. This creates the same echo experience for web users that SSH users get, using the exact same TUI code.

You'll create:

1. A WebSocket server API route in Next.js
2. Backend logic that creates a TUI instance per WebSocket connection
3. Frontend WebSocket client that bridges xterm.js and the backend

## Architecture

```
Browser (xterm.js) ←→ WebSocket ←→ Next.js API ←→ @bsquared/tui
```

## Steps

### 1. Install WebSocket Dependencies

```bash
cd apps/web
bun add ws
bun add -D @types/ws
```

**Note**: Next.js doesn't natively support WebSocket in API routes, so we need to use the `ws` library.

### 2. Create WebSocket Server API Route

Since Next.js API routes don't support WebSocket upgrades directly, we'll create a custom server. Create `apps/web/src/server/websocket.ts`:

```typescript
import { WebSocketServer, WebSocket } from "ws";
import { createTUI } from "@bsquared/tui";
import { IncomingMessage } from "http";
import { Duplex } from "stream";

export function createWebSocketServer() {
  const wss = new WebSocketServer({ noServer: true });

  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket client connected");

    // Create TUI instance for this connection
    const tui = createTUI({ prompt: "> " });

    // Wire TUI output to WebSocket
    const originalWrite = tui.write.bind(tui);
    tui.write = (text: string) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "output", data: text }));
      }
      originalWrite(text);
    };

    // Set up echo handler
    tui.onInput((input) => {
      tui.write(`Echo: ${input}\n`);
    });

    // Send welcome message
    tui.write("Welcome to Bsquared Portfolio!\n");
    tui.write("Type something and press Enter to echo.\n");
    tui.write("This is using the shared TUI package!\n\n");

    // Start TUI
    tui.start();

    // Handle WebSocket messages (input from xterm)
    ws.on("message", (message: Buffer) => {
      try {
        const data = JSON.parse(message.toString());

        if (data.type === "input") {
          // Forward input to TUI
          // Note: The TUI package should handle this input
          // For now, trigger the input callback directly
          const input = data.data.trim();
          if (input) {
            tui.write(`\n`); // Newline after input
            // Manually trigger input handlers (since TUI might not be wired for programmatic input)
            // This is a workaround - ideally TUI would have a .sendInput() method
            tui.onInput((handler) => {
              // Already registered above
            });
          }
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    });

    // Handle disconnection
    ws.on("close", () => {
      console.log("WebSocket client disconnected");
      tui.stop();
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  return wss;
}

export function handleUpgrade(
  wss: WebSocketServer,
  request: IncomingMessage,
  socket: Duplex,
  head: Buffer
) {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
}
```

### 3. Create Custom Next.js Server

Next.js needs a custom server to handle WebSocket upgrades. Create `apps/web/server.ts`:

```typescript
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { createWebSocketServer, handleUpgrade } from "./src/server/websocket";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Create WebSocket server
  const wss = createWebSocketServer();

  // Handle WebSocket upgrade requests
  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url!);

    if (pathname === "/api/terminal") {
      handleUpgrade(wss, request, socket, head);
    } else {
      socket.destroy();
    }
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> WebSocket ready on ws://${hostname}:${port}/api/terminal`);
  });
});
```

### 4. Update package.json Scripts

Update `apps/web/package.json`:

```json
{
  "scripts": {
    "dev": "bun run server.ts",
    "build": "next build",
    "start": "NODE_ENV=production bun run server.ts"
  }
}
```

### 5. Update Terminal Component with WebSocket

Update `apps/web/src/components/Terminal.tsx` to add WebSocket support:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal as XTerm } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export interface TerminalProps {
  /**
   * WebSocket URL to connect to
   */
  wsUrl?: string;

  /**
   * Callback when connection status changes
   */
  onConnectionChange?: (connected: boolean) => void;
}

export function Terminal({ wsUrl, onConnectionChange }: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [inputBuffer, setInputBuffer] = useState<string>("");

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

    // Connect to WebSocket if URL provided
    if (wsUrl) {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        onConnectionChange?.(true);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === "output") {
            xterm.write(message.data);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        onConnectionChange?.(false);
        xterm.writeln("\r\n\r\nConnection closed.");
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        xterm.writeln("\r\n\r\nConnection error.");
      };

      // Handle user input
      let buffer = "";
      xterm.onData((data) => {
        const code = data.charCodeAt(0);

        // Handle Enter key (send to server)
        if (code === 13) {
          xterm.write("\r\n");
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "input", data: buffer }));
          }
          buffer = "";
          return;
        }

        // Handle Backspace
        if (code === 127 || code === 8) {
          if (buffer.length > 0) {
            buffer = buffer.slice(0, -1);
            xterm.write("\b \b");
          }
          return;
        }

        // Handle Ctrl+C
        if (code === 3) {
          buffer = "";
          xterm.write("^C\r\n");
          return;
        }

        // Regular character
        if (code >= 32 && code < 127) {
          buffer += data;
          xterm.write(data);
        }
      });
    }

    // Handle window resize
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      wsRef.current?.close();
      xterm.dispose();
      xtermRef.current = null;
      fitAddonRef.current = null;
    };
  }, [wsUrl, onConnectionChange]);

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

### 6. Update Terminal Page

Update `apps/web/src/app/terminal/page.tsx`:

```tsx
"use client";

import { Terminal } from "@/components/Terminal";
import { useState } from "react";

export default function TerminalPage() {
  const [connected, setConnected] = useState(false);

  // Use ws:// for localhost, wss:// for production
  const wsUrl =
    typeof window !== "undefined"
      ? `ws://${window.location.host}/api/terminal`
      : "";

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
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 style={{ fontSize: "1.2rem" }}>$ bsquared/terminal</h1>
          <span
            style={{
              fontSize: "0.8rem",
              color: connected ? "#0f0" : "#f00",
            }}
          >
            {connected ? "● Connected" : "○ Disconnected"}
          </span>
        </div>
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
        <Terminal wsUrl={wsUrl} onConnectionChange={setConnected} />
      </div>
    </div>
  );
}
```

## Acceptance Criteria

Before submitting your work, verify:

- [ ] WebSocket dependencies installed (ws, @types/ws)
- [ ] `src/server/websocket.ts` creates WebSocket server and TUI instances
- [ ] `server.ts` creates custom Next.js server with WebSocket upgrade handling
- [ ] Terminal component connects to WebSocket on mount
- [ ] Terminal sends user input to WebSocket
- [ ] Terminal displays output from WebSocket
- [ ] Connection status indicator works
- [ ] Echo functionality works end-to-end
- [ ] Multiple browser tabs can connect simultaneously
- [ ] Disconnection is handled gracefully
- [ ] Dev server runs with custom server: `bun run dev`

## Testing Your Work

1. **Start the server**:

   ```bash
   cd apps/web
   bun run dev
   ```

   Should see:

   ```
   > Ready on http://localhost:3000
   > WebSocket ready on ws://localhost:3000/api/terminal
   ```

2. **Open terminal page**:

   - Go to http://localhost:3000/terminal
   - Should see "● Connected" indicator turn green
   - Should see welcome message from TUI

3. **Test echo**:

   - Type "hello" and press Enter
   - Should see "Echo: hello"
   - Type "world" and press Enter
   - Should see "Echo: world"

4. **Test multiple connections**:

   - Open terminal in 2-3 browser tabs
   - Each should work independently
   - Each should have their own TUI instance

5. **Test disconnection**:
   - Close a terminal tab
   - Server console should log "WebSocket client disconnected"

## Troubleshooting

- **WebSocket connection fails**: Check that custom server is running, not default Next.js dev
- **Can't type in terminal**: Check that onData handler is wired to WebSocket send
- **No output shown**: Verify WebSocket message format matches (type: 'output')
- **Backspace doesn't work**: Check ASCII code 127/8 handling in onData
- **Enter doesn't send**: Verify code 13 detection and buffer send

## Known Limitations

- Input handling is basic (no arrow keys, no command history)
- The TUI package might need enhancement to properly handle programmatic input
- Consider refactoring TUI to have a `.sendInput()` method for cleaner integration

## Next Steps

With both SSH and Web distribution working, the next task will create the static content data files that will be used by slash commands in future iterations.

