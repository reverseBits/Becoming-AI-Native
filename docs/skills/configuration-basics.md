---
title: Skill configuration basics — triggering, scoping, conflicts
category: skills
status: experimental
source_issue: "#TBD"
last_validated: 2026-04-14
applies_to:
  - Claude Code + Cowork with user, plugin, and example skills
---

## Problem

Skills either don't trigger when they should, trigger when they shouldn't, or conflict with each other. Common causes: vague descriptions, overlapping trigger phrases across skills, missing explicit negative examples, and SKILL.md content that leaks into the main context before the skill is invoked.

## Fix

**Description field is a retrieval prompt, not marketing copy.**

- Start with the verb-noun action ("Draft cold emails", "Scope fixed-cost MVPs").
- List trigger phrases the user is likely to say, verbatim. Include common misspellings and informal variants.
- Add negative examples: "Do not trigger for generic knowledge questions like X."
- Keep under 500 chars where possible — longer descriptions get diluted.

**SKILL.md body is loaded only on invocation.**

- Put heavy instruction detail here, not in the description.
- Reference sub-files (`scripts/`, `references/`) instead of inlining.
- Front-load the most important rules — later sections get less attention.

**Avoid overlap.**

- If two skills share trigger phrases, one will shadow the other. Audit descriptions side-by-side.
- Disambiguate by specificity: `marketing:draft-content` vs `sales:draft-outreach` — make it obvious which wins for which request.

**Scoping.**

- Plugin skills (org-wide) for repeatable workflows.
- User skills (personal) for preferences and style.
- Example/project skills for one-off contexts.

## Why it works

Skill selection is a retrieval step over descriptions. Treat the description as the query target, not documentation. The body is only paid for when selected.

## Limits / when it doesn't apply

- Many overlapping skills in one surface still cause misfires regardless of description quality — prune first.
- User-typed slash commands bypass retrieval and fire directly.

## References

- [Anthropic skills docs](https://docs.claude.com)
- `docs/skills/writing-good-descriptions.md` (TBD)
- `docs/skills/avoiding-conflicts.md` (TBD)
