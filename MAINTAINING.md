# Maintaining

For repo maintainers. If you're filing or reading, you don't need this page — see the README quickstart.

---

## The full loop

```
Issue raised → Triage → Investigate (in thread) → Fix → Doc PR → Issue closed → Shared
```

Each step has an owner, a label change, and a board column.

---

## Triage (within 24 hours)

New issues land unlabeled — that *is* the triage queue. Maintainer on rotation:

1. Reads the issue. If underspecified, comment asking for repro/environment.
2. Adds one **category** label (`mcp`, `skills`, `cost`, `workflows`, `tooling`).
3. Adds a **type** label only if applicable (`tool-suggestion`, `learning`). Problems and workflow proposals don't need one — the template title prefix signals it.
4. If actionable, assigns an owner and applies `investigating`. Moves card to "Investigating" on the project board.
5. If out of scope, close with a one-line explanation comment.

Rotation: pinned in Discussions. One week per maintainer.

---

## Labels (10 total)

### Category (apply one)

| Label | Use for |
|---|---|
| `mcp` | MCP servers, connectors, tool-call bloat |
| `skills` | SKILL.md authoring, triggering, scoping |
| `cost` | Token spend, model selection, caching |
| `workflows` | Repeatable agency delivery patterns |
| `tooling` | IDEs, editors, eval, observability |

Add a new category only when an issue genuinely doesn't fit an existing one. Discuss in `#meta` before creating.

### Status (apply at state transitions)

| Label | Meaning |
|---|---|
| `investigating` | Actively being worked on |
| `blocked` | Waiting on external fix (Anthropic, vendor) |
| `solved` | Fix documented, doc linked |

### Type (apply only for non-default issue kinds)

| Label | Meaning |
|---|---|
| `tool-suggestion` | Proposed tool to evaluate |
| `learning` | Insight or snippet worth capturing |

Problems and workflow proposals don't need a type label — their title prefix (`[Problem]`, `[Workflow]`) is enough.

### What we don't track

No priority labels (team knows what's urgent). No `triage` label (no labels = untriaged). No `wontfix`, `needs-repro`, or `question` labels — a comment handles each of those cases.

---

## Promotion bar (issue → doc)

Not every solved issue becomes a doc. Promote when:

- The fix is non-obvious and future teammates will likely hit the same problem.
- The fix is durable — not tied to a vendor bug that'll be patched in a week.
- The learning generalizes beyond the original reporter's context.

Skip promotion when:

- The fix is "update the dependency" or "restart the app."
- The issue is too specific to one client or one project.
- A doc already covers it — just link the existing doc in the issue.

When promoting, review the PR for:

- Clear problem statement (no preamble).
- Fix that's reproducible or describable.
- Limits section — what this doesn't apply to.
- Links back to the source issue and any referenced tools.

---

## Project board

Columns: **Backlog → Investigating → Blocked → Solved**

Every issue has a card. Cards move with label changes:

- No labels yet → Backlog (untriaged)
- `investigating` → Investigating
- `blocked` → Blocked
- `solved` or closed → Solved

Weekly review: Monday 15 minutes. Clear Backlog, check Blocked for unblocks.

---

## Discussions categories

- **Announcements** — releases, repo changes (maintainers only post).
- **Q&A** — "how do you X" type questions. Migrate to Issues if a problem emerges.
- **Tool suggestions** — open-ended tool talk before formalizing as an Issue.
- **Workflows** — workflow patterns in progress, gathering input.
- **Show & tell** — solved, shipped, shareable.

---

## Cadence

- **Daily:** triage new issues.
- **Weekly:** 15-min board review, close stale `triage`, nudge `investigating`.
- **Monthly:** audit `/docs` for stale entries. Revalidate `last_validated` dates. Close docs that no longer apply with a `superseded` note.
- **Quarterly:** review category taxonomy. Merge or split based on volume.
