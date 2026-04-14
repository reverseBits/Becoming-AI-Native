# AI-Native Agency Playbook

An open, evolving playbook for agencies transitioning to AI-native workflows. Built and maintained by [reverseBits](https://reversebits.tech) — contributions welcome from any agency, studio, or indie operator figuring this out in public.

## What this is

A living, versioned knowledge base of the real problems agencies hit when adopting Claude, MCPs, skills, plugins, and agentic workflows — and the fixes, workarounds, and tool choices that actually worked.

Not cheatsheets. Not hype threads. Tracked problems with tracked solutions.

## How it's structured

- **[Issues](../../issues)** — every problem is an issue. Labeled, triaged, closed when solved with a link to the doc that captures the fix.
- **[Discussions](../../discussions)** — open-ended questions, tool suggestions, "what's your stack for X" threads.
- **[/docs](./docs)** — promoted solutions. Once an issue is solved, the learning lands here as a permanent, linkable doc.
- **[Project board](../../projects)** — Backlog → Investigating → Solved, across all categories.

## Categories we track

- `mcp` — MCP server selection, token consumption, context bloat, auth
- `skills` — SKILL.md authoring, triggering, scoping, conflicts
- `plugins` — plugin packaging, distribution, marketplace
- `context` — context window management, memory, long-running sessions
- `cost` — token economics, model selection, caching strategies
- `workflows` — repeatable patterns for client work, scoping, delivery
- `tooling` — IDEs, editors, observability, eval
- `team` — onboarding, roles, review processes for AI-assisted work
- `clients` — pricing, scoping, SoW patterns for AI-native delivery

## How to contribute

1. Hit a problem? Open an [Issue](../../issues/new/choose) using the "Problem report" template.
2. Found a tool worth trying? "Tool suggestion" template.
3. Have a workflow that works? "Workflow proposal" template.
4. Solved something? Open a PR adding a doc under `/docs/<category>/<slug>.md`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full flow.

## Seed content

- [docs/mcp/token-consumption.md](./docs/mcp/token-consumption.md)
- [docs/skills/configuration-basics.md](./docs/skills/configuration-basics.md)

## License

Content under CC BY 4.0. Code snippets under MIT.
