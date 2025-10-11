# Bsquared Interactive Portfolio

An interactive terminal-style portfolio accessible via SSH and Web, featuring slash commands and AI-powered Q&A.

## Overview

Bsquared is a unique portfolio experience that puts users in control through a terminal interface. Instead of scrolling through a traditional website, visitors can:

- **Execute slash commands** like `/skills`, `/achievements`, `/references`
- **Chat with an AI agent** trained on my professional context
- **Access via SSH or Web** with an identical experience on both platforms
- **Download resume**, view references, and leave messages

## Quick Start

```bash
# SSH access (when deployed)
ssh bsquared.dev

# Web access (when deployed)
https://bsquared.dev
```

## Project Structure

```
/
├── apps/
│   ├── ssh/          # SSH server application
│   └── web/          # Next.js web application
├── packages/
│   └── tui/          # Shared TUI package (opentui)
├── data/             # Static content files
├── docs/             # Project documentation
│   ├── PRD.md        # Product Requirements
│   ├── TDD.md        # Technical Design
│   └── cycles/       # Development cycles
│       ├── 01-tui-distribution-foundation/
│       └── cycles.md # Cycle tracker
```

## Development

This project is organized into **development cycles**, each designed to be completed in 1-2 weeks of part-time work (~8 hours).

### Current Cycle

**[Cycle 01: TUI Distribution Foundation](./docs/cycles/01-tui-distribution-foundation/README.md)**

Setting up the foundational architecture with a shared TUI package that powers both SSH and Web access.

### All Cycles

View the complete development roadmap: **[cycles.md](./docs/cycles.md)**

## Tech Stack

- **Monorepo**: Bun workspaces
- **TUI**: OpenTUI for terminal interface
- **SSH**: ssh2 for SSH server
- **Web**: Next.js 14 + xterm.js
- **AI**: OpenAI GPT-4 mini
- **RAG**: Supabase pgvector
- **Telemetry**: PostHog
- **Deployment**: Vercel (web) + custom server (SSH)

## Architecture

The key architectural decision is a **shared TUI package** that both SSH and Web use:

```
┌─────────────────────────────────────┐
│     @bsquared/tui (Shared TUI)      │
│         - opentui widgets            │
│         - command handling           │
│         - AI agent integration       │
└────────────┬───────────┬────────────┘
             │           │
    ┌────────▼───┐   ┌───▼────────┐
    │  SSH App   │   │  Web App   │
    │  (ssh2)    │   │ (Next.js)  │
    └────────────┘   └────────────┘
```

**Benefits**:

- No code duplication
- Consistent experience across platforms
- Single source of truth for features

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.0+
- Node.js v20+ (for Next.js)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bsquared.git
cd bsquared

# Install dependencies
bun install
```

### Running Locally

```bash
# Run SSH server
bun run dev:ssh

# Run web app (in another terminal)
bun run dev:web

# Connect via SSH
ssh -p 2222 user@localhost

# Or open browser
open http://localhost:3000/terminal
```

### Development Workflow

This project uses a structured workflow with feature branches and pull requests for each task.

**Quick Start**:

1. Read the [Workflow Guide](./WORKFLOW.md)
2. Start with [Cycle 01](./docs/cycles/01-tui-distribution-foundation/README.md)
3. Create a feature branch: `git checkout -b feat/cycle-01-task-001-description`
4. Complete the task following the instructions
5. Open a PR when done
6. Mark task complete after merge

See **[WORKFLOW.md](./WORKFLOW.md)** for the complete process.

## Documentation

- **[PRD](./docs/PRD.md)** - Product Requirements Document
- **[TDD](./docs/TDD.md)** - Technical Design Document
- **[Cycles](./docs/cycles.md)** - Development roadmap and progress
- **[Workflow](./WORKFLOW.md)** - Development workflow and git process

## Contributing

This is a personal portfolio project, but if you have suggestions or find issues, feel free to open an issue or PR!

## Development Philosophy

### Organized in Cycles

Work is broken into **1-2 week cycles** (~8 hours each):

- Clear start and end points
- Deliverable features per cycle
- Easy to track progress
- Perfect for part-time development

### Junior-Friendly Tasks

Each cycle contains **1-hour tasks** designed for junior developers:

- Clear acceptance criteria
- Step-by-step instructions
- Testing procedures
- Troubleshooting guides

### Clean Code Principles

- Meaningful names over comments
- Single responsibility
- DRY (Don't Repeat Yourself)
- Small, focused files (<250 lines ideal)
- Conventional commit messages

## License

MIT

---

**Status**: 🚧 In Development - Cycle 01  
**Last Updated**: October 11, 2025
