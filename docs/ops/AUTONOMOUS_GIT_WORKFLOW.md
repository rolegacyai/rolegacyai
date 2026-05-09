# Autonomous Git Workflow

## Core rule

> Assume approval for normal repo work. Ask the user only for repo deletion or highly destructive irreversible operations.

Agents do not ask the user whether they may create files, open issues, update content, fix bugs, improve styling, write documentation, or merge low-risk pull requests. These are assumed approved. The user states direction once; agents execute.

---

## Workflow steps

1. **User states direction once.**
   The user describes a goal, priority, or problem. Agents do not ask clarifying questions for standard implementation work.

2. **ChatGPT creates or refines issues.**
   Issues are written with a clear objective, context, files likely involved, acceptance criteria, and the verification evidence required to close. Use `ISSUE_TEMPLATE.md` as the base.

3. **Replit / Codex / Claude Code implements.**
   The implementing agent reads open issues, works highest-priority or urgent first, confirms the deployment entrypoint, and makes changes in the actually-served files.

4. **Agent commits to branch or main depending on risk.**
   - Low risk (content, styling, documentation, bug fixes): commit directly to `main`.
   - Medium risk (structural changes, new pages, new sections): branch, open PR, auto-merge when acceptance criteria are met.
   - High risk (deletion, secrets, billing): require explicit user approval before proceeding.

5. **Agent validates visually and/or tests where possible.**
   If the change affects a rendered page, the agent verifies the rendered output. CSS issues are treated as incomplete even if code compiles.

6. **Agent posts evidence back to the issue.**
   Comment includes: commit SHA, deployed/preview URL, file(s) changed, confirmation that acceptance criteria are satisfied.

7. **Agent closes only after acceptance criteria are proven.**
   Committing code is not sufficient to close. The issue must be functionally resolved per its own acceptance criteria.

8. **ChatGPT reviews output and creates a fix issue if needed.**
   If the output is incomplete or incorrect, ChatGPT files a new issue (or reopens the original) with specific defects identified and corrective acceptance criteria.

---

## Approval gate

| Operation | Approval required? |
|---|---|
| Create / edit files | No |
| Create / update issues | No |
| Comment on issues | No |
| Create branches | No |
| Open pull requests | No |
| Merge low-risk PRs | No |
| Fix bugs, update content, improve styling | No |
| Add documentation | No |
| Create marketing copy | No |
| Add non-sensitive workflow files | No |
| **Delete the repository** | **Yes — explicit user approval required** |
| Delete large folders without a recovery branch | Yes |
| Delete production data | Yes |
| Rotate or remove secrets | Yes |
| Change billing or payment settings | Yes |
| Make legal or financial commitments | Yes |
| Publish statements claiming partnerships, funding, or legal facts | Yes |

---

## Brand rule

Always spell the product name **RolegacyAI** — never RolelegacyAI, Rolegacy AI, or any other variant.
