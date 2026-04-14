---
title: Reducing MCP token consumption
category: mcp
status: experimental
source_issue: "#TBD"
last_validated: 2026-04-14
applies_to:
  - Claude Code, Cowork, Desktop with multiple MCP servers enabled
---

## Problem

MCP servers inject their full tool schemas into every request. With 4-6 MCPs enabled, tool definitions alone can consume 20k-60k tokens before a single user message is sent. This inflates cost, shrinks effective context, and degrades quality on long tasks.

## Fix

Apply these in order until token budget is acceptable.

1. **Audit actual usage.** Log which MCP tools are invoked over a week. Most teams use <20% of enabled tools.
2. **Disable by default, enable by project.** Keep a baseline set (filesystem, web, your CRM) always on. Enable the rest per-session or per-project.
3. **Prefer deferred / ToolSearch-style loading** where the surface supports it — schemas load only when a query matches.
4. **Collapse overlapping MCPs.** If two MCPs expose similar tools (two CRMs, two doc stores), pick one per project.
5. **Trim custom MCP schemas.** In MCPs you own, cut optional parameters from descriptions, shorten tool names, remove verbose examples from the schema.
6. **Split monolith MCPs.** If one server exposes 40 tools, fork it into domain-scoped servers and only enable the relevant one.

## Why it works

Tool schemas are sent on every turn as part of the system prompt. Their cost is multiplied by conversation length. Cutting them at the source is strictly better than prompt compression downstream.

## Limits / when it doesn't apply

- If your workflow truly needs all tools available simultaneously (rare), you're stuck paying the tax.
- Deferred loading adds a first-call latency cost.
- Some MCPs don't expose schema-trimming config and must be forked.

## References

- [Anthropic MCP docs](https://modelcontextprotocol.io)
- Internal: see `docs/context/window-budgeting.md` (TBD)
