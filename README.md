<h1 align="center">ToolFacts</h1>

<p align="center">
  <strong>A "Nutrition Facts" label for MCP servers and toolsets.</strong>
</p>

<p align="center">
  A tiny, standardized <code>TOOL_FACTS.md</code> that answers one question in under a
  minute: <em>what does this instrument touch when invoked?</em>
</p>

<p align="center">
  <a href="https://toolfacts.dev">toolfacts.dev</a> ·
  <a href="./SPEC.md">Spec</a> ·
  <a href="https://toolfacts.dev/schema/tool-facts.schema.json">Schema</a> ·
  <a href="./examples/">Examples</a> ·
  <a href="https://toolfacts.dev/llms.txt">llms.txt</a>
</p>

---

## What is this?

[AppFacts](https://appfacts.dev) labels the **body** of software. [ModelFacts](https://modelfacts.dev)
labels the **brain**. **ToolFacts** labels the **toolbelt**: per-tool side effects, reach,
credentials, and egress for an MCP server, in a format you can validate, parse, and
(optionally) feed into approval policy.

MCP already defines optional tool annotations (`readOnlyHint`, `destructiveHint`,
`idempotentHint`, `openWorldHint`). Almost no server sets them, they are explicitly
untrusted, and nothing verifies them. ToolFacts formalizes the same ideas in a file that
can be CI-checked and human-reviewed.

**The Golden Rule:** if a piece of information is *subjective* ("powerful search tool"),
it does not belong in ToolFacts. If it is *objective* ("reads files under the workspace
root, no network access"), it does. When a fact isn't public, the file says `undisclosed`.

**Boundary:** [AgentFacts](https://agentfacts.dev) labels the *actor* (what the agent may
do and on what leash). ToolFacts labels the *instrument* (what each tool does when
called). AgentFacts rolls up; ToolFacts itemizes.

Useful for:

- **Hosts and harnesses** that want a mechanical approval surface for MCP tools
- **Teams reviewing** which servers can write disk, open the network, or spawn processes
- **Agent builders** composing `TOOL_FACTS.md` into `AGENT_FACTS.md`
- **CI** that rejects unlabeled or schema-invalid toolsets

## Exemplars

| Slug | Worst side effect | Network | Notes |
|---|---|---|---|
| [forgekit-mcp](./examples/forgekit-mcp/TOOL_FACTS.md) | read | none | Dogfood |
| [filesystem-mcp](./examples/filesystem-mcp/TOOL_FACTS.md) | write | none | Scoped disk |
| [github-mcp](./examples/github-mcp/TOOL_FACTS.md) | destructive | allowlist | Credentials |
| [fetch-mcp](./examples/fetch-mcp/TOOL_FACTS.md) | read | unrestricted | Open-world HTTP |
| [shell-mcp](./examples/shell-mcp/TOOL_FACTS.md) | destructive | unrestricted | Process spawn |

Catalog JSON: [`examples/index.json`](./examples/index.json) (also served at
`/examples/index.json`). Template: [`examples/TOOL_FACTS.template.md`](./examples/TOOL_FACTS.template.md).

## What it looks like

Every `TOOL_FACTS.md` has two halves. The **YAML frontmatter is the source of truth** -
structured and validatable. The **Markdown body is a rendered label** for humans.

See the [ForgeKit worked example](./examples/forgekit-mcp/TOOL_FACTS.md) and the
[specification](./SPEC.md). Fact groups:

| Group | The label's… | Answers |
|---|---|---|
| identity | Product name | What server, what version, who ships it? |
| `runtime` | Handling | Local process, container, or remote? Which transport? |
| `credentials` | Keys | What secrets does it need before it works? |
| `egress` | Outbound | Telemetry and destinations that leave the machine. |
| `tools[]` | Contents | Per tool: purpose, side effects, reach, idempotency. |

`side_effects` is the load-bearing enum: `none | read | write | destructive`.

## Validating a file

```bash
cd validator
pnpm install
pnpm validate ../examples/forgekit-mcp/TOOL_FACTS.md
pnpm validate ../examples/*/TOOL_FACTS.md
```

Schema: [`site/schema/tool-facts.schema.json`](./site/schema/tool-facts.schema.json).

## Generating a label

The generator is planned, not shipped yet. Plan: MCP handshake (`tools/list`) first;
optional LLM classification only for `side_effects`, sanitized against the schema. See
[`generator/README.md`](./generator/README.md).

## Roadmap

- [x] Spec v0.1.0, canonical JSON Schema, template
- [x] Schema validator CLI (TypeScript)
- [x] Multi-type exemplar ladder + `/examples/index.json` + `llms.txt`
- [ ] Generator: MCP introspection + schema heuristics + optional LLM classification
- [ ] Directory of labeled public MCP servers (shared crawl with AgentFacts)
- [ ] Policy-integration demo (harness reading `TOOL_FACTS.md` for approvals)
- [ ] Badge / portable label, following AppFacts

## Website

Static site in [`site/`](./site/). Cloudflare Pages root = `site`, no build.

| Path | Purpose |
|---|---|
| [`site/index.html`](./site/index.html) | Marketing / docs landing |
| [`site/schema/tool-facts.schema.json`](./site/schema/tool-facts.schema.json) | Canonical JSON Schema |
| [`site/examples/`](./site/examples/) | Fetchable exemplar catalog |
| [`site/llms.txt`](./site/llms.txt) | Agent entrypoint |

Session plan: [`specs/REVIEW-AND-PLAN.md`](./specs/REVIEW-AND-PLAN.md).

## Family

Part of [xFacts](https://xfacts.dev): [AppFacts](https://appfacts.dev) ·
[ModelFacts](https://modelfacts.dev) · [AgentFacts](https://agentfacts.dev) ·
[SkillFacts](https://skillfacts.dev) · ToolFacts.

## License

- **Spec & schema:** [CC0](https://creativecommons.org/publicdomain/zero/1.0/)
- **Tooling (validator):** MIT

---

<p align="center">
  <em>"Know what it touches before your agent picks it up."</em>
</p>
