# ToolFacts exemplars

Curated `TOOL_FACTS.md` files that teach the format by contrast. YAML frontmatter
is the source of truth; validate with the CLI in `../validator`.

| Slug | Worst side effect | Network | Teaches |
|---|---|---|---|
| [forgekit-mcp](./forgekit-mcp/TOOL_FACTS.md) | read | none | Dogfood / guidance MCP |
| [filesystem-mcp](./filesystem-mcp/TOOL_FACTS.md) | write | none | Scoped disk mutation |
| [github-mcp](./github-mcp/TOOL_FACTS.md) | destructive | allowlist | Credentials + remote API |
| [fetch-mcp](./fetch-mcp/TOOL_FACTS.md) | read | unrestricted | Open-world HTTP |
| [shell-mcp](./shell-mcp/TOOL_FACTS.md) | destructive | unrestricted | Process spawn worst case |

Machine index: [`index.json`](./index.json). Template: [`TOOL_FACTS.template.md`](./TOOL_FACTS.template.md).

The flat file [`TOOL_FACTS.md`](./TOOL_FACTS.md) remains the ForgeKit dogfood copy
for older links; prefer the slug path for new references.
