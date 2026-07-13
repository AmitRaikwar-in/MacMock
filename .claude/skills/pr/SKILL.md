---
name: pr
description: Standardized workflows for Pull Request creation and lifecycle management, including branch naming, templates, and agent-led Jira status automation.
trigger: /pr
---

# Pull Request Management Skill

This ruleset defines the standard patterns for creating and managing Pull Requests in this repository. **All Pull Requests MUST be created in the `AmitRaikwar-in/MacMock` repository.**

## 1. Target Repository

- **Owner:** `AmitRaikwar-in`
- **Repository:** `MacMock`
- **Default Base Branch:** `main`
- **Tooling:** All Pull Request creation and updates MUST use the `github-mcp-server` toolset.

> [!IMPORTANT]
> Every Pull Request created MUST use `owner: "AmitRaikwar-in"` and `repo: "MacMock"`, and target the `main` branch.

## 2. Pull Request Types

### Feat (Feature)

Use this for new features or enhancements.

**Title Format:**
`feat(MAC-{number}): {Short title}`

**Description Template:**

```markdown
# Description of changes

## Requirement

- {Requirement 1}
- {Requirement 2}

## Implementation

- {Focus on functional changes, not just code details}

Ticket: {Link to Jira MAC ticket}
Author: Amit Raikwar
```

### Fix (Bug Fix)

Use this for bug fixes or resolving issues.

**Title Format:**
`fix(MAC-{number}): {Short title}`

**Description Template:**

```markdown
## Issue:

- {Description of the bug or issue}

## Rootcause:

- {What was causing the issue}

## Fix

- {How it was fixed}

### Implementation

- {Focus on functional changes, not just code details}

Ticket: {Link to Jira MAC ticket}
Author: Amit Raikwar
```

## 3. Branch Naming Convention

All feature and fix branches MUST follow this naming pattern (consistent with `commit/SKILL.md`):

`amitraikwar/{ticket-number}/{short-description}`

**Example:**
`amitraikwar/MAC-20/add-spotlight-search`

## 4. GitHub MCP Server Integration

When creating a PR using the `github-mcp-server` tool, ensure:

1. The `owner` and `repo` are set to `AmitRaikwar-in` and `MacMock`.
2. The `title` strictly follows the format above.
3. The `body` (description) strictly follows the corresponding template.
4. The `head` branch strictly follows the naming convention: `amitraikwar/{ticket-number}/{short-description}`.
5. The `base` branch is `main`.
6. Always set the PR **Assignee** to `AmitRaikwar-in`.
7. Apply functional **Labels** (`Mac`, `Core`, `Design`, `Packages`, or `i18n`) to the PR.

## 5. Best Practices

- Always link the Jira ticket (`MAC-{number}`).
- Keep titles concise but descriptive.
- Descriptions should explain the "Why" and the functional impact of the changes.
- Ensure the PR is created as a `draft` if it's still a work in progress.

### skill: jira-pr-created

**Trigger:** After creating a Pull Request.

1. Extract the Ticket ID from the branch name using: `{{pullRequest.sourceBranch.substringAfter("/").substringBefore("/")}}`
2. Use `addCommentToJiraIssue` (with `contentFormat: "markdown"`) to add a comment: `Pull Request raised: [{{pullRequest.title}}]({{pullRequest.url}})`.
3. Use `transitionJiraIssue` to move the ticket to `In Review` (Transition ID: `31`).

### skill: jira-pr-merged

**Trigger:** After merging a Pull Request.

1. Extract the Ticket ID from the branch name.
2. Extract the implementation summary using: `{{pullRequest.description.match("(?s)## Implementation\s*(.*?)\r?\n\r?\nTicket:")}}`.
3. Extract the original PR Author using: `{{pullRequest.description.substringAfter("Author:").trim()}}`.
4. Use `addCommentToJiraIssue` (with `contentFormat: "markdown"`) to add a comment:

   ```text
   The changes in this PR have been merged.

   *Summary of changes:*
   {extracted_summary}

   *Author:* {extracted_author}
   *Merged by:* {{pullRequest.mergedBy.displayName}}
   *PR Link:* [{{pullRequest.title}}]({{pullRequest.url}})
   ```

5. Use `transitionJiraIssue` to move the ticket to `Done` (Transition ID: `41`).

### Smart Values Reference

- **Summary Extraction**: `{{pullRequest.description.substringAfter("## Implementation").substringBefore("Ticket:").trim()}}`
- **Ticket ID from Branch**: `{{pullRequest.sourceBranch.substringAfter("/").substringBefore("/")}}`
