# Project Notes - ToolFacts

> Working notes for maintainers/agents. Not published to the site.
> Last updated: 2026-09-10 (shelf audit + dogfood refresh).

## What this is

ToolFacts (toolfacts.dev) labels the **toolbelt**: per-tool side effects, reach,
credentials, and egress for MCP servers. Tagline: *"Know what it touches before
your agent picks it up."*

Suite vision: `catalyst-forge/docs/xfacts-suite-vision.md`.
Session plan: [`specs/REVIEW-AND-PLAN.md`](./specs/REVIEW-AND-PLAN.md).

## State as of 2026-09-10

| Piece | Status |
|---|---|
| SPEC v0.1.1 | Done (v0.1 files; mcp-server only) |
| Schema + validator | Done; exemplars validate |
| Teaching ladder (5) | forgetrail / filesystem / github / fetch / shell |
| Shelf MCP dogfood (3) | forgetrail-mcp 0.3.5, ollanet 0.6.8, dictawhisper 0.0.9 |
| `site/examples` + `llms.txt` | Done |
| Generator | Still plan-only |
| Public directory crawl | Not this session |

## Shelf audit (2026-09-10)

Checked [catalystforge.com/tools](https://catalystforge.com/tools/) against sibling
repos. ToolFacts applies only when a product exposes an MCP server.

| Shelf product | MCP? | ToolFacts |
|---|---|---|
| ForgeTrail | yes (`forgetrail-mcp`) | yes |
| ollanet | yes (`ollanet mcp`) | yes |
| DictaWhisper | yes (read-only journal MCP) | yes |
| Smell Check, Detangler, Misemphasis, Cold-eye, TemperPass, EmberDossier, Gap Last, DocuPuncture | no | SkillFacts |
| FilePress, IngotVault, Finetuna, HaulOut, LocalSlip, LocalHelm, gui4cli, ForeBalance, xFacts | no | AppFacts where shipped |

`living-legacy-ledger` has an MCP server locally; it is not on the public shelf.

Canonical product copies live next to the servers:

- `forgetrail/mcp-server/TOOL_FACTS.md`
- `ollanet/TOOL_FACTS.md`
- `dictawhisper/TOOL_FACTS.md`

Refresh those when `tools/list` or the package version/license changes, then copy
into `examples/<slug>/` and `site/examples/<slug>/`, then `pnpm encode-viewer`.

## Next

1. MCP `tools/list` generator (still the scale path).
2. Shared crawl directory with AgentFacts.
3. Pointers on MCP install surfaces (`toolFactsUrl`).
