# GENESIS — ToolFacts

> Bootstrap spec for a build session. Read this whole file before writing any code.
> Sibling repos to study first: `app-facts` (the pattern's origin),
> `model-facts` (most recent full execution; its `NOTES.md` strategy
> review applies here), and `agent-facts/GENESIS.md` (the sibling this
> spec must stay cleanly bounded against).

## What this is

ToolFacts (toolfacts.dev — domain owned, registered 2026-07-31) is the fourth label
in the xFacts family:

| Label | Labels the… | Answers |
|---|---|---|
| [AppFacts](https://appfacts.dev) | **Body** | What is this app built from? |
| [ModelFacts](https://modelfacts.dev) | **Brain** | What went into this model? |
| AgentFacts (agentfacts.dev) | **Hands** | What may this actor do, and on what leash? |
| **ToolFacts** | **Toolbelt** | What does this instrument touch when invoked? |
| SkillFacts (skillfacts.dev) | **Playbook** | What will this teach my agent to do? (domain reserved, build later) |

Suite-level strategy lives in the standing vision doc:
`catalyst-forge/docs/xfacts-suite-vision.md`.

A `TOOL_FACTS.md` labels a *toolset* — in v0.1, concretely, an MCP server — with
per-tool facts: what each tool does in one line, whether it reads or writes or
destroys, what it can reach (filesystem, network, processes), whether it's
idempotent, what credentials it needs, and what telemetry leaves the machine.

Working tagline (see Open Decisions): *"Know what it touches before your agent
picks it up."*

## The boundary with AgentFacts (do not blur this)

**AgentFacts labels the actor; ToolFacts labels the instrument.**

- If a fact is about what a tool *does when invoked* — side effects, reach,
  idempotency — it belongs in ToolFacts.
- If a fact is about what an agent is *configured or permitted to do* — model
  binding, autonomy level, approval policy, memory — it belongs in AgentFacts.
- `AGENT_FACTS.md` references `TOOL_FACTS.md` files (by URL or path) the same way it
  references `MODEL_FACTS.md`. Its own `tools`/`reach` groups are the rollup;
  ToolFacts is the itemized detail.

One file per toolset (MCP server), not per tool. A tool removed or a side effect
changed is a new file version.

## Why this label has teeth

1. **The MCP annotations gap.** The MCP spec already defines optional tool
   annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`,
   `openWorldHint`). Almost no server sets them, they're explicitly untrusted hints,
   and nothing verifies them. ToolFacts formalizes exactly what those hints gesture
   at, in a file that can be validated, diffed, and human-reviewed. The generator
   reads them for free when present.
2. **Labels can drive policy, not just documentation.** A harness or host can read
   `TOOL_FACTS.md` and decide approval policy mechanically: auto-approve read-only
   idempotent tools, gate `write`, always prompt on `destructive`. That makes the
   label *load-bearing* — the first xFacts file that software acts on, not just
   reads. Say this on the site; it's the headline feature.
3. **`undisclosed` teeth**, family-standard: an MCP server that won't say which
   hosts it calls home to is a louder signal than any marketing page.

## Family conventions (inherited, non-negotiable)

- One small `TOOL_FACTS.md`. **YAML frontmatter is the sole source of truth**; the
  Markdown body is a rendered nutrition label for humans. Tooling never verifies
  body-vs-frontmatter.
- **The Golden Rule:** objective facts only. "Powerful search tool" is README talk.
  "Reads files under the workspace root, no network access" is a fact.
- **`undisclosed` over omission** for knowingly withheld facts.
- **Closed enums for judgment fields** so files are comparable across toolsets.
- **Licensing:** spec & schema CC0, tooling MIT.
- **Design:** AppFacts design system with a distinct accent (ModelFacts is violet
  `#7c5cf0`; AgentFacts is leaning amber/orange). Suggest teal/green here; final
  pick must sit well on the shared family footer.
- **File format version `"0.1.0"`**, required fields may shift before v1.0.
- Workspace conventions: **pnpm + TypeScript + ESM only**. Commit after substantive
  work. **Never push without the owner's explicit ask.**

## Draft fact taxonomy

Formalize in `SPEC.md`. Server-level groups plus a per-tool array:

| Group | The label's… | Answers |
|---|---|---|
| `identity` | Product name | What server, what version, what transport, who ships it? |
| `runtime` | Handling instructions | How does it run? Local process, container, remote? |
| `credentials` | Keys required | What secrets does it need before it works? |
| `egress` | Outbound label | Telemetry, logging, what leaves the machine, to where. |
| `tools[]` | Itemized contents | Per tool: purpose, side effects, reach, idempotency. |

Frontmatter sketch (starting point — the build session owns the enums):

```yaml
---
tool_facts_version: "0.1.0"
name: ForgeTrail MCP Server
developer: Catalyst Forge
version: 0.3.0
status: active
license: Apache-2.0
kind: mcp-server          # mcp-server | ide-plugin | api-toolkit (v0.1 ships mcp-server only)
runtime:
  execution: local-process   # local-process | container | remote-service
  transport: stdio           # stdio | sse | streamable-http
credentials:
  required: []               # e.g. [GITHUB_TOKEN]
egress:
  telemetry: none            # none | anonymous | identified | undisclosed
  destinations: []           # hosts data is sent to, or undisclosed
tools:
  - name: runAudit
    purpose: Audit a workspace against the current phase checklist
    side_effects: read        # none | read | write | destructive
    reach:
      filesystem: scoped      # none | read | read-write | scoped
      network: none           # none | allowlist | unrestricted
      processes: false        # spawns processes / shell
    idempotent: true
  # …one entry per tool, all 29 for the worked example
generated:
  date: 2026-07-31
  generator: hand-authored
---
```

`side_effects` is the load-bearing enum. Keep it small and brutal: `none | read |
write | destructive`. Resist adding a fifth value before v1.0.

## Generator strategy: the most deterministic in the family

ToolFacts is the most mechanically derivable label yet — build the generator
*before* perfecting prose:

1. **MCP handshake:** connect, `tools/list` — names, descriptions, input schemas are
   deterministic ground truth. Read `annotations` (readOnly/destructive/idempotent
   hints) when present, marked as self-reported.
2. **Schema heuristics:** input schemas often reveal reach mechanically (path
   parameters, URL parameters, command strings).
3. **Package metadata:** name, version, license.
4. **LLM curation last**, local-first via Ollama (same provider set as the
   ModelFacts generator), only for judgment fields (`side_effects` classification
   from tool descriptions), sanitized against enums, and every LLM-classified field
   marked for human review before publishing.

Reuse the ModelFacts generator structure: `generator/src/sources/` adapters, output
self-validates against the schema before writing.

**Sequencing note for the suite:** build this generator before the AgentFacts one.
The MCP introspection code is the shared core; AgentFacts rolls up what ToolFacts
itemizes.

## Launch strategy

1. **Dogfood:** ForgeTrail's MCP server (29 tools) gets the first `TOOL_FACTS.md`,
   generated, then human-reviewed. It doubles as the AgentFacts worked example's
   reference.
2. **One crawl, two directories:** the sweep of popular public MCP servers (official
   registry, top GitHub lists) feeds both toolfacts.dev and agentfacts.dev. The
   ToolFacts directory sorts by side effects and egress — "which of these can
   silently write to disk" is the HN headline.
3. **Policy integration demo:** a tiny example showing a harness reading
   `TOOL_FACTS.md` to auto-set approval policy. This is the feature that makes the
   label a tool instead of paperwork.
4. Badge / portable label later, following the AppFacts `af1` payload pattern.

## Honest headwinds (carry into NOTES.md)

- The MCP official registry could grow richer metadata and absorb the niche.
  Mitigation: CC0 spec, verify-don't-trust posture (we *check* annotations, not
  repeat them), be first with the vocabulary.
- Classifying `side_effects` from descriptions is judgment; a wrong `none` on a
  destructive tool is worse than no label. Human review before publishing anything
  to the directory, and never let the LLM override schema-derived reach facts.
- Server churn: like models, toolsets rot. The generator and re-crawl cadence matter
  more than the spec.

## Repo layout (mirror model-facts)

```
tool-facts/
  GENESIS.md            (this file)
  SPEC.md               formal spec v0.1.0
  README.md             family-style: centered header, tagline, what-is-this
  NOTES.md              maintainer/agent state snapshot, kept current
  examples/             TOOL_FACTS.md (worked: ForgeTrail MCP), TOOL_FACTS.template.md
  validator/            TS ESM CLI, tsx + ajv + yaml, CI-friendly exit codes
  generator/            TS ESM CLI, MCP introspection first; shared core candidate
  site/                 static, Cloudflare Pages root=site, no build step
    schema/tool-facts.schema.json   (canonical, $id = toolfacts.dev URL)
```

GitHub org: `Catalyst-Forge-LLC`, repo `tool-facts` (owner creates and pushes).

## Milestones

1. `SPEC.md` v0.1.0 + canonical JSON Schema + template + worked ForgeTrail example
   (hand-authored, passes validation).
2. Validator CLI.
3. Generator: MCP introspection + schema heuristics + optional LLM classification.
4. Site landing at toolfacts.dev (Cloudflare Pages) + schema served.
5. Directory seed shared with AgentFacts: 50–100 labeled public MCP servers.
6. Policy-integration example + badge. Family footer across all four sites.

## Acceptance criteria

- Worked example and template pass the validator.
- The generator, pointed at ForgeTrail's MCP server, gets tool count and names exactly
  right with no LLM involved.
- A stranger reading a `TOOL_FACTS.md` can answer in under a minute: which of these
  tools can write or destroy, what can they reach, what does the server need from
  me, and what leaves my machine.
- No em dashes, no AI-smell vocabulary on the site or README. Match the family
  register.

## Open decisions

1. **Tagline.** Candidates: "Know what it touches before your agent picks it up." /
   "Every tool says what it turns." / "Read the label before you hand over the
   toolbelt."
2. **Accent color.** Teal/green suggested; must work on the four-site family footer.
3. Whether v0.1 admits non-MCP kinds (`ide-plugin`, `api-toolkit`) or ships
   mcp-server only. Recommendation: mcp-server only; widen at v0.2.
4. Per-tool `cost` / rate-limit facts: useful or scope creep for v0.1?
