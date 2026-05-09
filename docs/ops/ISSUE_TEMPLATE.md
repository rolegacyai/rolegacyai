# Issue Template

Use this template when creating new issues for the RolegacyAI repository.

---

## [Issue title — imperative verb phrase, e.g. "Add X to Y" or "Fix Z in W"]

### Objective

One sentence. What does this issue achieve when complete?

### Context

2–5 sentences. Why does this issue exist? What is the user-facing or operational problem being solved? Link to related issues if relevant.

### Files likely involved

List the files that will probably need to change. Helps the implementing agent confirm the deployment entrypoint.

- `index.html` — main site HTML (repo root, served by GitHub Pages)
- `styles.css` — main stylesheet (repo root)
- `script.js` — scroll/animation behaviour (repo root)
- `docs/ops/...` — documentation
- `marketing/...` — marketing copy
- `context/...` — project memory files

### Non-goals

What this issue explicitly does not cover. Helps prevent scope creep.

### Acceptance criteria

Specific, testable conditions that must all be true before the issue can be closed. Write them as checkboxes.

- [ ] ...
- [ ] ...
- [ ] ...

### Verification evidence required

The implementing agent must include this in the closing comment before closing the issue.

- Commit SHA: `...`
- URL tested: `https://rolegacyai.com/...`
- Files changed: `...`
- Confirmation: [for each acceptance criterion, one line confirming it is satisfied]

### Approval gate check

Does this issue require explicit user approval before proceeding?

- [ ] No — this is ordinary implementation work (content, styling, docs, bug fix, workflow)
- [ ] Yes — this involves: repo deletion / large folder deletion / production data deletion / secrets / billing / unapproved legal or financial commitments

If yes, do not proceed until the user has explicitly approved.
