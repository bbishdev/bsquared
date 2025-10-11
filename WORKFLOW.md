# Development Workflow

This document outlines the complete development workflow for the Bsquared project, including how to work with cycles, tasks, branches, and pull requests.

## Table of Contents

- [Overview](#overview)
- [Cycle-Based Development](#cycle-based-development)
- [Git Workflow](#git-workflow)
- [Task Workflow](#task-workflow)
- [Pull Request Process](#pull-request-process)
- [Commit Guidelines](#commit-guidelines)
- [Progress Tracking](#progress-tracking)

## Overview

Bsquared uses a **cycle-based development approach** where work is organized into 1-2 week cycles (~8 hours). Each cycle contains multiple 1-hour tasks, and each task follows a structured git workflow with feature branches and pull requests.

## Cycle-Based Development

### What is a Cycle?

A **cycle** is a collection of related tasks that deliver a complete feature or milestone. Each cycle:

- Takes 1-2 weeks part-time (~8 hours total)
- Contains 6-10 tasks, each taking ~1 hour
- Has clear deliverables and success criteria
- Can be completed independently

### Current Cycles

See [cycles.md](./cycles.md) for the complete roadmap.

## Git Workflow

### Branch Structure

```
main
  ├── feat/cycle-01-task-001-monorepo-setup
  ├── feat/cycle-01-task-002-tui-package
  ├── feat/cycle-01-task-003-echo-functionality
  └── ...
```

### Branch Naming Convention

```
feat/cycle-XX-task-YYY-short-description
```

**Examples**:

- `feat/cycle-01-task-001-monorepo-setup`
- `feat/cycle-01-task-002-tui-package`
- `feat/cycle-02-task-001-command-parser`

**Format**:

- `feat/` - Feature branch prefix
- `cycle-XX` - Cycle number (zero-padded)
- `task-YYY` - Task number (zero-padded)
- `short-description` - Brief kebab-case description

### Branch Types

- `feat/` - New feature or task (primary)
- `fix/` - Bug fixes within a task
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `chore/` - Maintenance tasks

## Task Workflow

### Step-by-Step Process

#### 1. Start a New Task

```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create a feature branch for the task
git checkout -b feat/cycle-01-task-001-monorepo-setup

# Navigate to the cycle directory
cd docs/cycles/01-tui-distribution-foundation

# Read the task file
cat 001-initialize-monorepo-structure.md
```

#### 2. Work on the Task

Follow the task instructions step by step:

- Read the entire task before starting
- Follow the steps in order
- Test as you go
- Commit incrementally (see [Commit Guidelines](#commit-guidelines))

```bash
# Make changes
# ... work on the task ...

# Commit incrementally
git add .
git commit -m "feat(cycle-01): create monorepo directory structure"

# Continue working
# ... more changes ...

git add .
git commit -m "feat(cycle-01): add workspace package.json files"

# And so on...
```

#### 3. Test Your Work

Before considering the task complete:

- ✅ Check all acceptance criteria in the task file
- ✅ Run all tests in the "Testing Your Work" section
- ✅ Verify the code follows clean code principles
- ✅ Ensure TypeScript compiles without errors (if applicable)
- ✅ Test edge cases and error conditions

#### 4. Create Pull Request

```bash
# Push your branch
git push origin feat/cycle-01-task-001-monorepo-setup

# Open a PR on GitHub/GitLab
# - Title: "feat(cycle-01): Initialize monorepo structure"
# - Description: Reference the task, list what was done, note any deviations
```

**PR Template**:

```markdown
## Task

Completes Task 001 from Cycle 01: Initialize Monorepo Structure

Closes #XXX (if applicable)

## Changes

- Created `/apps` and `/packages` directory structure
- Set up root `package.json` with bun workspaces
- Added workspace `package.json` files for ssh, web, and tui
- Created `.gitignore` and root README

## Testing

- [x] Ran `bun install` successfully
- [x] Verified workspace linking with `ls -la apps/ssh/node_modules/@bsquared/`
- [x] All JSON files validated with `jq`

## Acceptance Criteria

- [x] Directory structure exists
- [x] Root package.json with workspace config
- [x] All workspace package.json files present
- [x] .gitignore created
- [x] Dependencies install without errors

## Notes

None / [Any deviations or challenges encountered]
```

#### 5. Review and Merge

- Self-review the PR (or have someone review it)
- Make any necessary changes based on feedback
- Once approved, merge the PR
- Delete the feature branch

```bash
# After PR is merged
git checkout main
git pull origin main
git branch -d feat/cycle-01-task-001-monorepo-setup
```

#### 6. Mark Task Complete

Update the cycle README:

```bash
# Edit docs/cycles/01-tui-distribution-foundation/README.md
# Change: - [ ] **[001]...
# To:     - [x] **[001]...

# Update progress bar
# From: [░░░░░░░░░░] 0/8 tasks
# To:   [█░░░░░░░░░] 1/8 tasks (12%)

# Log your session
```

**Session Log Example**:

| Date       | Duration | Tasks Completed | Notes                        |
| ---------- | -------- | --------------- | ---------------------------- |
| 2025-10-11 | 1h       | 001             | Monorepo setup went smoothly |

Commit the progress update:

```bash
git add docs/cycles/01-tui-distribution-foundation/README.md
git commit -m "docs(cycle-01): mark task 001 complete"
git push origin main
```

#### 7. Move to Next Task

Repeat the process for the next task!

## Pull Request Process

### Creating a PR

**Title Format**: `<type>(cycle-XX): <description>`

**Examples**:

- `feat(cycle-01): initialize monorepo structure`
- `feat(cycle-01): add echo functionality to TUI`
- `fix(cycle-01): correct WebSocket message parsing`

### PR Description

Include:

1. **Task reference** - Which task this completes
2. **Changes** - Bullet list of what was done
3. **Testing** - Checklist of tests performed
4. **Acceptance criteria** - Checklist from task file
5. **Notes** - Any deviations, challenges, or future improvements

### Review Checklist

Before merging:

- [ ] All acceptance criteria met
- [ ] Tests pass
- [ ] Code follows clean code principles
- [ ] No linter errors
- [ ] Documentation updated (if needed)
- [ ] Commit messages follow conventions

### Merging

- Use **Squash and Merge** for cleaner history (optional)
- Or keep all commits if they tell a good story
- Delete branch after merging

## Commit Guidelines

### Conventional Commits

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(cycle-XX): <description>

[optional body]

[optional footer]
```

### Commit Types

- `feat` - New feature or functionality
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style/formatting (no logic change)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements

### Examples

```bash
# Good commits
git commit -m "feat(cycle-01): create monorepo directory structure"
git commit -m "feat(cycle-01): add opentui dependency to TUI package"
git commit -m "fix(cycle-01): correct TypeScript path aliases in tsconfig"
git commit -m "docs(cycle-01): update task 003 acceptance criteria"
git commit -m "refactor(cycle-01): extract WebSocket handler to separate file"

# With body
git commit -m "feat(cycle-01): implement SSH server with TUI integration

- Set up ssh2 server listening on port 2222
- Wire SSH streams to TUI input/output
- Add graceful shutdown handlers
- Generate host key for development"
```

### Scope

Always include `cycle-XX` in the scope to make it clear which cycle the work belongs to.

## Progress Tracking

### After Each Work Session

1. **Update cycle README**:

   - Check off completed tasks
   - Update progress bar
   - Log session in session log table

2. **Update cycles.md** (when cycle completes):
   - Update cycle status
   - Update overall progress
   - Update time investment table

### Progress Bar Format

```
0/8:   [░░░░░░░░░░] 0%
1/8:   [█░░░░░░░░░] 12%
2/8:   [██░░░░░░░░] 25%
3/8:   [███░░░░░░░] 37%
4/8:   [████░░░░░░] 50%
5/8:   [█████░░░░░] 62%
6/8:   [██████░░░░] 75%
7/8:   [███████░░░] 87%
8/8:   [████████████] 100%
```

### Session Log

Track each work session in the cycle README:

| Date       | Duration | Tasks Completed | Notes                |
| ---------- | -------- | --------------- | -------------------- |
| 2025-10-11 | 1h       | 001             | Monorepo setup       |
| 2025-10-12 | 1.5h     | 002, 003        | TUI package and echo |
| 2025-10-13 | 1h       | 004             | SSH server working!  |

## Tips for Success

### Daily Workflow

```bash
# 1. Start your work session
git checkout main
git pull origin main

# 2. Create/checkout task branch
git checkout -b feat/cycle-01-task-XXX-description

# 3. Read the task thoroughly
cat docs/cycles/01-../XXX-task-name.md

# 4. Work on the task (commit incrementally)
# ... make changes ...
git add .
git commit -m "feat(cycle-01): progress on task XXX"

# 5. Test your work
# ... run tests ...

# 6. Push and create PR
git push origin feat/cycle-01-task-XXX-description
# Open PR on GitHub

# 7. After merge, update progress
git checkout main
git pull origin main
# Update cycle README with progress
git add docs/cycles/01-.../README.md
git commit -m "docs(cycle-01): mark task XXX complete"
git push origin main
```

### Time Boxing

- Set a timer for 1 hour per task
- If a task takes >1.5 hours, consider breaking it down
- It's okay to take breaks between tasks
- Log actual time spent for future estimation

### Staying Organized

- ✅ Always work on a feature branch
- ✅ Commit frequently with clear messages
- ✅ Open PR when task is complete
- ✅ Update progress immediately after merge
- ✅ Don't start next task until previous is merged

### Communication

If working with a team:

- Comment on PRs with questions/suggestions
- Use PR descriptions to explain decisions
- Update task files if instructions need clarification
- Keep notes in cycle README for future reference

## Questions?

If you're unsure about any part of this workflow:

1. Check the task's troubleshooting section
2. Review similar completed PRs
3. Ask in project discussions
4. Document the question/answer for future reference

---

**Remember**: This workflow is designed to keep you organized, track progress, and ensure quality. Follow it consistently for the best experience! 🚀
