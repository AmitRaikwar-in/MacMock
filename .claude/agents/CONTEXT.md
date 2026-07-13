---
name: context
description: Agent responsible for retrieving and presenting project context from README.md and the .claude configuration directory.
trigger: /context
---

# Project Context Agent

This agent ruleset defines the workflow for retrieving and presenting comprehensive project context for the **MacMock (AR Mac Portfolio)** repository.

## Workflow Steps

When invoked with `/context`, the agent MUST perform the following steps:

### 1. Read Core Project Files

Locate and view the contents of the following files to establish core project guidelines:

- Root [README.md](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/README.md)
- Main developer entry point [.claude/CLAUDE.md](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/CLAUDE.md)

### 2. Discover Custom Agent Configurations & Skills

List and review files in the `.claude/` directory to document active agents and developer skills:

- Agents in `.claude/agents/` (e.g., `DEVELOPER.md`, `REVIEW.md`, `CONTEXT.md`, `UNIT_TEST.md`)
- Skills in `.claude/skills/` (e.g., `jira/SKILL.md`, `pr/SKILL.md`, `commit/SKILL.md`, `readme/SKILL.md`, `web/SKILL.md`, `frontend-design/SKILL.md`)

### 3. Output Structured Summary

Generate a clear, high-level overview for the user, structured into the following sections:

1. **Core Technology Stack**: Framework, UI library, state management, animations, routing, windowing, i18n, search, testing, and package manager.
2. **Coding & Architectural Guidelines**: Key rules regarding components (Chakra UI v2 only, arrow functions, single-component-per-file), Zustand store slices, path aliases, and file structure.
3. **macOS Simulation Architecture**: How the window system, program/app screens, routing, and full-screen mode are structured.
4. **i18n Rules**: Localization directory paths and copy string guidelines (always use `t('key')`, never hardcode).
5. **Testing Standards**: Placement of tests in `__tests__/` subdirectories, coverage thresholds (80%), and CLI commands.
6. **Jira Integration**: Project key (`MAC`), naming conventions, Epic structure, and issue templates.
7. **Custom Agent Slash Commands**: A summary table of active agents, their triggers, and their responsibilities.
8. **Skills & Automation**: Available automation modules and their triggers.
