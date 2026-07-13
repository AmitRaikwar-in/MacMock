---
name: readme
description: Guidelines, template structures, and standards for writing, formatting, and updating README files in the MacMock repository.
trigger: /readme
---

# README Standard Writing Guidelines

This skill defines the standards for creating, updating, and formatting README files in the **MacMock (AR Mac Portfolio)** repository. Maintaining clean, technically accurate, and easily readable documentation ensures developers and agents can quickly understand the system's architecture, dependencies, and entry points.

---

## 1. Core Principles

1. **Concise Prose**: Keep sentences tight, direct, and active. Avoid fluff and verbose descriptions. Let diagrams, code blocks, and tables do the heavy lifting.
2. **Visual Hierarchy**: Use Markdown headers (`#`, `##`, `###`), horizontal rules (`---`), and lists to structure information cleanly.
3. **No Placeholders**: Never include empty placeholders (e.g., `TODO`, `insert here`). Use concrete, working examples.
4. **Self-Documenting Code / Shell Commands**: Provide explicit commands rather than generic descriptions. Specify directories where commands must run.
5. **Interactive Diagrams**: Document complex interactions and system design visually using Mermaid diagrams rather than large walls of text.

---

## 2. Standard README Structure

Every major component or folder README should follow this structured sequence of sections:

### 1. Title & High-level Pitch

- Must start with a clear H1 representing the module name: `# MacMock — [Module] (folder/)`
- A single concise paragraph summarizing what the component does, the core technologies used, and its role in the overall application.

### 2. Architectural Diagram

- A styled `mermaid` flowchart or sequence diagram depicting key components, data flow, and state boundaries.

### 3. Table of Contents

- A linked Markdown list pointing to all subsequent headers.

### 4. Directory Structure

- A clean ASCII tree diagram of the project folder. Key files and subfolders must have short, inline comments describing their role.
- Example:
  ```
  program/VsCode/
  ├── index.ts              # Public export
  ├── VsCodeScreen.tsx      # Main program component rendered inside <Window />
  ├── types.ts              # Component prop and state types
  ├── util.ts               # Helper logic
  └── __tests__/
      └── VsCodeScreen.test.tsx
  ```

### 5. Tech Stack & Dependencies

- A markdown table listing primary packages, versions, and specific purposes.
- Example:
  | Package | Version | Purpose |
  |:---|:---|:---|
  | `framer-motion` | 11.x | Window open/close and screen transition animations |

### 6. How It Works

- **Request Lifecycle**: An ordered list showing step-by-step how the component renders or operates (e.g., user clicks dock icon → store dispatches → window mounts → program renders).
- **State Integration**: Description of which Zustand store(s) the component reads from or writes to.

### 7. Getting Started & Installation

- **Prerequisites**: Clear list of system-level tools required (e.g., Node v18+, Yarn v4).
- **Step-by-step Commands**: Code blocks detailing how to install, build, and run in dev mode.
- **Configuration Table**: A table detailing environment variables, descriptions, and defaults if applicable.

### 8. Component API Reference

- A props summary table containing Prop name, Type, Required status, and Description.
- Detailed prop shapes using formatted TypeScript type signatures.

### 9. State Management

- A table listing state variables, their Zustand store/slice, and purpose.
- Document which selectors or actions the component depends on.

### 10. Testing Guide

- Commands for running unit and integration tests (`yarn test`, `yarn test:cov`).
- A table showing test file coverage mapping.
- Description of any mocks or fixture utilities used.

---

## 3. Formatting Standards

### Markdown Best Practices

- **Alerts**: Use GitHub-style warnings and notes to highlight critical information:
  > [!IMPORTANT]
  > Wrapping components in `ChakraProvider` is required for all unit tests that render Chakra UI elements.
- **Code Fences**: Always specify the language name for syntax highlighting (e.g., `tsx`, `bash`, `json`, `mermaid`).
- **Tables**: Align header columns cleanly for readability. E.g., `|:---|:---|` for left-aligned columns.

### Mermaid Diagram Guidelines

- Use customized color classes for nodes to make diagrams visually distinct:
  ```mermaid
  classDef component fill:#eef2ff,stroke:#6366f1,stroke-width:2px,color:#1e1b4b;
  classDef store fill:#fdf2f8,stroke:#ec4899,stroke-width:2px,color:#500724;
  ```
- Always quote labels containing parentheses, brackets, or commas to avoid rendering errors. E.g., `node["Label Name (Detail)"]`.

---

## 4. Maintenance Rule

Whenever a source code modification introduces changes to:

1. Component props or public APIs.
2. Zustand store keys, slices, or selectors.
3. Dependencies and tech stack versions.
4. Routing paths or lazy-loaded route configuration.
5. i18n locale files or translation key namespaces.

You **MUST** immediately update the corresponding module README. This requirement is enforced by the rule defined in [.claude/CLAUDE.md](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/CLAUDE.md).
