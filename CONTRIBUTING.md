# Contributing

Most of the time, contributing here is just **opening an issue**. That's it. See the README quickstart.

This page is for the two cases where you want to go deeper:
1. Promoting a solved issue to a permanent doc.
2. Proposing changes to repo structure, templates, or labels.

---

## Promoting an issue to a doc

When an issue is resolved and the fix is worth preserving beyond the thread:

1. Open a PR adding a markdown file under `/docs/<category>/<slug>.md`.
2. Copy `/docs/_template.md` as your starting point.
3. Link the source issue in the doc's frontmatter (`source_issue: "#14"`).
4. Keep it short. Problem → Fix → Why it works → Limits → References.
5. Merge, then close the source issue with a link to the merged doc.

Docs should be:
- **Reproducible or describable.** A teammate reading this in 6 months should be able to act on it.
- **Honest about limits.** What this fix doesn't solve, when it doesn't apply.
- **Linked back.** Source issue, any referenced tools, related docs.

---

## Proposing structural changes

Templates, labels, categories, or process changes → open an issue with `[Meta]` in the title and mention maintainers. Discuss before PRing.

---

## What not to do

- Don't dump cheatsheets into `/docs`. Docs are fixes tied to real problems, not listicles.
- Don't close issues without a doc or a clear resolution comment.
- Don't create new categories unilaterally — propose in an issue first.

---

## Code of conduct

Be decent. Disagree with ideas, not people. Evidence beats opinion.
