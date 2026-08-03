# ToolFacts Specification - v0.1.0

> *"Know what it touches before your agent picks it up."*

ToolFacts is a "Nutrition Facts" label for toolsets - the sibling standard to
[AppFacts](https://appfacts.dev) and [ModelFacts](https://modelfacts.dev). AppFacts
labels the **body** of software; ModelFacts labels the **brain**; ToolFacts labels
the **toolbelt**: what each instrument does when invoked, what it can reach, and
what leaves the machine.

In v0.1 a toolset is concretely an **MCP server**. One `TOOL_FACTS.md` per server,
not per tool. A tool removed or a side effect changed is a new file version.

## Boundary with AgentFacts

**AgentFacts labels the actor; ToolFacts labels the instrument.**

- Facts about what a tool *does when invoked* (side effects, reach, idempotency)
  belong here.
- Facts about what an agent is *configured or permitted to do* (model binding,
  autonomy, approval policy, memory) belong in AgentFacts.
- `AGENT_FACTS.md` references `TOOL_FACTS.md` files (by URL or path) the same way it
  references `MODEL_FACTS.md`. AgentFacts `tools` / `reach` groups are the rollup;
  ToolFacts is the itemized detail.

## File

A file named `TOOL_FACTS.md`, placed at the root of a toolset repository (or next to
the MCP server package), alongside `README.md`. An agent configuration may also link
to the server's canonical copy.

## The Golden Rule

If a piece of information is **subjective** (*"powerful search tool"*), it does
**not** belong in ToolFacts. If it is **objective** (*"reads files under the
workspace root, no network access"*), it does. When an objective fact is not
publicly disclosed, say so explicitly (`undisclosed`) rather than guessing.

## Structure

The file has two parts:

1. **YAML frontmatter** - the **sole source of truth**. Structured, validated,
   machine-parseable.
2. **Markdown body** - a **rendered view** of the frontmatter for humans
   (nutrition-label style).

Hand edits to the body are fine for local readability, but the body **MAY drift** from
the frontmatter if either side is edited by hand. Tooling does **not** verify
body-vs-frontmatter consistency; regenerating the body from the frontmatter is how you
resync.

## Required frontmatter fields

| Field | Type | Description |
|---|---|---|
| `tool_facts_version` | string | Spec version this *file* conforms to, e.g. `"0.1.0"` |
| `name` | string | Official toolset / server name |
| `developer` | string | Organization (or person) that ships the server |
| `version` | string | Server version as distributed, e.g. `"0.3.0"` |
| `status` | enum | One of: `active`, `deprecated`, `preview`, `archived` |
| `license` | string | SPDX identifier or the license's official name, or `"UNKNOWN"` |
| `kind` | enum | v0.1: `mcp-server` only |
| `runtime` | object | How the server runs - see below |
| `credentials` | object | Secrets required before the server works - see below |
| `egress` | object | What leaves the machine - see below |
| `tools` | array | Per-tool facts - see below (at least one entry) |
| `generated` | object | `date`, `generator` |

### `runtime` (handling instructions)

| Key | Type | Required | Values / description |
|---|---|---|---|
| `execution` | enum | ✅ | `local-process`, `container`, `remote-service` |
| `transport` | enum | ✅ | `stdio`, `sse`, `streamable-http` |

### `credentials` (keys required)

| Key | Type | Required | Description |
|---|---|---|---|
| `required` | string list | ✅ | Env var / secret names the server needs, e.g. `[GITHUB_TOKEN]`. Empty list when none. |

### `egress` (outbound label)

| Key | Type | Required | Values / description |
|---|---|---|---|
| `telemetry` | enum | ✅ | `none`, `anonymous`, `identified`, `undisclosed` |
| `destinations` | string list | ✅ | Hosts data is sent to. Empty when none. Use `["undisclosed"]` when destinations exist but are not named. |

### `tools[]` (itemized contents)

One object per tool the server exposes. Order SHOULD match `tools/list` when known.

| Key | Type | Required | Values / description |
|---|---|---|---|
| `name` | string | ✅ | Tool name as advertised to the host |
| `purpose` | string | ✅ | One-line objective description of what the tool does |
| `side_effects` | enum | ✅ | `none`, `read`, `write`, `destructive` - the load-bearing enum |
| `reach` | object | ✅ | What the tool can touch - see below |
| `idempotent` | boolean | ✅ | Whether repeating the call with the same args is safe / equivalent |

#### `tools[].reach`

| Key | Type | Required | Values / description |
|---|---|---|---|
| `filesystem` | enum | ✅ | `none`, `read`, `read-write`, `scoped` |
| `network` | enum | ✅ | `none`, `allowlist`, `unrestricted` |
| `processes` | boolean | ✅ | Whether the tool spawns processes or a shell |

**`side_effects` guidance (keep it brutal):**

| Value | Means |
|---|---|
| `none` | Pure computation or returns static content; no external read or mutation |
| `read` | Observes state (files, APIs, registries) without changing it |
| `write` | Creates or mutates state; reversible or additive in normal use |
| `destructive` | Deletes, overwrites irrecoverably, or otherwise harms state if misused |

Do not add a fifth value before v1.0. Prefer the harsher label when unsure, and mark
the file for human review before publishing.

## Optional fields

| Field | Type | Description |
|---|---|---|
| `homepage` | string (URL) | |
| `repository` | string (URL) | Code / package repo |
| `credits.generated_with` | string (URL) | e.g. `"https://toolfacts.dev"` |
| `credits.built_by` | string | Author name + link |

## Policy integration (why this label has teeth)

A harness or host **MAY** read `TOOL_FACTS.md` and set approval policy mechanically:

- auto-approve tools with `side_effects: none` or `read` when `idempotent: true`
- gate `write`
- always prompt on `destructive`

MCP tool annotations (`readOnlyHint`, `destructiveHint`, `idempotentHint`,
`openWorldHint`) are optional, usually unset, and explicitly untrusted. ToolFacts
formalizes the same ideas in a file that can be validated, diffed, and
human-reviewed. Generators MAY read annotations when present and MUST mark them as
self-reported.

## Conventions

- **Objective facts only** (the Golden Rule). Marketing language belongs in the README.
- **`undisclosed` over omission** for facts the developer knowingly withholds - 
  especially egress destinations. An MCP server that will not say which hosts it
  calls home to is a louder signal than any marketing page.
- Closed enums for judgment fields so files are comparable across toolsets.
- One `TOOL_FACTS.md` per toolset *version*. Material tool or side-effect changes
  mean a new file.
- Keep the body short enough to skim in under a minute: which tools write or destroy,
  what they can reach, what credentials the server needs, and what leaves the machine.
- **Canonical schema URL** (matches the schema `$id`):
  [`https://toolfacts.dev/schema/tool-facts.schema.json`](https://toolfacts.dev/schema/tool-facts.schema.json)
  Source in this repo: [`site/schema/tool-facts.schema.json`](./site/schema/tool-facts.schema.json).

## Versioning

- **This document:** v0.1.0.
- **Files** declare `tool_facts_version` (currently `"0.1.0"`) so tooling can evolve
  independently of the prose document.
- Required-field list may still change before v1.0.
- Non-MCP kinds (`ide-plugin`, `api-toolkit`) are reserved for a later minor version;
  v0.1 ships `mcp-server` only.

## Revision history

| Spec doc | Notes |
|---|---|
| **0.1.0** | Initial specification, formalizing [`GENESIS.md`](./GENESIS.md): frontmatter + rendered body, server-level groups (identity, runtime, credentials, egress) plus per-tool `side_effects` / `reach` / `idempotent`, closed enums, `undisclosed` convention, policy-integration intent. |

## License

CC0 - public domain. No attribution required.
