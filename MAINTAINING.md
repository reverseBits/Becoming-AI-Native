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

New issues land with the `triage` label. Maintainer on rotation:

1. Reads the issue. If underspecified, comment asking for repro/environment. Apply `needs-repro`.
2. Adds one or more **category** labels (`mcp`, `skills`, etc.).
3. Adds a **priority** label (`p0` critical → `p3` low).
4. Adds **type** label if not defaulted (`problem`, `tool-suggestion`, `workflow`, `learning`).
5. If actionable, assigns an owner and moves to `investigating`. Moves card to "Investigating" on the project board.
6. If out of scope, applies `wontfix` with a one-line explanation and closes.

Rotation: posted pinned in Discussions. One week per maintainer.

---

## Labels

### Category (pick at least one)

| Label | Use for |
|---|---|
| `mcp` | MCP servers, connectors, tool-call bloat |
| `skills` | SKILL.md authoring, triggering, scoping |
| `plugins` | Plugin packaging, marketplaces, distribution |
| `context` | Context windows, memory, long sessions |
| `cost` | Token spend, model selection, caching |
| `workflows` | Repeatable agency delivery patterns |
| `tooling` | IDEs, editors, eval, observability |
| `team` | Hiring, onboarding, review processes |
| `clients` | Pricing, scoping, client comms |
| `meta` | Changes to this repo itself |

### Status

| Label | Meaning |
|---|---|
| `triage` | Not yet reviewed |
| `investigating` | Actively being worked on |
| `needs-repro` | Waiting on reproduction details |
| `blocked` | Waiting on external fix (Anthropic, vendor) |
| `solved` | Fix documented, doc linked |
| `wontfix` | Out of scope or superseded |

### Type

| Label | Meaning |
|---|---|
| `problem` | Something broken or painful |
| `tool-suggestion` | Proposed tool to evaluate |
| `workflow` | Proposed or documented workflow |
| `learning` | Cheatsheet or insight worth capturing |
| `question` | Open question (redirect to Discussions) |

### Priority

`p0` critical · `p1` high · `p2` medium · `p3` low

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

- `triage` → Backlog
- `investigating` → Investigating
- `blocked` → Blocked
- `solved` or closed → Solved

Weekly review: Monday 15 minutes, clear Backlog, check Blocked for unblocks.

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
