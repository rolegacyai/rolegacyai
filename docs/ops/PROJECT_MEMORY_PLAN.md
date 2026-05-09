# Project Memory Plan

This document defines the planned context store for RolegacyAI. The backend is not built yet. This is a specification for a repo-readable, AI-consumable memory layer.

---

## Purpose

Connected AI tools (OpenRouter, Claude, ChatGPT, Codex) need reliable project context to work consistently across sessions without the user re-explaining the same background each time. The context store is a flat set of Markdown files in `/context/` that any agent can read at the start of a session.

---

## Planned files

### `/context/PROJECT_MEMORY.md`
The master context file. Contains:
- What RolegacyAI is and what problem it solves
- Current phase (discovery)
- Key decisions made so far
- What has been built or published
- Open questions and unknowns
- What the user should not need to repeat

### `/context/POSITIONING.md`
Brand and market positioning. Contains:
- Target users (HR, IT, operations, asset management, enterprise architecture, delivery leaders)
- Core value proposition
- Competitor landscape notes
- Messaging do's and don'ts
- Brand tone of voice

### `/context/WEBSITE_COPY.md`
Source of truth for all copy on the live website. Contains:
- Section-by-section copy as it appears on the live site
- Rationale for key copy choices
- Placeholder status (e.g. Tally form URL)
- Copy that is approved vs in draft

### `/context/REPORT_STRATEGY.md`
Context for the independent report (the 10 interview questions). Contains:
- Report hypothesis and framing
- Interview questions as published
- Target respondent profiles
- Distribution strategy
- Intended output format (PDF, web, both)

### `/context/LINKEDIN_POSTS.md`
Approved and draft LinkedIn posts. Contains:
- Launch post (from `marketing/linkedin-launch-post.md`)
- Post status: draft / approved / published
- Posting schedule or intent
- Notes on tone and engagement goals

### `/context/OPENROUTER_REVIEW_WORKFLOW.md`
Instructions for using OpenRouter as a review layer. Contains:
- Which model(s) to use for copy review
- Which model(s) to use for code review
- Prompt templates for review tasks
- How to feed context files into the review prompt

---

## How agents should use this store

At the start of any implementation session, an agent should read:
1. `PROJECT_MEMORY.md` — for overall context
2. The specific context file relevant to the task (e.g. `WEBSITE_COPY.md` for a content task)

This replaces the need for the user to re-explain background in every session.

---

## Implementation note

These files do not exist yet. They will be created in a future issue. This document defines the schema so agents and the user have a shared understanding of what to build.
