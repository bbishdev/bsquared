# Task 001: Initialize Monorepo Structure

**Estimated Time**: 1 hour  
**Difficulty**: Junior  
**Prerequisites**: Basic knowledge of package managers and project structure

## Overview

This task sets up the foundational monorepo structure for the Bsquared portfolio project. You'll create the directory structure and configure bun workspaces so that multiple apps and packages can share code and dependencies efficiently.

A monorepo allows us to manage multiple related projects (SSH app, Web app, shared TUI package) in a single repository with shared tooling and dependencies.

## Directory Structure to Create

```
/
├── apps/
│   ├── ssh/
│   └── web/
├── packages/
│   └── tui/
├── data/
├── docs/
└── tasks/
```

## Steps

### 1. Create Directory Structure

Create the following directories at the workspace root:

```bash
mkdir -p apps/ssh apps/web packages/tui
```

The `data`, `docs`, and `tasks` directories already exist.

### 2. Create Root `package.json`

Create a `package.json` file at the workspace root with the following content:

```json
{
  "name": "bsquared",
  "version": "0.1.0",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev:ssh": "bun --cwd apps/ssh dev",
    "dev:web": "bun --cwd apps/web dev",
    "build": "bun --filter '*' run build",
    "clean": "rm -rf node_modules apps/*/node_modules packages/*/node_modules"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0"
  }
}
```

**Key points**:

- `workspaces` tells bun to treat `apps/*` and `packages/*` as workspace packages
- Scripts allow you to run commands in specific workspaces
- Shared dev dependencies go here

### 3. Create `apps/ssh/package.json`

```json
{
  "name": "@bsquared/ssh",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "bun run src/index.ts",
    "build": "bun build src/index.ts --outdir dist --target node"
  },
  "dependencies": {
    "@bsquared/tui": "workspace:*"
  }
}
```

**Note**: `workspace:*` means this package depends on the local `@bsquared/tui` package.

### 4. Create `apps/web/package.json`

```json
{
  "name": "@bsquared/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "@bsquared/tui": "workspace:*",
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

### 5. Create `packages/tui/package.json`

```json
{
  "name": "@bsquared/tui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc --noEmit"
  },
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

**Note**: This is a shared package that will be imported by both SSH and Web apps.

### 6. Create `.gitignore`

Create or update `.gitignore` at the workspace root:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/

# Production
dist/

# Misc
.DS_Store
*.log
*.pem

# Environment
.env
.env*.local

# IDE
.vscode/
.idea/
*.swp
*.swo
```

### 7. Create Root `README.md`

Create or update `README.md` at the workspace root:

````markdown
# Bsquared Interactive Portfolio

An interactive terminal-style portfolio accessible via SSH and Web.

## Structure

This is a monorepo managed with bun workspaces:

- `apps/ssh` - SSH server for terminal access
- `apps/web` - Next.js web application
- `packages/tui` - Shared TUI components (opentui)
- `data/` - Static content files
- `docs/` - Project documentation

## Setup

```bash
# Install dependencies
bun install

# Run SSH server
bun run dev:ssh

# Run web app
bun run dev:web
```
````

## Development

Each workspace can be developed independently. Shared code lives in `packages/tui`.

````

### 8. Install Dependencies

Run the following command to install all dependencies:

```bash
bun install
````

This will install dependencies for all workspaces.

## Acceptance Criteria

Before submitting your work, verify:

- [ ] Directory structure exists: `apps/ssh`, `apps/web`, `packages/tui`
- [ ] Root `package.json` exists with workspace configuration
- [ ] `apps/ssh/package.json` exists with correct workspace dependency
- [ ] `apps/web/package.json` exists with correct workspace dependency
- [ ] `packages/tui/package.json` exists
- [ ] `.gitignore` exists with appropriate patterns
- [ ] Root `README.md` exists with project structure documentation
- [ ] `bun install` runs without errors
- [ ] All `package.json` files have valid JSON syntax

## Testing Your Work

1. **Verify workspace setup**:

   ```bash
   bun install
   ```

   Should complete without errors and create `node_modules` in the root.

2. **Check workspace linking**:

   ```bash
   ls -la apps/ssh/node_modules/@bsquared/
   ```

   Should show a symlink to `packages/tui`.

3. **Validate JSON**:
   ```bash
   cat package.json | jq .
   ```
   Should output formatted JSON without errors (repeat for each package.json).

## Tips

- The `workspace:*` protocol tells bun to link to local workspace packages instead of fetching from npm
- Any changes to `packages/tui` will be immediately available to apps that depend on it
- You can add more workspace scripts to the root `package.json` as needed

## Next Steps

Once this task is complete, the next developer will set up the shared TUI package with opentui components.

