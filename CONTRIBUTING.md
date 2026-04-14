# Contributing

## Raising a problem

Open an Issue with the "Problem report" template. Include:
- What you were trying to do
- What went wrong (error, token count, unexpected behavior)
- Environment (Claude model, tool versions, MCPs enabled)
- What you've already tried

Add at least one category label.

## Suggesting a tool or workflow

Use the relevant issue template. Tool suggestions require:
- What problem it solves
- What it costs (free / paid / token impact)
- Alternatives considered
- Real-world use (not "someone tweeted about it")

## Promoting an issue to a doc

When an issue is resolved:
1. Open a PR adding a markdown file under `/docs/<category>/<slug>.md`
2. Follow the template in `/docs/_template.md`
3. Link the issue in the doc's frontmatter
4. Close the issue with a link to the merged doc

## Review bar

Docs must have:
- A clear problem statement
- A reproducible or describable fix
- Known limits / when it doesn't apply
- Links to the source issue and any referenced tools

## Labels

See [labels.md](./labels.md) for the taxonomy.
