# Project Notes - ToolFacts

> Working notes for maintainers/agents picking up this project. Not published to the site.
> Last updated: 2026-08-03 (initial scaffold session).

## What this is

ToolFacts (toolfacts.dev - domain owned, registered 2026-07-31) is the fourth label in
the xFacts family. AppFacts labels the **body**; ModelFacts the **brain**; AgentFacts
the **hands** (actor); ToolFacts the **toolbelt** (instrument). Tagline: *"Know what it
touches before your agent picks it up."*

Authoritative bootstrap: [`GENESIS.md`](./GENESIS.md). Suite vision:
`catalyst-forge/docs/xfacts-suite-vision.md`.

## State as of 2026-08-03

Scaffold built locally on `main`. Remote target:
`git@github.com:Catalyst-Forge-LLC/tool-facts.git` (owner creates and pushes - **do not
push** without an explicit ask).

| Piece | Where | Status |
|---|---|---|
| Formal spec v0.1.0 | `SPEC.md` | Done. Server groups + per-tool `side_effects` / `reach` / `idempotent`. Closed enums; `undisclosed` convention. File format version `"0.1.0"`. |
| Genesis bootstrap | `GENESIS.md` | Preserved; SPEC formalizes the draft taxonomy. |
| Canonical JSON Schema | `site/schema/tool-facts.schema.json` | Done (draft-07). `$id` = toolfacts.dev URL. |
| Examples | `examples/TOOL_FACTS.md` (ForgeKit MCP, 8 of 29 tools), `examples/TOOL_FACTS.template.md` | Both intended to pass validation. |
| Validator CLI | `validator/` | TypeScript ESM, pnpm, tsx + ajv + yaml. Mirrors model-facts. |
| Generator CLI | `generator/README.md` | Stub only - MCP introspection plan documented; no implementation yet. |
| Site | `site/` | Static, Cloudflare Pages-ready (root = `site`, no build). Teal accent (`#2dd4bf` / `#5eead4`). |

## Key design decisions (and why)

- **Frontmatter is the sole source of truth; the Markdown body is a rendered view** - 
  identical to AppFacts / ModelFacts. Body may drift; tooling doesn't verify
  body-vs-frontmatter.
- **Actor vs instrument:** AgentFacts = configuration / leash; ToolFacts = per-tool
  invocation facts. Do not blur.
- **`side_effects` stays four values:** `none | read | write | destructive`. Prefer the
  harsher label when unsure. No fifth value before v1.0.
- **v0.1 `kind` is `mcp-server` only** in the schema enum. Widen at v0.2 if needed.
- **No per-tool cost / rate-limit fields in v0.1** - useful later, scope creep now.
- **Policy is the headline:** hosts MAY drive approvals from the label. Say it on the site.
- **`undisclosed` over omission**, especially for egress destinations.
- **Licensing:** spec & schema CC0, tooling MIT.
- Workspace conventions: **pnpm + TypeScript + ESM only**; commit after substantive work;
  **never push without explicit ask**.

## Honest headwinds (from GENESIS)

- The MCP official registry could grow richer metadata and absorb the niche.
  Mitigation: CC0 spec, verify-don't-trust posture (check annotations, don't merely
  repeat them), be first with the vocabulary.
- Classifying `side_effects` from descriptions is judgment; a wrong `none` on a
  destructive tool is worse than no label. Human review before directory publish; never
  let an LLM override schema-derived reach facts.
- Server churn: generator and re-crawl cadence matter more than the spec.

## Next steps (rough priority)

1. **Generator:** MCP `tools/list` + annotations + input-schema heuristics; optional LLM
   for `side_effects` only; self-validate before write. Shared core candidate for
   AgentFacts.
2. **Dogfood complete inventory:** regenerate ForgeKit's label with all 29 tools from a
   live handshake (example currently lists 8).
3. **Directory seed** shared with AgentFacts: popular public MCP servers, sorted by side
   effects and egress.
4. Deploy site to Cloudflare Pages (root = `site`) + DNS for toolfacts.dev.
5. Policy-integration demo + badge / portable label later.
6. Owner push to GitHub when ready.

## Open decisions (resolved for this scaffold)

| Decision | Choice this session |
|---|---|
| Tagline | "Know what it touches before your agent picks it up." |
| Accent | Teal `#2dd4bf` / soft `#5eead4` |
| Non-MCP kinds in v0.1 | Schema allows `mcp-server` only |
| Per-tool cost / rate limits | Deferred past v0.1 |

## Gotchas / environment notes

- Validator resolves schema at `../../site/schema/tool-facts.schema.json` relative to
  `validator/src/` - keep that path stable.
- tsconfig uses `moduleResolution: "Bundler"` because tsx/esbuild is the runner; ajv is
  imported as the **named** export (`import { Ajv } from "ajv"`) to keep `tsc --noEmit`
  clean (same as model-facts).
- Worked example deliberately lists a subset of ForgeKit tools; body states the full set
  is larger. Generator acceptance criteria still require exact tool count from a live
  handshake when that lands.
