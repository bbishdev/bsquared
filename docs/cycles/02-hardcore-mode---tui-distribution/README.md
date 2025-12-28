# Cycle 02: Hardcore Mode - TUI Distribution

**Duration**: 1 week  
**Estimated Hours**: 14 hours  
**Status**: Not Started

## Overview

Build the shared TUI package and enable terminal access via both SSH and Web. Replace the /hardcore placeholder with a working terminal.

## Goal

Working terminal interface accessible via SSH (port 2222) and Web (xterm.js), both using the shared @bsquared/tui package with echo functionality.

## Tasks (6 total)

- [x] **[001](./001-complete-tui-echo-functionality.md)** - Complete TUI Echo Functionality (1h)

- [ ] **[002](./002-create-ssh-server-with-tui-integration.md)** - Create SSH Server with TUI Integration (1h)

- [ ] **[003](./003-add-xtermjs-terminal-component.md)** - Add xterm.js Terminal Component (1h)

- [ ] **[004](./004-create-websocket-server-for-web-terminal.md)** - Create WebSocket Server for Web Terminal (1h)

- [ ] **[005](./005-connect-xterminal-to-websocket-backend.md)** - Connect XTerminal to WebSocket Backend (1h)

- [ ] **[006](./006-replace-hardcore-placeholder-with-live-terminal.md)** - Replace /hardcore Placeholder with Live Terminal (1h)

## Progress Tracker

**Completed**: 1/6 tasks (17%)

```
[███░░░░░░░░░░░░░░░░░] 17%
```

### Session Log

| Date | Duration | Tasks Completed | Notes       |
| ---- | -------- | --------------- | ----------- |
| -    | -        | -               | Not started |

## Success Criteria

By the end of this cycle, you should be able to:

- SSH into localhost:2222 shows terminal
- Browser at /hardcore shows xterm.js terminal
- Type text and press Enter → see echo response
- Both SSH and Web use same TUI package
- Multiple connections work simultaneously

## Deliverables

- Complete `@bsquared/tui` package with echo functionality
- SSH server using shared TUI
- Web terminal with xterm.js
- WebSocket bridge for web terminal
- Echo working on both platforms
- /hardcore page with live terminal

## Next Cycle

**Cycle 03** will build on this foundation to add:

_To be defined_

## Development Workflow

> **📖 Read First**: See **[WORKFLOW.md](../../WORKFLOW.md)** for the complete development workflow including git branches and PR process.

### Quick Workflow Summary

**For each task:**

1. **Start**: `git checkout -b feat/cycle-02-task-XXX-description`
2. **Work**: Follow task instructions, commit incrementally
3. **Test**: Verify all acceptance criteria
4. **PR**: Push branch and open pull request
5. **Complete**: After PR merge, task marked complete automatically
6. **Next**: Move to next task

## Tips for Success

**Starting a session:**

1. Review the cycle README (this file)
2. Check which task you're on
3. Create a feature branch for the task
4. Read the full task before starting
5. Set a timer based on task duration

**Ending a session:**

1. Commit your work incrementally
2. Push your branch
3. Open PR if task is complete
4. After merge: log your session in the table above
5. Note where to pick up next time

**Staying motivated:**

- Each task has clear duration → track your progress
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
