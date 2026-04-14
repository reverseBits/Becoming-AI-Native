# Example 2 — End-to-end: A skill that won't trigger

A shorter walkthrough focused on the `skills` category. Same loop, different shape.

## The problem

Team built a custom `client-onboarding` skill with a detailed SKILL.md that walks through our 12-step onboarding workflow. It never fires. People keep typing "start onboarding for Acme" and Claude just answers generically.

---

## Step 1 — Raise the issue

**Title:** `[Problem] client-onboarding skill doesn't trigger on natural phrasing`

**Body:**

```markdown
## What happened
Tried to kick off onboarding for Acme using our custom skill. Typed all of these —
skill never loaded, Claude just responded conversationally:
- "start onboarding for Acme"
- "onboard Acme"
- "new client onboarding"
- "run onboarding flow"

Only `/client-onboarding` (slash command) worked.

## Environment
- Model: claude-opus-4-6
- Surface: Cowork + Claude Code
- MCPs / plugins / skills active: client-onboarding skill at /skills/client-onboarding/SKILL.md
  (description: "A comprehensive 12-step onboarding workflow for new agency clients.")
- OS: macOS 14.5

## Repro
1. Open Cowork in a fresh session
2. Type "onboard Acme"
3. Observe: generic chat response, no skill load

## What you already tried
- Reworded the skill description 3 ways
- Restarted Cowork

## Impact
Team isn't using the skill. Defeats the point of having built it.
```

**Labels on submission:** none. Maintainer adds `skills` on triage, then `investigating` once owned. No priority labels — ordering happens on the project board.

---

## Step 2 — Investigate

Owner inspects the skill description and spots the issue in 5 minutes.

**Current description:**
> "A comprehensive 12-step onboarding workflow for new agency clients."

**Problems:**
1. No trigger phrases — the description describes the skill to a human, not to a retrieval model.
2. No examples of what users actually say.
3. Marketing voice ("comprehensive") instead of action voice.

**Fix: rewrite the description as a retrieval prompt.**

```yaml
---
name: client-onboarding
description: |
  Run the 12-step new-client onboarding workflow — kickoff questionnaire,
  contract checklist, Notion workspace setup, Slack channel creation,
  intro deck, and first-invoice draft. Trigger on "onboard [Client]",
  "start onboarding for [Client]", "new client onboarding", "run onboarding
  flow", "kickoff [Client]", or when a user uploads a signed SoW and asks
  what's next. Do not trigger for generic "how do I onboard a new hire"
  questions — that's employee onboarding, not client.
---
```

What changed:
- Starts with a verb ("Run").
- Lists **verbatim trigger phrases** users say.
- Handles a **non-text trigger** (SoW upload).
- Includes a **negative example** to prevent misfires on employee onboarding.

---

## Step 3 — Validate

Team tests all original phrasings. All four now fire the skill. Employee-onboarding question stays out. Done.

---

## Step 4 — Doc PR

New file `docs/skills/description-as-retrieval-prompt.md`:

```markdown
---
title: Write skill descriptions as retrieval prompts, not marketing copy
category: skills
status: solved
source_issue: "#22"
last_validated: 2026-04-14
---

## Problem
Skills with descriptive, prose-style descriptions often fail to trigger on
natural user phrasing.

## Fix
Structure the description with four elements, in order:
1. **Action verb + object** ("Run the onboarding workflow")
2. **Verbatim trigger phrases** ("Trigger on 'onboard [X]', 'start onboarding for [X]'...")
3. **Non-text triggers if any** ("when a user uploads a signed SoW...")
4. **Negative examples** ("Do not trigger for employee onboarding...")

## Why it works
Skill selection is retrieval over descriptions. Treat the description as the
query target. The SKILL.md body is only paid for when the skill is selected —
put detail there, not in the description.

## Limits
- Doesn't fix conflicts between skills with overlapping triggers
- Slash commands bypass retrieval, so they work regardless

## References
- Issue #22
- docs/skills/configuration-basics.md
```

---

## Step 5 — Close

- Merge, close #22 — swap `investigating` for `solved` (keep `skills` category)
- Post in Discussions → Q&A: "TL;DR — if your skill isn't triggering, rewrite the description as a retrieval prompt. Template + doc here."

---

## What this teaches

1. **Most skill failures are description failures.** Fix the description before touching the body.
2. **Small problems still go through the loop.** Even a 5-minute fix gets a doc, because the next teammate will hit the same thing.
3. **Negative examples matter.** Preventing misfires is as important as enabling fires.
