# /docs — curated fixes

Every file here is a solved problem, promoted from an Issue via PR.

## Categories

- [`mcp/`](./mcp) — MCP servers, tool schemas, token budgets
- [`skills/`](./skills) — SKILL.md authoring, triggering, scoping
- [`plugins/`](./plugins) — packaging, marketplaces, distribution
- [`context/`](./context) — context windows, memory, long sessions
- [`cost/`](./cost) — token economics, caching, model selection
- [`workflows/`](./workflows) — repeatable agency delivery patterns
- [`tooling/`](./tooling) — IDEs, eval, observability
- [`team/`](./team) — hiring, onboarding, review processes
- [`clients/`](./clients) — pricing, scoping, SoWs

## Anatomy of a doc

Every doc follows the same structure — see [`_template.md`](./_template.md):

1. **Frontmatter** — title, category, status, source issue, last validated.
2. **Problem** — one paragraph. No preamble.
3. **Fix** — reproducible or describable.
4. **Why it works** — the reasoning, so future teammates can adapt it.
5. **Limits** — when this doesn't apply.
6. **References** — source issue, related docs, external links.

## Lifecycle

Docs have a `last_validated` date in frontmatter. During monthly maintenance, maintainers revalidate docs or mark them `superseded`. Stale docs are not deleted — they're marked and kept as historical record.
