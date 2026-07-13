---
name: jira
description: Comprehensive management of Atlassian Jira resources, enforcing project scope (MacMock, Key: MAC), platform prefixes, labeling standards, and issue templates.
trigger: /jira
---

# Jira Management Ruleset

This ruleset defines the standard patterns for interacting with Atlassian Jira. **All operations MUST target the MacMock project.**

## 1. Target Environment

- **Jira Project Name:** `MacMock`
- **Jira Project Key:** `MAC`
- **Cloud Instance:** `ar1603.atlassian.net`

> [!IMPORTANT]
> Every Jira issue created or modified MUST use `projectKey: "MAC"`.

## 2. Naming Conventions

- **Epic Linking:** EVERY Story, Task, and Bug MUST be linked to a corresponding Epic. When using the API, specify the Epic using the `parent: { "key": "EPIC-KEY" }` field.
- **Platform Prefixing:** Every ticket summary MUST start with a platform identifier in brackets:
  - `[Mac]` for macOS UI/interaction features.
  - `[Core]` for shared or infrastructure-related tasks.
  - `[Design]` for UI/UX and styling tasks.
  - `[i18n]` for internationalization and localization tasks.
- **Example:** `[Mac] Implement drag-and-drop window resizing`

## 3. Active Epics (Project: MAC)

> [!NOTE]
> Ask the user to confirm or provide the current Epics if none are defined yet. The examples below are placeholders until real Epics are created.

- **MAC-1**: `[Core] Infrastructure & Setup`
- **MAC-2**: `[Mac] macOS Desktop Features`
- **MAC-3**: `[Design] Visual Excellence & Theming`
- **MAC-4**: `[i18n] Localization & Accessibility`

## 4. Issue Types & Templates

> [!IMPORTANT]
> Unless explicitly specified otherwise, always use **Story** as the default issue type for new ticket requests.

### Story

Use for user-facing features and functionality.

**Description Template:**

```markdown
## Background:

## Details

## Acceptance criteria:

## Implementation notes.
```

### Task

Use for technical setup, maintenance, or infrastructure work. (Follow Story template structure if complex.)

### Bug

Use for defects or errors.

**Description Template:**

```markdown
## Background:

## Details

## Acceptance criteria:

- {use number bullet points}
- {requirement 1}
- {requirement 2}

## Repro steps

## QA notes
```

### Epic

Use for high-level project goals or features.

## 5. Labeling

> [!IMPORTANT]
> **Every ticket MUST have at least one functional label (`Mac`, `Design`, `Packages`, `Core`, `i18n`).**

- Apply functional labels to every issue for easy filtering.
- Link all stories and tasks to their corresponding **Epic**.

## 6. Workflow & Statuses

Standard project workflow statuses to target:

- **Story/Tasks:** Backlog, In Progress, In Review, Done, Won't do.
- **Bugs:** Backlog, In Progress, In Review, Done, Won't do, In Testing, Duplicate.

## 7. Field Requirements

- **Priority:** Must have a value. Do not attempt to set to null or clear via API as it is a required system field.
- **Description:** MUST use the templates defined in section 4. Provide a clear summary of work and explicit acceptance criteria.
- **Assignee:** Every ticket MUST be assigned to Amit Raikwar (Account ID: `61b7140a9e8a3700688df217`). Use `{"assignee": {"accountId": "61b7140a9e8a3700688df217"}}` in the API payload.

## 8. Link Formatting (Strict Rule)

When adding comments via API (`addCommentToJiraIssue`):

1. **MUST** set `contentFormat: "markdown"`.
2. **MUST** use standard Markdown `[Title](URL)` syntax.
3. If title linkification is critical, provide the raw URL in parentheses after the title.
4. **DO NOT** use Wiki Markup `[Title|URL]` as it fails in ADF-default environments.
