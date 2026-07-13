---
name: developer
description: Agent responsible for end-to-end development lifecycle — verifying tests and linting, creating Jira tickets, committing code, and opening Pull Requests for the MacMock (AR Mac Portfolio) project.
trigger: /dev
---

# Developer Workflow Agent

This agent ruleset defines the standard end-to-end workflow for an AI Agent handling development tasks in the **MacMock (AR Mac Portfolio)** project.

## Workflow Steps

When assigned to process a set of changes, the agent MUST run linting and testing checks before everything else (including Jira ticket creation, documentation updates, or commits). Follow these steps in exact order:

### 1. Run Linting and Tests (Before Everything)

Verify code formatting and functionality before proceeding:

```bash
yarn lint
yarn test --watchAll=false
```

Ensure there are no outstanding formatting issues, lint warnings, test failures, or build errors.

### 2. Check and Update Documentation

- Always check if a README update is required for any modified components (e.g., changes to routes, state keys, config settings, dependencies, or component APIs).
- If required, update or write the corresponding `README.md` file following the guidelines in the [readme skill](file:///Users/mr.robot/z-stash/AmitRaikwar-in/MacMock/.claude/skills/readme/SKILL.md).

### 3. Create Jira Ticket

- Automatically create a Jira ticket in the `MAC` project.
- **IMPORTANT**: The ticket MUST be assigned to Amit Raikwar (Account ID: `61b7140a9e8a3700688df217`).
- **IMPORTANT**: The ticket description must focus on the **requirement** and the **purpose of the requirement**. Do NOT write it like a PR description. Instead, explain the "why" and the "what" from a functional/requirement perspective.
- **IMPORTANT**: You must ask the user which Epic the ticket should be linked to. Provide the user with the available Epics listed in `.claude/skills/jira/SKILL.md`, then wait for the user's response. Once provided, link the ticket to the chosen Epic using `parent: "EPIC-KEY"`.
- Follow all naming and template guidelines from `.claude/skills/jira/SKILL.md` (e.g., prefixing `[Mac]`, `[Core]`, or `[Design]` to the title, and applying the corresponding label).

### 4. Create Commit

- After the Jira ticket is successfully created, initiate the commit process.
- Follow the rules defined in `.claude/skills/commit/SKILL.md`.
- Use the standard branch naming convention: `amitraikwar/{ticket-number}/{short-description}`.
- **IMPORTANT**: Use `make commit` with a **detailed, multi-line body**.
- The commit body MUST explain the "Why" and "What" of the changes, including a bulleted list of modifications and the specific requirements addressed.
- Example format: `<type>(<ticket-number>): <short description>\n\n- Detailed change 1\n- Detailed change 2\n...`

### 5. Create Pull Request

- If all the above steps (testing, documentation, ticket creation, committing) have succeeded, proceed to create a Pull Request.
- **IMPORTANT**: Always use the `github-mcp-server` tool `create_pull_request` to raise the Pull Request. Do not use the local CLI (like `gh`).
- Target the `AmitRaikwar-in/MacMock` repository.
- Set the base branch to `development`.
- Use the title and description templates defined in `.claude/skills/pr/SKILL.md`.
- Set the assignee and labels using the `github-mcp-server` tool `update_issue`.
- Trigger the `jira-pr-created` step to comment on the Jira ticket and move it to "In Review" using `atlassian-mcp-server` tools.
