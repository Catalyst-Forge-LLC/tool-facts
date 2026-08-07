# Project Notes - ToolFacts

> Working notes for maintainers/agents. Not published to the site.
> Last updated: 2026-08-07 (exemplar ladder + agent surfaces).

## What this is

ToolFacts (toolfacts.dev) labels the **toolbelt**: per-tool side effects, reach,
credentials, and egress for MCP servers. Tagline: *"Know what it touches before
your agent picks it up."*

Suite vision: `catalyst-forge/docs/xfacts-suite-vision.md`.
Session plan: [`specs/REVIEW-AND-PLAN.md`](./specs/REVIEW-AND-PLAN.md).

## State as of 2026-08-07

| Piece | Status |
|---|---|
| SPEC v0.1.0 | Done |
| Schema + validator | Done; all exemplars validate |
| Exemplar ladder (5) | forgekit / filesystem / github / fetch / shell |
| `site/examples` + `llms.txt` | Done |
| Generator | Still plan-only |
| Public directory / deploy | Not this session |

## Next

1. MCP `tools/list` generator + full ForgeKit inventory.
2. Shared crawl directory with AgentFacts.
3. Owner: GitHub remote + Cloudflare Pages + DNS.
