# Example 1 — End-to-end: MCP token bloat

A full walkthrough of the playbook loop using a real problem: Claude sessions eating 40k tokens before the user says anything.

## The loop, visualized

```
Problem hit → Issue raised → Triage → Investigate → Fix → Doc PR → Issue closed → Doc shared
```

---

## Step 1 — Raise the issue

Dev on the team notices a new project is blowing through context fast. They open an issue.

**Title:** `[Problem] MCP tool schemas consuming 42k tokens at session start`

**Body (filled-in template):**

```markdown
## What were you trying to do?
Refactor a client Next.js project. Had GitHub, Figma, Linear, Sentry, and our internal CRM MCPs enabled.

## What went wrong?
First user message burned 42,800 input tokens. Claude became sluggish after 3-4 turns
and started dropping instructions. Cost for a single debugging session hit $8.

## Environment
- Model: claude-opus-4-6
- Surface: Claude Code
- MCPs enabled: github, figma, linear, sentry, reversebits-crm
- OS: macOS 14.5

## Reproduction
1. Enable all 5 MCPs
2. Open Claude Code in any project
3. Send a one-word message
4. Check token report — ~42k before any real work

## What you already tried
- Restarting Claude Code
- Disabling one MCP at a time to identify heaviest offender

## Impact
Blocks delivery. We can't run long-form refactors without running out of context.
```

**Labels applied:** `problem`, `mcp`, `cost`, `triage`, `p1`

---

## Step 2 — Triage (within 24 hours)

Maintainer moves `triage` → `investigating`, assigns owner, comments:

> Splitting this. Part A: measure per-MCP cost. Part B: propose a baseline config.
> Owner: @tapan. ETA: end of week.

Adds `investigating` label. Moves card to "Investigating" column on project board.

---

## Step 3 — Investigate (work happens in the issue thread)

Owner posts findings as comments, keeping the evidence trail public.

**Comment 1 — Measurement:**

```
Enabled each MCP in isolation, sent "hi", recorded input tokens:

| MCP              | Tokens | Tools exposed |
|------------------|--------|---------------|
| github           | 11,200 | 38            |
| figma            |  9,800 | 22            |
| linear           |  6,400 | 18            |
| sentry           |  4,100 | 12            |
| reversebits-crm  |  8,600 | 24            |
| baseline (none)  |  2,100 | 0             |
|------------------|--------|---------------|
| All 5 enabled    | 42,200 | 114           |
```

**Comment 2 — Usage audit:**

```
Logged actual tool calls over 2 weeks, 47 sessions:
- github: 31 sessions used it, avg 4 calls per session
- figma: 3 sessions used it
- linear: 18 sessions, but only 4 tools out of 18
- sentry: 8 sessions, only 2 tools out of 12
- crm: 12 sessions

Takeaway: we're paying for 114 tools, we use ~15 regularly.
```

**Comment 3 — Proposed fix:**

```
Two-layer config:
1. "Baseline" — always on: github, crm (filesystem + web come free)
2. "On-demand" — enable per-project: figma, linear, sentry

Also forking linear-mcp and sentry-mcp to expose only the tools we actually call.
```

---

## Step 4 — Validate the fix

Runs the same repro with the new config:

```
Baseline only: 11,200 + 8,600 + 2,100 = ~22k tokens
Trimmed forks of linear/sentry (on-demand): save additional 8k when loaded
```

Result: 47% reduction at session start. Long sessions now complete without context overflow.

---

## Step 5 — Promote to a doc (PR)

Owner opens a PR: `docs: add MCP baseline config pattern`

New file `docs/mcp/baseline-config-pattern.md`:

```markdown
---
title: MCP baseline + on-demand config pattern
category: mcp
status: solved
source_issue: "#14"
last_validated: 2026-04-14
applies_to:
  - Claude Code, Cowork with 4+ MCPs
---

## Problem
Enabling all MCPs team-wide consumes 40k+ tokens per session before any work starts.

## Fix
Split MCPs into two tiers:

**Baseline (always on):**
- github
- reversebits-crm

**On-demand (enable per-project):**
- figma (design handoff projects)
- linear (active sprint work)
- sentry (incident response only)

For MCPs we own (linear-proxy, sentry-proxy), fork and expose only the 3-5
tools actually called. See `scripts/mcp-usage-audit.sh` for how we measured.

## Why it works
Tool schemas ship on every turn as part of the system prompt. Cost compounds
with conversation length. Cutting at source beats any downstream compression.

## Limits
- Per-project config requires discipline — easy to forget to turn things off
- Forking third-party MCPs adds maintenance cost
- Doesn't help when you genuinely need all tools in one session

## References
- Issue #14
- Anthropic MCP docs: https://modelcontextprotocol.io
```

PR description includes:

```
Closes #14

- Adds baseline config pattern doc
- Adds usage-audit script under /scripts
- Validated: reduces session-start tokens from 42k → 22k
```

---

## Step 6 — Merge and close

- PR merged. Commit squashed, message: `docs(mcp): baseline + on-demand config pattern (closes #14)`
- Issue auto-closes via `Closes #14`
- Issue labels updated: remove `investigating`, `triage` → add `solved`
- Final comment on issue:

> Solved. See [docs/mcp/baseline-config-pattern.md](../../blob/main/docs/mcp/baseline-config-pattern.md).
> Team: update your local MCP config this week. Ping in Discussions if you hit issues.

---

## Step 7 — Share

- Post in Discussions → "Show & tell": short summary + link to doc
- Short LinkedIn post linking the doc (not a cheatsheet — a tracked, validated fix)

## What this teaches

1. **Problems are first-class citizens.** They live in Issues, not Slack.
2. **Evidence trail is public.** Future teammates see the reasoning, not just the conclusion.
3. **Fix is a doc, not a Slack message.** Durable, searchable, versioned.
4. **Close the loop.** Issue → PR → Doc → Announcement.
