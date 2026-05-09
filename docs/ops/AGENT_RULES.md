# Agent Rules

Rules that apply to all agents (Replit, Claude Code, Codex, ChatGPT with tools, or any other implementation tool) working on this repository.

---

## Approval

- Do not ask the user for approval for ordinary implementation work.
- Normal website changes, content updates, styling fixes, documentation, and workflow files are assumed approved.
- The only hard approval gate is repo deletion and other destructive irreversible operations listed in `AUTONOMOUS_GIT_WORKFLOW.md`.

## Issue lifecycle

- Do not close an issue just because code was committed.
- Close only after the acceptance criteria stated in the issue are proven to be satisfied.
- If acceptance criteria require visual verification, confirm the rendered output before closing.
- If acceptance criteria require a URL to work, test the URL before closing.
- Post a closing comment with: commit SHA, URL tested, files changed, and explicit confirmation of each acceptance criterion.

## Deployment entrypoint

- Always identify the actual served or deployed entrypoint before modifying website files.
- For this repo, GitHub Pages serves from the **repository root** (`/`). The file `rolelegacyai-site/` is a local workspace copy only and is not the deployment source.
- Confirm the entrypoint has not changed before starting any content or styling work.
- Never modify a file and assume it is live without confirming it is part of the served tree.

## Commit evidence

- Always include the commit SHA in the issue closing comment.
- Always include the preview or deploy URL in the issue closing comment.
- If the change affects a visible page section, include confirmation that the section renders correctly.

## CSS and visual bugs

- If CSS is visually broken in the deployed output, treat the issue as incomplete even if the code compiles without errors.
- A broken visual result is a bug. File a fix issue or reopen the original before marking anything done.

## Brand spelling

- The correct spelling is always **RolegacyAI**.
- Never use: RolelegacyAI, Rolegacy AI, RoLegacyAI, or any other variant.
- Check all user-visible strings, page titles, meta tags, headings, and copy before committing.

## Tally form placeholder

- The Tally form URL `https://tally.so/r/REPLACE_ME` is intentional. Do not replace it with a random or generated URL.
- Leave it as-is until the user explicitly provides a real Tally form ID.
