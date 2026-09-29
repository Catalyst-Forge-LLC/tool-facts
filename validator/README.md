# ToolFacts validator

A tiny CLI that checks the YAML frontmatter of a `TOOL_FACTS.md` file against the
canonical JSON Schema ([`site/schema/tool-facts.schema.json`](../site/schema/tool-facts.schema.json),
served at [toolfacts.dev/schema/tool-facts.schema.json](https://toolfacts.dev/schema/tool-facts.schema.json)).

The command is `toolfacts validate <file>` from `@xfacts/toolfacts` (Node 22.18 or newer). In this repository, `pnpm validate` runs the same program.

## Usage

```bash
cd validator
pnpm install

# validate one or more files (exit code 1 on any failure - CI-friendly)
pnpm validate ../examples/TOOL_FACTS.md
pnpm validate ../examples/TOOL_FACTS.template.md
pnpm validate path/to/your/TOOL_FACTS.md
```

TypeScript, ESM. The published command is compiled JavaScript. Uses [ajv](https://ajv.js.org/) (draft-07) with
`ajv-formats` and [yaml](https://eemeli.org/yaml/).
