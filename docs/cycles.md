# Bsquared Development Cycles

This document tracks all development cycles for the Bsquared interactive portfolio project. Each cycle is designed to be completed in 1-2 weeks of part-time work (~8 hours total).

> **📖 New to the workflow?** Read the **[Workflow Guide](./WORKFLOW.md)** to learn how to work with cycles, tasks, branches, and pull requests.

## Overview

**Current Cycle**: 01  
**Total Cycles Planned**: 4+  
**Completed**: 0/8 hours (0%)

## Cycle Structure

```
/docs/cycles/
  /01-tui-distribution-foundation/    ✓ Ready to start
  /02-command-system/                 ○ Planned
  /03-ai-integration/                 ○ Planned
  /04-mobile-polish/                  ○ Planned
```

## Cycles

### ✅ Cycle 01: TUI Distribution Foundation

**Status**: Not Started  
**Duration**: 1-2 weeks  
**Hours**: 8 hours (8 tasks × 1 hour)

**Goal**: Build shared TUI package and enable terminal access via both SSH and Web.

**Deliverables**:

- Monorepo with bun workspaces
- Shared `@bsquared/tui` package with opentui
- SSH server using the shared TUI
- Next.js web app with xterm.js using the shared TUI
- Echo functionality working on both platforms
- Static content data files

**[View Cycle 01 →](./cycles/01-tui-distribution-foundation/README.md)**

---

### ○ Cycle 02: Command System

**Status**: Planned  
**Duration**: 1-2 weeks  
**Hours**: ~8 hours (estimated)

**Goal**: Implement slash command parsing and routing.

**Planned Features**:

- Command parser (detects `/` prefix)
- Command dispatcher in `@bsquared/agent-core`
- Implement core commands:
  - `/help` - Show available commands
  - `/skills` - Display skills from data file
  - `/achievements` - Show achievements
  - `/links` - Display GitHub, LinkedIn, etc.
  - `/references` - Show professional references
  - `/tldr` - Display self-pitch
  - `/download` - Provide resume download link
- Error handling for unknown commands
- Help text generation

**Dependencies**: Cycle 01 must be complete

---

### ○ Cycle 03: AI Integration

**Status**: Planned  
**Duration**: 2-3 weeks  
**Hours**: ~10-12 hours (estimated)

**Goal**: Add AI agent with RAG for natural language Q&A.

**Planned Features**:

- Set up `@bsquared/agent-core` package
- Integrate OpenAI API (gpt-4-mini)
- Set up Supabase for pgvector
- Implement `@bsquared/indexer` for embeddings
- RAG pipeline for context retrieval
- LLM agent loop
- Confidence scoring
- Fallback to `/message` for low confidence
- Message capture system (email required)

**Dependencies**: Cycle 02 must be complete

---

### ○ Cycle 04: Mobile & Polish

**Status**: Planned  
**Duration**: 1-2 weeks  
**Hours**: ~8 hours (estimated)

**Goal**: Mobile optimization and production polish.

**Planned Features**:

- Mobile keyboard toolbar (Esc, Ctrl, Tab, Arrows)
- PWA support for "Easy Mode"
- Responsive terminal sizing (100dvh)
- Hidden input trick for mobile keyboards
- PostHog telemetry integration (`@bsquared/telemetry`)
- Rate limiting
- Session idle timeout
- Input validation and sanitization
- Production deployment configs

**Dependencies**: Cycle 03 must be complete

---

## Future Cycles

Additional cycles may include:

- **Cycle 05**: Deployment & Infrastructure (Vercel, SSH hosting, monitoring)
- **Cycle 06**: Advanced Features (command history, autocomplete, themes)
- **Cycle 07**: Analytics & Optimization (query analysis, caching, performance)

## Progress Tracking

### Overall Progress

```
Cycle 01: [░░░░░░░░░░] 0/8 tasks
Cycle 02: [░░░░░░░░░░] Planned
Cycle 03: [░░░░░░░░░░] Planned
Cycle 04: [░░░░░░░░░░] Planned
```

### Time Investment

| Cycle     | Estimated | Actual | Variance |
| --------- | --------- | ------ | -------- |
| 01        | 8h        | -      | -        |
| 02        | 8h        | -      | -        |
| 03        | 12h       | -      | -        |
| 04        | 8h        | -      | -        |
| **Total** | **36h**   | **-**  | **-**    |

## Working on a Cycle

> **Important**: Follow the [Workflow Guide](../WORKFLOW.md) for the complete git workflow including feature branches and pull requests.

### Starting a New Cycle

1. Navigate to the cycle directory: `cd docs/cycles/0X-cycle-name/`
2. Read the cycle README thoroughly
3. Create a feature branch: `git checkout -b feat/cycle-0X-task-001-description`
4. Start with task 001
5. Follow the task instructions
6. Open a PR when complete
7. Update progress in the cycle README after merge

### Completing a Task

1. Check all acceptance criteria
2. Run all tests in "Testing Your Work"
3. **Push branch and open a Pull Request**
4. After PR is reviewed and merged:
   - Mark task as complete in cycle README: `- [x]`
   - Update progress bar
   - Log session in session log
   - Commit progress update
5. Move to next task

**See [WORKFLOW.md](./WORKFLOW.md) for detailed PR process.**

### Completing a Cycle

1. Verify all success criteria met
2. Run end-to-end tests
3. Update cycle status to "Complete"
4. Update this file's progress tracker
5. Celebrate! 🎉
6. Plan next cycle if needed

## Commit Message Format

Following conventional commits:

```
<type>(<cycle>): <description>

[optional body]

[optional footer]
```

**Examples**:

- `feat(cycle-01): initialize monorepo structure`
- `feat(cycle-01): add echo functionality to TUI`
- `fix(cycle-01): correct WebSocket message parsing`
- `docs(cycle-01): update task 003 acceptance criteria`
- `chore(cycle-01): complete cycle 01 - TUI foundation`

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Staying on Track

**Weekly Check-in Questions**:

- [ ] Am I on track to complete the cycle in 1-2 weeks?
- [ ] Are any tasks taking significantly longer than 1 hour?
- [ ] Do I need to adjust the scope or break tasks down further?
- [ ] Have I committed my work regularly?
- [ ] Am I blocked on anything?

**Motivation Tips**:

- 🎯 Focus on one task at a time
- ⏱️ Use 1-hour timeboxes
- ✅ Check off tasks frequently for quick wins
- 📝 Keep notes of learnings and blockers
- 🎉 Celebrate completing each cycle
- 🚀 Ship working features incrementally

## Notes

_Use this space for overall project notes and learnings_

---

**Last Updated**: October 11, 2025  
**Next Review**: After completing Cycle 01
