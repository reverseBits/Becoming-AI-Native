# Repo setup (one-time)

You already created the repo on GitHub. These are the steps to configure it.

## 1. Enable Discussions

`Settings → General → Features → Discussions → Enable`

Create categories: Announcements, Q&A, Tool suggestions, Workflows, Show & tell.

## 2. Create labels (from repo root)

Minimal set — 10 labels. Add more only when an issue forces the need.

```bash
# Delete GitHub defaults first
for l in bug documentation duplicate enhancement "good first issue" "help wanted" invalid question wontfix; do
  gh label delete "$l" --yes 2>/dev/null
done

# Category (5)
gh label create mcp --color 1f77b4 --description "MCP servers, token bloat, connectors"
gh label create skills --color 2ca02c --description "SKILL.md authoring, triggering"
gh label create cost --color d62728 --description "Token spend, caching"
gh label create workflows --color 8c564b --description "Delivery patterns"
gh label create tooling --color 17becf --description "IDEs, eval, observability"

# Status (3)
gh label create investigating --color fbca04 --description "Actively being worked on"
gh label create blocked --color b60205 --description "Waiting on external fix"
gh label create solved --color 0e8a16 --description "Fix documented, doc linked"

# Type (2) — applied only for non-default issue kinds
gh label create tool-suggestion --color 5319e7 --description "Proposed tool to evaluate"
gh label create learning --color c5def5 --description "Insight or snippet worth capturing"
```

## 3. Project board

```bash
gh project create --owner reverseBits --title "Playbook tracker"
```

Columns: **Backlog · Investigating · Blocked · Solved**.

## 4. (Optional) Front with Mintlify or GitBook

- **Mintlify**: point at `/docs`, deploy to `docs.reversebits.tech`.
- **GitBook**: connect the repo via GitHub Sync, free for public spaces.

## 5. Seed issues

Open 5-10 real problems you're already tracking internally. Close two with links to the seed docs (`docs/mcp/token-consumption.md`, `docs/skills/configuration-basics.md`) to show the loop working.

## 6. Announce

Short post linking the repo, pinning the two seed docs, inviting PRs. Cross-post to your Discord/Slack.
