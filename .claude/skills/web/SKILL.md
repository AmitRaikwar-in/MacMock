---
name: web
description: Expert-level web development specializing in React 18, Craco, and the MacMock macOS-simulator architecture.
trigger: /web
---

## Use this skill when

- Developing or maintaining the MacMock (AR Mac Portfolio) React application.
- Configuring Craco, TypeScript, or build tooling.
- Implementing macOS-style UI components (windows, dock, menu bar, programs).
- Working with Zustand stores, Framer Motion animations, or react-draggable/react-resizable.
- Optimizing web performance or internationalization.

## Do not use this skill when

- The task is unrelated to web development.

## Instructions

- Prioritize modern React patterns and hooks.
- Follow the macOS-inspired design aesthetic: glassmorphism, dark mode, smooth Framer Motion transitions.
- Use **Chakra UI v2** for styling — do not use Tailwind or other UI libraries.
- Ensure strict TypeScript compliance with no `any` types.
- Use path aliases (`@components`, `@uiStore`, `@screens`, etc.) consistently.

---

## Core Expertise

### React 18 & Modern Patterns

- Mastery of React hooks (`useMemo`, `useCallback`, `useContext`, `useRef`).
- State management using **Zustand v4** with Immer middleware (multiple sliced stores).
- Code-splitting with `React.lazy` + `Suspense` via `LazyProvider`.
- Client-side routing with `react-router-dom` v6 (private and public route separation).

### Craco & Build Tooling

- Configuration of `craco.config.js` for custom Webpack settings and path aliases.
- Managing environment variables and build scripts.
- Configuring ESLint and Prettier for consistent code quality.

### macOS Simulation Architecture

- **Window system**: `react-draggable` + `react-resizable` for interactive window chrome.
- **Full-screen**: `react-full-screen` triggered on first user interaction; F10 to toggle, Esc to exit.
- **Programs**: Each app (Finder, Terminal, VsCode, Spotify, Calendar, Notes, Github, Chrome, Settings, Bin) lives in `src/screens/private/program/` and renders inside a `<Window />` component.
- **Dock & Menu Bar**: Managed via `uiStore` Modal slice and dedicated components in `src/components/`.
- **Search**: Fuse.js powers fuzzy search across desktop apps/files.
- **Rich Text**: `draft-js` for any note/text editing programs.

### Design & Styling (Chakra UI v2)

- Expert usage of Chakra UI v2 component and theming APIs (not v3 — compound component API differs).
- **Glassmorphism**: backdrop-filter blur, translucent panels, subtle shadows.
- **Animations**: Framer Motion for window open/close, screen transitions, and micro-interactions.
- **Dark Mode First**: All components must look correct in dark mode.
- **Responsive**: Full-screen mode is the target; design for viewport-filling layouts.

### Internationalization

- Use `useTranslation` hook from `react-i18next` for all user-facing strings.
- Never hardcode text in component files.
- Localization files in `src/localization/`.

### Testing & QA

- Unit and integration testing with Jest 29 and React Testing Library.
- E2E testing with Cypress.
- All tests in `__tests__/` directories co-located with source code.

---

## Behavioral Traits

- **macOS Fidelity**: Prioritize authentic macOS look and feel in every UI decision.
- **Code Quality**: Writes clean, modular, well-documented TypeScript. No `any`.
- **Component Focus**: One component per file; sub-components in `components/` subdirectories.

## Response Approach

1. **Understand Intent**: Clarify the UX and technical requirements of the feature.
2. **Design First**: Propose a macOS-faithful, visually polished approach before writing logic.
3. **Implementation**: Provide clean TypeScript/TSX code using established path aliases and store patterns.
4. **Validation**: Recommend testing strategies and accessibility checks.

## Example Prompts

- "Add a new program window for a Music app to the MacMock desktop."
- "Implement a glassmorphic context menu that appears on right-click on the desktop."
- "Set up a new Zustand slice for tracking open window z-index order."
- "Optimize the boot screen animation using Framer Motion."
- "Add Korean (`ko`) as a supported locale."
