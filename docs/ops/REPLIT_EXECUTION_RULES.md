# Replit Execution Rules

Specific rules for the Replit agent working on the RolegacyAI repository.

---

## Starting a session

1. Read open GitHub issues before starting any work.
2. Work the highest-priority or most urgent issue first. Issues labelled URGENT take precedence.
3. If multiple issues are open and unblocked, work them in numerical order unless priority is stated otherwise.

## Before modifying website files

1. Confirm the deployment entrypoint. GitHub Pages serves from the repository root (`/`). The entrypoint file is `index.html` at root.
2. Do not modify `rolelegacyai-site/index.html` or `rolelegacyai-site/styles.css` as deployment targets — these are a local workspace copy only.
3. Confirm that `index.html` at root links `<link rel="stylesheet" href="./styles.css" />` using a relative path.

## Making changes

1. Edit the files in the repository root: `index.html`, `styles.css`, `script.js`.
2. For new sections, add the HTML to `index.html` and the CSS to `styles.css` in the same commit.
3. Remove inline styles. Use named CSS classes instead.
4. Preserve all existing sections. Do not overwrite or delete content added in previous issues.

## Pushing to GitHub

Because `git push` is blocked in the Replit sandbox, use the GitHub REST API to push changes:

1. `GET /repos/{owner}/{repo}/git/refs/heads/main` — get current HEAD SHA.
2. `GET /repos/{owner}/{repo}/git/commits/{sha}` — get base tree SHA.
3. `POST /repos/{owner}/{repo}/git/blobs` — create a blob for each changed file (base64-encoded).
4. `POST /repos/{owner}/{repo}/git/trees` — create a new tree with changed blobs, using the base tree.
5. `POST /repos/{owner}/{repo}/git/commits` — create a commit pointing to the new tree.
6. `PATCH /repos/{owner}/{repo}/git/refs/heads/main` — advance the ref to the new commit.

Always push `index.html` and `styles.css` together when both are modified in the same issue.

## After pushing

1. Post a comment on the issue with: commit SHA, files changed, and confirmation of each acceptance criterion.
2. Close the issue only after all acceptance criteria are confirmed satisfied.
3. If GitHub Pages takes a moment to rebuild, note the expected URL in the comment.

## Verification

- Production URL: `https://rolegacyai.com`
- Report section anchor: `https://rolegacyai.com/#report`
- The Replit preview pane runs the API server artifact — it does not serve the static site. Do not use the Replit preview pane to verify GitHub Pages content.

## GITHUB_TOKEN

- The `GITHUB_TOKEN` secret is configured in the Replit environment.
- It belongs to the `rolegacyai` organisation and has Contents: Read+Write on `rolegacyai/rolegacyai`.
- Do not print or expose the token value.
