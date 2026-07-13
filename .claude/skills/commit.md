# Commit Command

This file provides guidance for using Claude Code to commit changes following the project's Commit Workflow.

## Commit Workflow

1. Create a feature branch: `git checkout -b amitraikwar/{about-changes}`
2. Stage your changes: `git add <files>`
3. Create initial commit: `make commit` (opens interactive conventional commit prompt)
4. Amend with detailed message: `git commit --amend` to add requirements and detailed descriptions of changes

## Claude Code Usage

When using Claude Code to commit changes:

- For initial commit with conventional commit format: Use the `/commit` skill or run `make commit`
- For amending with detailed description: Use `git commit --amend` via bash tool
- Always follow the conventional commits format: `<type>(<scope>): <description>`

## Examples

### Initial Commit

```bash
git add src/components/NewFeature.tsx
make commit
# Select type: feat, fix, etc.
# Select scope: component, utils, etc.
# Enter brief description
```

### Amend Commit

```bash
git commit --amend
# Edit the commit message to add:
# - Detailed description of changes
# - Requirements addressed
# - Any breaking changes or special notes
```

## Best Practices

- Keep subject line under 50 characters
- Use body to explain "why" not just "what"
- Reference related issues if applicable
- Ensure commit passes linting and tests before pushing
