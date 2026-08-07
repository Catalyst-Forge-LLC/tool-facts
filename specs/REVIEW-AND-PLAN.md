# ToolFacts — review and plan (2026-08 flesh-out)

> Companion to `x-facts/specs/SUITE-FLESH-OUT-2026-08.md`.  
> Formal format remains root [`SPEC.md`](../SPEC.md) (v0.1.0). This file is the
> session review + change plan only.

**Status:** executed (2026-08-07).

---

## Review (current state)

### Already solid

- SPEC v0.1.0 with clear actor/instrument boundary vs AgentFacts.
- Canonical draft-07 schema under `site/schema/`.
- Working TypeScript validator (ajv + yaml).
- Marketing site at AppFacts family quality (teal accent).
- One strong dogfood exemplar: ForgeKit MCP (read-heavy, no credentials/egress).
- Template + generator plan doc.

### Gaps for first useful deployment

| Gap | Why it matters (agent view) |
|---|---|
| Only one exemplar type | Agents need contrast: read-only vs write vs network vs destructive vs credentials. |
| No fetchable examples on the domain | GitHub blob links are not a reliable agent API; ModelFacts teaches `index.json`. |
| No `llms.txt` | Agents should not scrape HTML. |
| Site links a single example path | Should surface a small type ladder. |
| Generator / live directory | Roadmap; **out of scope** this session. |
| Root dogfood `TOOL_FACTS.md` | Spec/tooling repo is not an MCP server; skip until a server ships here. |

### What stays unchanged

- Spec field taxonomy and enums (no v0.2).
- Validator architecture.
- Generator remains plan-only.
- No full ModelFacts-scale directory machinery yet (4–5 exemplars ≠ crawl).

---

## Plan

### P1 — Exemplar ladder (source of truth in git)

Move/expand under `examples/<slug>/TOOL_FACTS.md`:

| Slug | Type signal | Teaches |
|---|---|---|
| `forgekit-mcp` | guidance / read-scoped | Safe baseline (existing ForgeKit label). |
| `filesystem-mcp` | scoped FS read-write | Write without network. |
| `github-mcp` | credentials + allowlisted network + write | Auth + remote mutation. |
| `fetch-mcp` | unrestricted network read | Open-world HTTP. |
| `shell-mcp` | processes + destructive | Worst-case toolbelt. |

Keep `examples/TOOL_FACTS.template.md`. Retire or redirect flat `examples/TOOL_FACTS.md`
to `forgekit-mcp` (update README/site links).

Add `examples/README.md` and `examples/index.json` (catalog metadata for humans/agents).

**Honesty rule:** exemplars for public MCP shapes are **illustrative labels** based on
documented capabilities, not vendor-signed certificates. Bodies state that. ForgeKit
remains the dogfooded Catalyst Forge label.

### P2 — Site agent surfaces

Mirror catalog into `site/examples/`:

- `index.json`
- `<slug>/TOOL_FACTS.md`

Add `site/llms.txt` pointing at schema + examples index + SPEC (GitHub path).

Extend `_headers` CORS for `/examples/*` (same spirit as `/schema/*`).

### P3 — Site / README / NOTES

- New `#examples` section on `site/index.html` listing the ladder + worst side effect.
- Update format links to forgekit path + catalog.
- README: multi-example table, roadmap checkmarks for exemplars + llms.txt.
- NOTES: state snapshot for this session.

### P4 — Validation

`pnpm validate` every `examples/**/TOOL_FACTS.md` (and site copies if desired).

### Out of scope

- MCP `tools/list` generator implementation.
- Shared crawl directory UI.
- Portable `/v` badge payload.
- GitHub remote / Cloudflare deploy (owner).

---

## Acceptance

- [x] ≥4 distinct exemplar types validate.
- [x] `/llms.txt` and `/examples/index.json` exist and describe the catalog.
- [x] Site and README point agents/humans at the ladder, not a single lonely file.
- [x] SPEC.md unchanged unless a bug forces a fix (prefer none).

---

## Completions

| Item | Status |
|---|---|
| Exemplar ladder | done |
| `site/examples` + `llms.txt` | done |
| Site/README/NOTES updates | done |
| Validator green | done |
