# Cycle 01: TUI Distribution Foundation

**Duration**: 1-2 weeks (part-time)  
**Estimated Hours**: 8 hours  
**Status**: Not Started

## Overview

This cycle establishes the foundational architecture for the Bsquared portfolio by creating a shared TUI package that powers both SSH and Web access. By the end of this cycle, you'll have a working terminal interface accessible via both SSH and browser.

## Goal

Build a **shared terminal experience** where the same TUI code runs on both SSH and Web platforms, demonstrating the core echo functionality that will later support slash commands and AI interactions.

## Architecture

```
/packages/tui          # Core TUI with opentui (SHARED)
  ├── input widget
  ├── output pane
  └── echo logic

/apps/ssh              # SSH server → uses /packages/tui
/apps/web              # Next.js + xterm.js → uses /packages/tui
```

**Key Benefit**: No code duplication. Both distribution channels use identical TUI logic.

## Tasks (8 total)

### Foundation

- [ ] **[001](./001-initialize-monorepo-structure.md)** - Initialize Monorepo Structure (1h)

### Shared TUI Core

- [ ] **[002](./002-create-shared-tui-package.md)** - Create Shared TUI Package (1h)
- [ ] **[003](./003-add-echo-functionality.md)** - Add Echo Functionality (1h)

### SSH Distribution

- [ ] **[004](./004-create-ssh-server.md)** - Create SSH Server with TUI Integration (1h)

### Web Distribution

- [ ] **[005](./005-initialize-nextjs-app.md)** - Initialize Next.js App Structure (1h)
- [ ] **[006](./006-add-xterm-component.md)** - Add xterm.js Terminal Component (1h)
- [ ] **[007](./007-connect-web-terminal-to-tui.md)** - Connect Web Terminal to TUI Backend (1h)

### Content

- [ ] **[008](./008-create-static-content-files.md)** - Create Static Content Data Files (1h)

## Progress Tracker

**Completed**: 0/8 tasks (0%)

```
[░░░░░░░░░░░░░░░░░░░░] 0%
```

### Session Log

| Date | Duration | Tasks Completed | Notes       |
| ---- | -------- | --------------- | ----------- |
| -    | -        | -               | Not started |

## Success Criteria

By the end of this cycle, you should be able to:

- ✅ SSH into localhost:2222 and see a terminal
- ✅ Open browser to localhost:3000/terminal and see the same terminal
- ✅ Type text and press Enter → see echo response
- ✅ Both SSH and Web use the same `@bsquared/tui` package
- ✅ Multiple connections work simultaneously
- ✅ Static content files are ready for future command implementation

## Testing the Cycle

### SSH Test

```bash
# Terminal 1: Start SSH server
cd apps/ssh
bun run dev

# Terminal 2: Connect
ssh -p 2222 test@localhost
# Type "hello" → Should echo back
```

### Web Test

```bash
# Terminal 1: Start web server
cd apps/web
bun run dev

# Browser: Open localhost:3000/terminal
# Type "hello" → Should echo back
```

## Deliverables

- ✅ Monorepo with bun workspaces
- ✅ `@bsquared/tui` shared package with opentui
- ✅ `@bsquared/ssh` app with working SSH server
- ✅ `@bsquared/web` app with Next.js and xterm.js
- ✅ WebSocket connection between web frontend and TUI backend
- ✅ Static content files in `/data`

## Next Cycle

**Cycle 02: Command System** will build on this foundation to add:

- Slash command parsing (`/help`, `/skills`, etc.)
- Command dispatcher and routing
- Content rendering from the static files

## Development Workflow

> **📖 Read First**: See **[WORKFLOW.md](../../WORKFLOW.md)** for the complete development workflow including git branches and PR process.

### Quick Workflow Summary

**For each task:**

1. **Start**: `git checkout -b feat/cycle-01-task-XXX-description`
2. **Work**: Follow task instructions, commit incrementally
3. **Test**: Verify all acceptance criteria
4. **PR**: Push branch and open pull request
5. **Complete**: After PR merge, update progress in this README
6. **Next**: Move to next task

## Tips for Part-Time Work

**Starting a session:**

1. Review the cycle README (this file)
2. Check which task you're on
3. Create a feature branch for the task
4. Read the full task before starting
5. Set a 1-hour timer

**Ending a session:**

1. Commit your work incrementally
2. Push your branch
3. Open PR if task is complete
4. After merge: update progress tracker and log session
5. Note where to pick up next time

**Staying motivated:**

- Each task is ~1 hour → quick wins
- Check off tasks as you complete them
- Update the progress bar
- Celebrate completing the cycle! 🎉

## Questions or Blockers?

If stuck for >15 minutes:

1. Check the task's "Troubleshooting" section
2. Review the acceptance criteria
3. Look at the "Testing Your Work" section
4. Consider the "Alternative Approach" if provided

## Notes

_Use this space for cycle-specific notes, learnings, or adjustments_
