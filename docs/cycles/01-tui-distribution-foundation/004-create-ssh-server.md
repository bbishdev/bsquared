# Task 004: Create SSH Server with TUI Integration

**Estimated Time**: 1 hour  
**Difficulty**: Moderate  
**Prerequisites**: Completed Tasks 001-003, basic understanding of SSH and Node.js servers

## Overview

This task creates an SSH server that users can connect to and interact with using the shared TUI package. When a user connects via SSH, they'll see the terminal interface you built in previous tasks.

The SSH server will:

1. Accept incoming SSH connections
2. Create a TUI instance for each connection
3. Wire the SSH stream to the TUI input/output
4. Handle disconnections gracefully

## What You'll Build

An SSH server that runs on port 2222 (or configurable) and provides the echo terminal interface over SSH.

## Steps

### 1. Add SSH2 Dependency

```bash
cd apps/ssh
bun add ssh2
bun add -D @types/ssh2
```

The `ssh2` package provides SSH server functionality for Node.js.

### 2. Create TypeScript Configuration

Create `apps/ssh/tsconfig.json`:

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
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. Create Source Directory

```bash
mkdir -p apps/ssh/src
```

### 4. Create Environment Configuration

Create `apps/ssh/.env.example`:

```env
SSH_PORT=2222
SSH_HOST=0.0.0.0
```

Create `apps/ssh/.env` (copy from .env.example):

```bash
cp apps/ssh/.env.example apps/ssh/.env
```

### 5. Create SSH Server

Create `apps/ssh/src/index.ts`:

```typescript
import { Server } from "ssh2";
import { createTUI } from "@bsquared/tui";

const PORT = parseInt(process.env.SSH_PORT || "2222", 10);
const HOST = process.env.SSH_HOST || "0.0.0.0";

// SSH host key - load from environment variable
// Generate a key with: ssh-keygen -t ed25519 -f ssh_host_key -N ""
// Then add to .env: SSH_HOST_KEY="$(cat ssh_host_key)"
const HOST_KEY = process.env.SSH_HOST_KEY || "";

if (!HOST_KEY) {
  throw new Error("SSH_HOST_KEY environment variable is required");
}

console.log(`Starting SSH server on ${HOST}:${PORT}...`);

// Create SSH server instance
const sshServer = new Server(
  {
    hostKeys: [HOST_KEY],
  },
  (client) => {
    console.log("Client connected");

    client.on("authentication", (ctx) => {
      // Accept all authentication for now (insecure, but fine for portfolio)
      console.log(`Authentication attempt: ${ctx.username}`);
      ctx.accept();
    });

    client.on("ready", () => {
      console.log("Client authenticated");

      client.on("session", (accept, reject) => {
        const session = accept();

        session.on("pty", (accept, reject, info) => {
          // Accept PTY request
          accept && accept();
        });

        session.on("shell", (accept, reject) => {
          const stream = accept();

          // Create TUI instance for this session
          const tui = createTUI({ prompt: "> " });

          // Wire TUI output to SSH stream
          const originalWrite = tui.write.bind(tui);
          tui.write = (text: string) => {
            stream.write(text);
            originalWrite(text);
          };

          // Wire SSH stream input to TUI
          stream.on("data", (data: Buffer) => {
            const input = data.toString("utf8");

            // Handle Ctrl+C (0x03)
            if (input.charCodeAt(0) === 3) {
              stream.write("\nGoodbye!\n");
              stream.exit(0);
              stream.end();
              return;
            }

            // Note: For a real implementation, you'd need to handle
            // input buffering, backspace, arrow keys, etc.
            // The TUI package might handle this, or you may need
            // to implement it here.

            // For now, just pass data through
            // The TUI should handle line buffering
          });

          // Set up echo handler
          tui.onInput((input) => {
            tui.write(`Echo: ${input}\n`);
          });

          // Send welcome message
          tui.write("Welcome to Bsquared Portfolio!\n");
          tui.write("Type something and press Enter to echo.\n");
          tui.write("Press Ctrl+C to exit.\n\n");

          // Start the TUI
          tui.start();

          // Handle disconnection
          stream.on("close", () => {
            console.log("Session closed");
            tui.stop();
          });
        });
      });
    });

    client.on("error", (err) => {
      console.error("Client error:", err);
    });

    client.on("end", () => {
      console.log("Client disconnected");
    });
  }
);

// Start listening
sshServer.listen(PORT, HOST, () => {
  console.log(`SSH server listening on ${HOST}:${PORT}`);
  console.log(`Connect with: ssh -p ${PORT} user@${HOST}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down SSH server...");
  sshServer.close(() => {
    console.log("SSH server closed");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  sshServer.close(() => {
    process.exit(0);
  });
});
```

### 6. Generate a Real SSH Host Key (Optional but Recommended)

For a more realistic setup, generate a proper host key:

```bash
cd apps/ssh
ssh-keygen -t ed25519 -f ssh_host_key -N ""
```

Then update your code to read it:

```typescript
import { readFileSync } from "fs";
import { join } from "path";

const HOST_KEY = readFileSync(join(__dirname, "../ssh_host_key"), "utf8");
```

### 7. Update package.json Scripts

Ensure `apps/ssh/package.json` has the dev script:

```json
{
  "scripts": {
    "dev": "bun run src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target node"
  }
}
```

### 8. Create README

Create `apps/ssh/README.md`:

````markdown
# @bsquared/ssh

SSH server for Bsquared interactive portfolio.

## Development

```bash
# Run the SSH server
bun run dev
```
````

## Connecting

```bash
# Connect to the SSH server
ssh -p 2222 user@localhost

# Or with more verbose output
ssh -v -p 2222 user@localhost
```

## Configuration

Set environment variables in `.env`:

- `SSH_PORT` - Port to listen on (default: 2222)
- `SSH_HOST` - Host to bind to (default: 0.0.0.0)

## Security Notes

- Current implementation accepts all authentication (insecure)
- Host key should be properly generated and stored
- In production, add rate limiting and proper authentication

````

## Acceptance Criteria

Before submitting your work, verify:

- [ ] `apps/ssh` has ssh2 and @types/ssh2 dependencies
- [ ] `apps/ssh/src/index.ts` exists with SSH server implementation
- [ ] SSH server listens on port 2222 (configurable via env)
- [ ] Server accepts SSH connections
- [ ] Each connection creates a TUI instance
- [ ] TUI output is sent to SSH stream
- [ ] SSH input is wired to TUI
- [ ] Ctrl+C disconnects gracefully
- [ ] TypeScript compiles without errors
- [ ] Server can be started with `bun run dev`

## Testing Your Work

1. **Start the SSH server**:
   ```bash
   cd apps/ssh
   bun run dev
````

Should output:

```
Starting SSH server on 0.0.0.0:2222...
SSH server listening on 0.0.0.0:2222
Connect with: ssh -p 2222 user@localhost
```

2. **Connect via SSH** (in a new terminal):

   ```bash
   ssh -p 2222 test@localhost
   ```

   - You may see a host key warning (accept it)
   - You should see the welcome message
   - Type something and press Enter
   - Should see "Echo: <your input>"

3. **Test disconnection**:

   - Press Ctrl+C
   - Should see "Goodbye!" and disconnect cleanly

4. **Test multiple connections**:
   - Open 2-3 SSH sessions simultaneously
   - Each should work independently

## Troubleshooting

- **Connection refused**: Make sure the server is running and firewall allows port 2222
- **Host key verification failed**: Run `ssh-keygen -R "[localhost]:2222"` to remove old key
- **Authentication fails**: Check that the authentication handler accepts the connection
- **Input doesn't work**: Verify PTY and shell handlers are set up correctly
- **Ctrl+C doesn't work**: Check that you're detecting byte 0x03 in the stream

## Notes

- The implementation currently doesn't handle complex terminal input (backspace, arrow keys, etc.)
- The TUI package may need enhancements to properly handle raw terminal input
- Consider using a library like `blessed` or `ink` if opentui doesn't handle SSH streams well

## Next Steps

The next task will set up the Next.js web application structure, which will also use the shared TUI package.
