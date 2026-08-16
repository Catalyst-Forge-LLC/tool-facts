# ToolFacts generator (planned)

Not implemented yet. This document is the build plan so the next session can ship the
CLI without re-deriving strategy from [`GENESIS.md`](../GENESIS.md).

## Goal

Draft a `TOOL_FACTS.md` for an MCP server from deterministic introspection first, with
optional LLM classification only for judgment fields (`side_effects`), sanitized against
[`tool-facts.schema.json`](../site/schema/tool-facts.schema.json). Output MUST
self-validate before writing.

## Sources (priority order)

1. **MCP handshake.** Connect to the server, call `tools/list`. Names, descriptions, and
   input schemas are ground truth. Read `annotations` (`readOnlyHint`,
   `destructiveHint`, `idempotentHint`, `openWorldHint`) when present; mark them as
   self-reported, never as verified.
2. **Schema heuristics.** Path parameters, URL parameters, and command-string fields
   often imply `reach.filesystem`, `reach.network`, or `reach.processes` without prose.
3. **Package metadata.** Name, version, license from `package.json` / `pyproject.toml`
   / registry listing.
4. **LLM curation last** (local-first via Ollama; same provider set as the ModelFacts
   generator). Only for `side_effects` (and maybe purpose cleanup). Enum-whitelist the
   result. Never let the LLM override schema-derived reach facts. Flag every
   LLM-classified field for human review before directory publish.

## Proposed layout (mirror model-facts)

```
generator/
  package.json          # type: module, pnpm, tsx
  tsconfig.json
  README.md             # this file
  prompt.md             # Golden Rule + enum constraints for LLM pass
  src/
    generate.ts         # CLI entry
    facts.ts            # ToolFacts shape + defaults
    render.ts           # frontmatter → nutrition-label body
    llm.ts              # optional providers
    sources/
      mcp.ts            # tools/list + annotations
      package.ts        # package metadata
```

Reuse the ModelFacts generator structure: adapters return a common facts shape; validate
against the canonical schema before write.

## Sequencing note

Build this generator **before** the AgentFacts generator. The MCP introspection code is
the shared core; AgentFacts rolls up what ToolFacts itemizes.

## Acceptance criteria (when implemented)

- Pointed at ForgeTrail's MCP server: tool count and names match `tools/list` with no LLM.
- Deterministic draft mode (no `--model`) marks judgment fields `# TODO: verify`.
- Emitted files pass `pnpm validate` in [`../validator`](../validator).

## Usage sketch (target API)

```bash
cd generator
pnpm install

# deterministic draft from a running / launchable MCP server
pnpm generate --command "node path/to/server.js" --output TOOL_FACTS.md

# optional LLM classification for side_effects
pnpm generate --command "…" --provider ollama --model llama3.1
```

Exact flags are open until the first implementation lands.
