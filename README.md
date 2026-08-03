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
  <a href="./examples/TOOL_FACTS.md">Example</a>
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

## What it looks like

Every `TOOL_FACTS.md` has two halves. The **YAML frontmatter is the source of truth** - 
structured and validatable. The **Markdown body is a rendered label** for humans.

```markdown
---
tool_facts_version: "0.1.0"
name: ForgeKit MCP Server
developer: Catalyst Forge
version: 0.3.0
status: active
license: Apache-2.0
kind: mcp-server
runtime:
  execution: local-process
  transport: stdio
credentials:
  required: []
egress:
  telemetry: none
  destinations: []
tools:
  - name: runAudit
    purpose: Audit a workspace against the current phase checklist
    side_effects: read
    reach:
      filesystem: scoped
      network: none
      processes: false
    idempotent: true
generated:
  date: 2026-08-03
  generator: hand-authored
---

# Tool Facts - ForgeKit MCP Server

| Tool | Side effects | Filesystem | …
|---|---|---|---|
| runAudit | read | scoped | …
```

See the [full worked example](./examples/TOOL_FACTS.md), the
[template](./examples/TOOL_FACTS.template.md), and the [specification](./SPEC.md).
Fact groups:

| Group | The label's… | Answers |
|---|---|---|
| identity | Product name | What server, what version, who ships it? |
| `runtime` | Handling | Local process, container, or remote? Which transport? |
| `credentials` | Keys | What secrets does it need before it works? |
| `egress` | Outbound | Telemetry and destinations that leave the machine. |
| `tools[]` | Contents | Per tool: purpose, side effects, reach, idempotency. |

`side_effects` is the load-bearing enum: `none | read | write | destructive`.

## Validating a file

The frontmatter conforms to [`site/schema/tool-facts.schema.json`](./site/schema/tool-facts.schema.json)
(served at [toolfacts.dev/schema/tool-facts.schema.json](https://toolfacts.dev/schema/tool-facts.schema.json)) - 
any draft-07 validator works. This repo ships a small TypeScript CLI:

```bash
cd validator
pnpm install

# exit code 1 on any failure - CI-friendly
pnpm validate ../examples/TOOL_FACTS.md
pnpm validate path/to/your/TOOL_FACTS.md
```

## Generating a label

The generator is planned, not shipped yet. Plan: MCP handshake (`tools/list`) first for
names, descriptions, and schemas; package metadata next; optional LLM classification only
for `side_effects` judgment, sanitized against the schema. See
[`generator/README.md`](./generator/README.md).

Until then, copy [`examples/TOOL_FACTS.template.md`](./examples/TOOL_FACTS.template.md)
and fill it by hand.

## Roadmap

- [x] Spec v0.1.0, canonical JSON Schema, worked example + template
- [x] Schema validator CLI (TypeScript)
- [ ] Generator: MCP introspection + schema heuristics + optional LLM classification
- [ ] Directory of labeled public MCP servers (shared crawl with AgentFacts)
- [ ] Policy-integration demo (harness reading `TOOL_FACTS.md` for approvals)
- [ ] Badge / portable label, following AppFacts

## Website

The static site for [toolfacts.dev](https://toolfacts.dev) lives in [`site/`](./site/).
On Cloudflare Pages, set the project root to `site` - no build step. Local preview:
`npx serve site -p 3003` (or Live Preview on the folder).

| Path | Purpose |
|---|---|
| [`site/index.html`](./site/index.html) | Marketing / docs landing |
| [`site/schema/tool-facts.schema.json`](./site/schema/tool-facts.schema.json) | Canonical JSON Schema |

## Family

Part of [xFacts](https://xfacts.dev): [AppFacts](https://appfacts.dev) ·
[ModelFacts](https://modelfacts.dev) · [AgentFacts](https://agentfacts.dev) · ToolFacts.

## Contributing

This is **v0.1.0** - the spec's required fields may still shift before v1.0. Issues and
proposals on enums, reach vocabulary, and policy conventions are welcome.

## License

- **Spec & schema:** [CC0](https://creativecommons.org/publicdomain/zero/1.0/) (public domain) - adopt them freely, no attribution needed.
- **Tooling (validator):** MIT.

---

<p align="center">
  Part of <a href="https://toolfacts.dev">toolfacts.dev</a> · Family at <a href="https://xfacts.dev">xfacts.dev</a>
</p>

<p align="center">
  <em>"Know what it touches before your agent picks it up."</em>
</p>
