# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Common Scripts
- `yarn start` or `npm start` - Start the development server using Craco
- `yarn build` or `npm run build` - Build the production version
- `yarn test` or `npm test` - Run all tests with Jest
- `yarn test:cov` or `npm run test:cov` - Run tests with coverage report
- `yarn test:craco` or `npm run test:craco` - Run tests using Craco directly
- `yarn lint` or `npm run lint` - Run ESLint with auto-fix on all TypeScript/JavaScript files
- `yarn lint:fix` or `npm run lint:fix` - Same as lint (ESLint with auto-fix)
- `yarn lint:staged` or `npm run lint:staged` - Lint only staged files
- `yarn prettier:write` or `npm run prettier:write` - Format all files with Prettier
- `yarn prettier:check` or `npm run prettier:check` - Check formatting with Prettier
- `yarn cy:open` or `npm run cy:open` - Open Cypress test runner
- `yarn run-staged-tests` or `npm run run-staged-tests` - Run tests for staged files
- `yarn run-pushed-files-tests` or `npm run run-pushed-files-tests` - Run tests for pushed files

### Makefile Commands
- `make coverage` - Run coverage tests and open the report in Chrome
- `make branch-clean` - Delete local branches that have been removed from remote
- `make commit` - Interactive commit helper that guides you through conventional commits

### Recommended Commit Workflow
1. Create a feature branch: `git checkout -b amitraikwar/{about-changes}`
2. Stage your changes: `git add <files>`
3. Create initial commit: `make commit` (opens interactive conventional commit prompt)
4. Amend with detailed message: `git commit --amend` to add requirements and detailed descriptions of changes

## Project Architecture

### High-Level Structure
This is a React single-page application styled after Apple's macOS interface, using:
- **React 18** with TypeScript for the UI framework
- **Zustand** for state management (centralized store in `/src/store/`)
- **React Router DOM v6** for client-side routing
- **Chakra UI** for component styling and layout
- **Framer Motion** for animations
- **Craco** (Create React App Configuration Override) for extending CRA without ejecting

### Key Directories
- `/src/assets/` - Static assets including icons and macOS-themed elements
- `/src/components/` - Reusable UI components (buttons, menus, modals, windows, wallpaper)
- `/src/hooks/` - Custom React hooks (e.g., useWindowDimension)
- `/src/providers/` - React context providers (ChakraUI, Modal, Router, Draggable)
- `/src/router/` - Routing configuration with lazy loading
  - `/src/router/lazyRouting/` - Code-split route components using React.lazy
  - `/src/router/routes/` - Public and private route definitions
- `/src/store/` - Zustand state management slices (uiStore with Modal and DateTime slices)
- `/src/localization/` - Internationalization configuration (i18next)

### State Management
- Uses **Zustand** with Immer middleware for immutable state updates
- Centralized store at `/src/store/uiStore/uiStore.ts`
- Features are sliced (Modal slice for UI state, DateTime slice for time-related state)
- Access store hooks via `uiStore(selector)` pattern throughout components

### Routing Strategy
- Implements **code-splitting** with React.lazy and Suspense for performance
- **LazyProvider** wraps route components for fallback handling
- Separate routers for:
  - **Private routes** (require authentication): Home, Mac desktop interface
  - **Public routes** (no auth needed): Lock screen, power options, etc.
- Route components are dynamically imported to reduce initial bundle size

### Component Architecture
- **Atomic design approach** with small, focused components
- **MacOS simulation** elements:
  - Window controls (minimize, maximize, close)
  - Menu bar and menu items
  - Desktop icons and wallpaper
  - System modals and dialogs
  - Full-screen capability (F10 to toggle, Esc to exit)
- **Icon system** in `/src/assets/icons/` with individual TSX files for each icon

### Styling Approach
- **Chakra UI** as the primary styling system
- Custom CSS in `/src/index.css` for global styles
- Component-specific styling using Chakra's props-based API
- Responsive design considerations throughout

### Testing Strategy
- **Jest** with **React Testing Library** for unit and integration tests
- **Cypress** for end-to-end testing
- Test files co-located with components (__tests__ directories)
- Mocks in `/__mocks__/` for external libraries (zustand mock)
- Coverage reporting configured via jest.config.js

### Development Practices
- **ESLint** with React App configuration and Prettier integration
- **Husky** pre-commit hooks for linting staged files
- **Conventional commits** via make commit command
- Environment variables handled through standard CRA mechanisms
- Environment-specific configuration in `.env` files (not committed)

### Internationalization
- Configured with **i18next** and browser language detection
- Localization files in `/src/localization/`
- Language switching capability built into the system