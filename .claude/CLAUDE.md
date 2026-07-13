# CLAUDE.md

This file provides a high-level entry point for Claude-based tools working in the **MacMock (AR Mac Portfolio)** repository.

## Overview

**AR Mac Portfolio** is an interactive macOS-simulator SPA built with React 18 + TypeScript. It recreates the macOS desktop experience — boot screen, lock screen, window management, and built-in "apps" — as an immersive portfolio showcase.

- **Web Framework**: React 18 + TypeScript (CRA with Craco)
- **Styling**: Chakra UI v2 + Framer Motion (glassmorphic, dark-mode-first)
- **State Management**: Zustand v4 with Immer middleware (multiple stores)
- **Routing**: React Router DOM v6 (code-split with React.lazy)

## 📘 Primary Documentation

For comprehensive architectural context and agent guidance, see the **[Agent Guide](#AGENT)** section below.

- Refer to [.claude/rules/typescript/](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/rules/typescript/) for code-style and TypeScript rules.

## Essential Commands

```bash
yarn install                    # Install all dependencies

yarn start                      # Start local dev server (Craco)
yarn build                      # Production build (Craco)
yarn test                       # Run Jest tests (TZ=UTC)
yarn test:cov                   # Run Jest with coverage report
yarn lint                       # ESLint with auto-fix (src/)
yarn prettier:write             # Format all files with Prettier
yarn cy:open                    # Open Cypress E2E test runner

make commit                     # Interactive conventional-commit helper
make coverage                   # Run coverage & open report in Chrome
make branch-clean               # Delete merged / gone local branches
```

## Antigravity Skills

Advanced agent instructions are modularized in the `.claude/skills/` directory.

### Modular Skills

- [Commit Workflow](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/skills/commit/SKILL.md) (`/commit`)
- [Jira Management](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/skills/jira/SKILL.md) (`/jira`)
- [Pull Request Skill](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/skills/pr/SKILL.md) (`/pr`)
- [Frontend Design](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/skills/frontend-design/SKILL.md)
- [Web Development](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/skills/web/SKILL.md) (`/web`)
- [README Guidelines](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/skills/readme/SKILL.md) (`/readme`)

### Custom Agents (Slash Commands)

- `/dev`: [Developer Agent](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/agents/DEVELOPER.md) — handles build verification, commit creation, and opening PRs.
- `/review`: [PR Review & Merge Agent](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/agents/REVIEW.md) — reviews metadata, runs staged builds/tests, and merges PRs.
- `/context`: [Project Context Agent](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/agents/CONTEXT.md) — retrieves and summarizes project context from README and configuration files.
- `/test`: [Unit Test Agent](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/agents/UNIT_TEST.md) — writes unit tests enforcing Jest / React Testing Library best practices.

---

## 🌐 Internationalization Guidelines

User-facing strings are managed with **i18next** (`react-i18next`). Always use the `useTranslation` hook (`t('key')`) for displayed copy — never hardcode text in component files. Localization files live in `src/localization/`.

## 🧪 Testing Guidelines

Always add or update unit tests to align with feature changes. Run `yarn test` to verify all tests pass.

- **Coverage Threshold**: 80% across branches, functions, and lines (`statements: -50`). Run `yarn test:cov` to check.
- **Test Placement**: All test files (`*.test.ts`, `*.test.tsx`) MUST be placed inside a `__tests__` directory adjacent to the code being tested.
- **Snapshots**: Located in `__snapshots__` directories alongside their test files.

---

# AGENT

This section is the primary source of truth for AI agents working on the **MacMock** project.

## 1. Project Overview

| Core Stack           | Technology                                                      |
| :------------------- | :-------------------------------------------------------------- |
| **Framework**        | [React 18](https://react.dev/) + TypeScript 5                   |
| **Build Tool**       | [Craco](https://craco.js.org/) (CRA override)                   |
| **UI Library**       | [Chakra UI v2](https://v2.chakra-ui.com/)                       |
| **Animations**       | [Framer Motion v11](https://www.framer.com/motion/)             |
| **State Management** | [Zustand v4](https://zustand.docs.pmnd.rs/) + Immer             |
| **Routing**          | [React Router DOM v6](https://reactrouter.com/)                 |
| **Windowing**        | `react-draggable`, `react-resizable`, `react-full-screen`       |
| **i18n**             | `i18next` + `i18next-browser-languagedetector` + `react-i18next`|
| **Search**           | [Fuse.js v7](https://fusejs.io/)                                |
| **Rich Text**        | `draft-js`                                                      |
| **Date/Time**        | `moment`, `react-clock`, `react-big-calendar`                   |
| **DnD**              | `react-beautiful-dnd`                                           |
| **Testing**          | Jest 29 + React Testing Library + Cypress                       |
| **Package Manager**  | [Yarn v4 (Berry)](https://yarnpkg.com/)                         |
| **Language**         | TypeScript 5.x                                                  |

## 2. Design & Product Identity

### Visual Language

- **Theme**: Dark-mode first with glassmorphic overlays, blur effects, and translucent panels.
- **Aesthetic**: Faithful macOS look-and-feel — menu bar, dock, desktop icons, window chrome (traffic-light buttons).
- **Animations**: Smooth Framer Motion transitions for window open/close, screen transitions, and micro-interactions.
- **Responsiveness**: Full-screen mode is triggered on first user interaction (`react-full-screen`).

### Product Purpose

MacMock is a portfolio SPA that simulates a macOS desktop. Visitors interact with draggable/resizable windows that open simulated "apps" (Finder, Terminal, VS Code, Spotify, Chrome, Calendar, Notes, Github, Settings, Bin) to explore the author's background, projects, and skills.

## 3. Directory Structure

```text
/
├── .claude/                    # Agent skills, rules, agents, and settings
│   ├── agents/                 # Custom agent definitions (DEVELOPER, REVIEW, CONTEXT, UNIT_TEST)
│   ├── rules/typescript/       # TypeScript & code-style rules
│   └── skills/                 # Modular skill definitions (commit, pr, web, frontend-design, readme)
├── .github/workflows/          # CI/CD workflows (main.yml, deploy.yaml, release.yml)
├── .husky/                     # Pre-commit hooks (lint-staged)
├── public/                     # Static assets & index.html
├── src/
│   ├── assets/                 # Icons (TSX files), images, macOS-themed elements
│   ├── components/             # Reusable UI: MenuItem, MenuList, Modal, TopBarButton, Wallpaper, Window
│   ├── hooks/                  # Custom hooks (e.g., useWindowDimension)
│   ├── localization/           # i18next setup & locale files
│   ├── providers/              # React context providers (ChakraUI, Modal, Router, Draggable)
│   ├── router/                 # Routing config — lazy-loaded routes, public/private route definitions
│   ├── screens/
│   │   ├── private/            # Authenticated screens: Home, Mac desktop, Programs (apps)
│   │   │   └── program/        # Bin, Calendar, Chrome, Finder, Github, Notes, Settings, Spotify, Terminal, VsCode
│   │   └── public/             # Unauthenticated screens: lock screen, boot, power options
│   └── store/                  # Zustand stores
│       ├── uiStore/            # UI state (Modal slice, DateTime slice)
│       ├── processStore/       # Running-process state
│       ├── settingsStore/      # User settings state
│       └── appStore/           # Application registry state
├── __mocks__/                  # Jest mocks (zustand, etc.)
├── scripts/                    # Helper shell scripts (run-staged-tests.sh)
├── jest.config.js              # Jest configuration (coverage thresholds, path aliases)
├── jest.js                     # Jest setup file (polyfills, setupFilesAfterEnv)
├── craco.config.js             # Craco/Webpack overrides
├── tsconfig.json               # Base TypeScript config
├── tsconfig.path.json          # Path alias definitions
├── tailwind.config.js          # Tailwind config (present but Chakra UI is primary)
└── package.json                # Project manifest (v0.5.0)
```

## 4. Path Aliases

Configured in [`tsconfig.path.json`](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/tsconfig.path.json) and mirrored in [`jest.config.js`](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/jest.config.js):

| Alias            | Resolves to                  |
| :--------------- | :--------------------------- |
| `@assets`        | `src/assets`                 |
| `@components`    | `src/components`             |
| `@hooks`         | `src/hooks`                  |
| `@providers`     | `src/providers`              |
| `@router`        | `src/router`                 |
| `@screens`       | `src/screens`                |
| `@localization`  | `src/localization`           |
| `@uiStore`       | `src/store/uiStore`          |
| `@processStore`  | `src/store/processStore`     |
| `@settingsStore` | `src/store/settingsStore`    |
| `@appStore`      | `src/store/appStore`         |

## 5. Development Patterns & Rules

### State Management (Zustand v4 + Immer)

- Centralized stores under `src/store/` — each store has its own directory (`uiStore`, `processStore`, `settingsStore`, `appStore`).
- Stores use **Immer middleware** for immutable update patterns.
- `uiStore` is sliced into **Modal** and **DateTime** slices (`src/store/uiStore/slice/`).
- Access stores via typed selectors in `src/store/*/selector/`.
- Testing: state updates MUST be wrapped in `act()` from `@testing-library/react`. The `__mocks__/zustand.ts` mock provides test isolation.

### UI & Styling (Chakra UI v2)

- **Chakra UI v2** is the primary component/styling system (not v3 — compound component API differs).
- Global CSS in `src/index.css`; avoid ad-hoc inline styles where Chakra props suffice.
- Do not introduce additional UI component libraries.

### Routing (React Router DOM v6)

- **Code-splitting**: Route components are dynamically imported with `React.lazy` + `Suspense`.
- `LazyProvider` wraps lazy route components to handle Suspense fallbacks.
- **Private routes**: Home screen, Mac desktop (`screens/private/`).
- **Public routes**: Lock screen, boot screen, power options (`screens/public/`).

### Windowing & macOS Simulation

- Window chrome (drag, resize, minimize/maximize/close) uses `react-draggable` + `react-resizable`.
- Full-screen mode is handled by `react-full-screen`; F10 toggles, Esc exits.
- Each "program" (`src/screens/private/program/`) is an independent component rendered inside a `<Window />`.

### TypeScript

- Strict mode is on. All component props must be typed.
- Refer to `.claude/rules/typescript/` for detailed standards.

### Icons

- Icons live in `src/assets/icons/` as individual `.tsx` files exporting React components.
- Prefer these local SVG components over third-party icon packs.

## 6. Testing & Verification

- **Unit/Integration**: `yarn test` (all tests) or `yarn test:cov` (with coverage).
  - Coverage thresholds: 80% branches/functions/lines, statements: −50.
  - Tests placed in `__tests__/` directories co-located with source code.
  - Snapshots in adjacent `__snapshots__/` directories.
- **E2E**: `yarn cy:open` (Cypress).
- **Lint**: `yarn lint` before every commit.
- **Build**: `yarn build` — always verify after dependency changes.

## 7. CI/CD

GitHub Actions workflows in `.github/workflows/`:

| Workflow        | Trigger         | Purpose                                |
| :-------------- | :-------------- | :------------------------------------- |
| `main.yml`      | Push / PR       | Lint, test, and coverage checks        |
| `deploy.yaml`   | Push to main    | Deploy to GitHub Pages / hosting       |
| `release.yml`   | Tag / release   | Build and publish release artifacts    |

Coverage is reported to **Codecov** (`codecov.yml`).

## 8. Agent Workflow

1. **Understand**: Review this file and the root `CLAUDE.md`.
2. **Branch**: Use `git checkout -b amitraikwar/{MAC-XXX}/{about-changes}` naming convention.
3. **Lint**: Run `yarn lint` before declaring a task complete.
4. **Test**: Run `yarn test` (and `yarn test:cov` to confirm thresholds).
5. **Commit**: Use `make commit` for interactive conventional commits (`tag(scope): message`).
6. **Documentation**: Update `README.md` or component-level READMEs if surface-level APIs change.
7. **Governance**: Follow Conventional Commits. Link all changes to the **MacMock** Jira project (`MAC`) using `amitraikwar/{MAC-XXX}/{description}` branch naming.

---
