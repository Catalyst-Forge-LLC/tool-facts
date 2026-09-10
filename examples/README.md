# ToolFacts exemplars

Curated `TOOL_FACTS.md` files that teach the format by contrast. YAML frontmatter
is the source of truth; validate with the CLI in `../validator`.

## Teaching ladder

| Slug | Worst side effect | Network | Teaches |
|---|---|---|---|
| [forgetrail-mcp](./forgetrail-mcp/TOOL_FACTS.md) | read | none | Dogfood / guidance MCP. `runAudit` returns a prompt. Worst `read` is `validateTracking`. |
| [filesystem-mcp](./filesystem-mcp/TOOL_FACTS.md) | write | none | Scoped disk mutation |
| [github-mcp](./github-mcp/TOOL_FACTS.md) | destructive | allowlist | Credentials + remote API |
| [fetch-mcp](./fetch-mcp/TOOL_FACTS.md) | read | unrestricted | Open-world HTTP |
| [shell-mcp](./shell-mcp/TOOL_FACTS.md) | destructive | unrestricted | Process spawn worst case |

## Shelf dogfood

v0.1 labels **MCP servers**. The [Catalyst Forge tools shelf](https://catalystforge.com/tools/)
has many products. Only three expose MCP, so only three have ToolFacts. The rest
are CLIs, skills, userscripts, or sites: AppFacts for the body, SkillFacts for
the playbook.

| Product | MCP | Label | Worst side effect |
|---|---|---|---|
| [ForgeTrail](./forgetrail-mcp/TOOL_FACTS.md) | `forgetrail-mcp` | yes | read |
| [ollanet](./ollanet-mcp/TOOL_FACTS.md) | `ollanet mcp` | yes | destructive |
| [DictaWhisper](./dictawhisper-mcp/TOOL_FACTS.md) | `dictawhisper` MCP | yes | read |
| Smell Check, Detangler, Misemphasis, Cold-eye, TemperPass, EmberDossier, Gap Last, DocuPuncture | none | SkillFacts | — |
| FilePress, IngotVault, Finetuna, HaulOut, LocalSlip, LocalHelm, gui4cli, ForeBalance, xFacts hub | none | AppFacts (where shipped) | — |

Permission contrast, not a policy: `forgetrail-mcp` and `fetch-mcp` both list
worst `read`. ForgeTrail's `read` is a scoped local tracking-file check with no
network. Fetch is unrestricted HTTP with undisclosed destinations.
`filesystem-mcp` is a local `write` with no network. Same side-effect class is
not the same review question. None of these files authorize auto-approval.

Labels are bound to the listed server version and `generated.date`. This catalog
does not watch live servers. A `tools/list` comparison can show added, removed,
or renamed tools. It cannot prove that a same-named tool still matches the label.

Machine index: [`index.json`](./index.json). Template: [`TOOL_FACTS.template.md`](./TOOL_FACTS.template.md).

The flat file [`TOOL_FACTS.md`](./TOOL_FACTS.md) remains the ForgeTrail dogfood copy
for older links; prefer the slug path for new references.
