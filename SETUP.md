# One-time repo setup

## 1. Create the repo

```bash
gh repo create reversebits/ai-native-agency-playbook \
  --public \
  --description "Open playbook for agencies going AI-native. Problems, fixes, workflows — tracked in the open." \
  --homepage "https://reversebits.tech"
```

## 2. Push these files

```bash
cd ai-native-agency-playbook
# copy README.md, CONTRIBUTING.md, labels.md, SETUP.md, .github/, docs/ into place
git add .
git commit -m "Initial playbook structure"
git push origin main
```

## 3. Enable Discussions

`Settings → General → Features → Discussions → Enable`

Create categories: Announcements, Q&A, Tool suggestions, Workflows, Show & tell.

## 4. Create labels (run from repo root)

```bash
# Category
gh label create mcp --color 1f77b4 --description "MCP servers, token bloat, connectors"
gh label create skills --color 2ca02c --description "SKILL.md authoring, triggering"
gh label create plugins --color 9467bd --description "Plugin packaging, distribution"
gh label create context --color ff7f0e --description "Context windows, memory"
gh label create cost --color d62728 --description "Token spend, caching"
gh label create workflows --color 8c564b --description "Delivery patterns"
gh label create tooling --color 17becf --description "IDEs, eval, observability"
gh label create team --color e377c2 --description "Hiring, onboarding, review"
gh label create clients --color bcbd22 --description "Pricing, scoping, SoWs"

# Status
gh label create triage --color ededed
gh label create investigating --color fbca04
gh label create needs-repro --color f9d0c4
gh label create blocked --color b60205
gh label create solved --color 0e8a16
gh label create wontfix --color cccccc

# Type
gh label create problem --color d93f0b
gh label create tool-suggestion --color 5319e7
gh label create workflow --color 0052cc
gh label create learning --color c5def5
gh label create question --color d4c5f9

# Priority
gh label create p0 --color b60205
gh label create p1 --color d93f0b
gh label create p2 --color fbca04
gh label create p3 --color c2e0c6
```

## 5. Create the project board

```bash
gh project create --owner reversebits --title "Playbook tracker"
```

Columns: Backlog · Investigating · Blocked · Solved.

## 6. (Optional) Front with Mintlify or GitBook

- **Mintlify**: point at `/docs`, deploy to `docs.reversebits.tech`.
- **GitBook**: connect the repo via GitHub Sync, free for public spaces.

## 7. Seed issues

Open 5-10 real problems you're already tracking internally. Close two of them with links to the seed docs to show the loop working.

## 8. Announce

Short post linking the repo, pinning the two seed docs, and inviting PRs. Cross-post to your Discord/Slack communities.
