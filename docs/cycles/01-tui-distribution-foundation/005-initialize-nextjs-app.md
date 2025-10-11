# Task 005: Initialize Next.js App Structure

**Estimated Time**: 1 hour  
**Difficulty**: Junior  
**Prerequisites**: Completed Tasks 001-003, basic Next.js knowledge

## Overview

This task sets up the Next.js web application that will provide browser-based access to the Bsquared portfolio terminal. You'll create the basic Next.js structure with:

- App router configuration
- Home page with project description
- Terminal page route (empty for now)
- Basic styling

The web app will eventually use xterm.js to render the same TUI experience that SSH users get, but in a browser.

## What You'll Build

A Next.js 14+ application with:

- `/` - Home/landing page
- `/terminal` - Terminal interface page (placeholder)
- Basic layout and styling
- TypeScript configuration

## Steps

### 1. Verify Next.js Dependencies

Check that `apps/web/package.json` has Next.js dependencies (should be there from Task 001):

```json
{
  "dependencies": {
    "@bsquared/tui": "workspace:*",
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0"
  }
}
```

If not, add them:

```bash
cd apps/web
bun add next react react-dom
bun add -D @types/react @types/react-dom typescript
```

### 2. Create TypeScript Configuration

Create `apps/web/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. Create Next.js Configuration

Create `apps/web/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@bsquared/tui"],
};

module.exports = nextConfig;
```

**Note**: `transpilePackages` ensures our workspace package is properly compiled.

### 4. Create App Directory Structure

```bash
cd apps/web
mkdir -p src/app/terminal
mkdir -p src/components
mkdir -p public
```

### 5. Create Root Layout

Create `apps/web/src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

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

### 6. Create Global Styles

Create `apps/web/src/app/globals.css`:

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  font-family: "Courier New", Courier, monospace;
  background-color: #000;
  color: #0f0;
}

a {
  color: #0ff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.terminal-link {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem 2rem;
  border: 2px solid #0f0;
  background-color: #000;
  color: #0f0;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
}

.terminal-link:hover {
  background-color: #0f0;
  color: #000;
  text-decoration: none;
}
```

### 7. Create Home Page

Create `apps/web/src/app/page.tsx`:

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <main style={{ textAlign: "center", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>$ bsquared</h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
            lineHeight: "1.8",
          }}
        >
          Interactive terminal-style portfolio.
          <br />
          Explore skills, projects, and experience through a command-line
          interface.
        </p>

        <div style={{ marginBottom: "2rem", textAlign: "left" }}>
          <p style={{ color: "#888" }}>// Access methods:</p>
          <p>
            <span style={{ color: "#0ff" }}>→</span> SSH:{" "}
            <code>ssh bsquared.dev</code>
          </p>
          <p>
            <span style={{ color: "#0ff" }}>→</span> Web: Click below
          </p>
        </div>

        <Link href="/terminal" className="terminal-link">
          Launch Terminal
        </Link>

        <div style={{ marginTop: "3rem", fontSize: "0.9rem", color: "#666" }}>
          <p>
            Type <code>/help</code> in the terminal for available commands
          </p>
        </div>
      </main>
    </div>
  );
}
```

### 8. Create Terminal Page (Placeholder)

Create `apps/web/src/app/terminal/page.tsx`:

```tsx
export default function TerminalPage() {
  return (
    <div className="container">
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          height: "80vh",
          border: "2px solid #0f0",
          padding: "1rem",
          backgroundColor: "#000",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Terminal</h2>
        <p style={{ color: "#888" }}>
          // Terminal interface will be implemented in the next task
        </p>
        <p style={{ color: "#888", marginTop: "1rem" }}>
          This page will contain the xterm.js terminal component.
        </p>
      </div>
    </div>
  );
}
```

### 9. Create a Simple Component (Example)

Create `apps/web/src/components/Header.tsx`:

```tsx
import Link from "next/link";

export function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem 2rem",
        borderBottom: "1px solid #0f0",
        backgroundColor: "#000",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Link href="/" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        $ bsquared
      </Link>

      <nav style={{ display: "flex", gap: "2rem" }}>
        <Link href="/terminal">Terminal</Link>
        <a href="https://github.com" target="_blank" rel="noopener">
          GitHub
        </a>
      </nav>
    </header>
  );
}
```

### 10. Create README

Create `apps/web/README.md`:

````markdown
# @bsquared/web

Next.js web application for Bsquared interactive portfolio.

## Development

```bash
# Run the dev server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```
````

## Structure

- `src/app/` - Next.js app router pages and layouts
- `src/components/` - React components
- `public/` - Static assets

## Features

- `/` - Home page with introduction
- `/terminal` - Terminal interface (xterm.js integration coming next)

## Environment

No environment variables needed yet.

````

## Acceptance Criteria

Before submitting your work, verify:

- [ ] Next.js dependencies are installed
- [ ] `tsconfig.json` configured correctly
- [ ] `next.config.js` includes transpilePackages for workspace
- [ ] Directory structure created (`src/app`, `src/components`, `public`)
- [ ] Root layout exists with metadata
- [ ] Global CSS exists with terminal-style theme
- [ ] Home page (`/`) exists with content and link to terminal
- [ ] Terminal page (`/terminal`) exists as placeholder
- [ ] Header component exists (optional)
- [ ] Dev server runs without errors: `bun run dev`
- [ ] Pages render correctly in browser

## Testing Your Work

1. **Install dependencies** (from workspace root):
   ```bash
   bun install
````

2. **Start the dev server**:

   ```bash
   cd apps/web
   bun run dev
   ```

   Should output:

   ```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   ```

3. **Test home page**:

   - Open http://localhost:3000
   - Should see the landing page with "$ bsquared" title
   - Should see terminal styling (black background, green text)
   - "Launch Terminal" button should be visible

4. **Test terminal page**:

   - Click "Launch Terminal" or go to http://localhost:3000/terminal
   - Should see placeholder text in a bordered container
   - Page should load without errors

5. **Check TypeScript**:
   ```bash
   bun run build
   ```
   Should complete without type errors.

## Troubleshooting

- **Module not found**: Run `bun install` from workspace root
- **Port 3000 in use**: Change port with `bun run dev -p 3001`
- **Workspace package not found**: Check that `@bsquared/tui` is linked in node_modules
- **Build errors**: Check tsconfig.json and next.config.js syntax

## Next Steps

The next task will add xterm.js to the terminal page to render an actual terminal interface.

