---
tool_facts_version: "0.1.0"
name: Filesystem MCP Server
developer: Model Context Protocol (illustrative)
version: "0.2.0"
status: active
license: MIT
kind: mcp-server
homepage: https://modelcontextprotocol.io/
repository: https://github.com/modelcontextprotocol/servers
runtime:
  execution: local-process
  transport: stdio
credentials:
  required: []
egress:
  telemetry: none
  destinations: []
tools:
  - name: read_file
    purpose: Read file contents within an allowed directory root
    side_effects: read
    reach:
      filesystem: scoped
      network: none
      processes: false
    idempotent: true
  - name: list_directory
    purpose: List entries in a directory under the allowed root
    side_effects: read
    reach:
      filesystem: scoped
      network: none
      processes: false
    idempotent: true
  - name: write_file
    purpose: Create or overwrite a file under the allowed root
    side_effects: write
    reach:
      filesystem: read-write
      network: none
      processes: false
    idempotent: false
  - name: create_directory
    purpose: Create a directory under the allowed root
    side_effects: write
    reach:
      filesystem: read-write
      network: none
      processes: false
    idempotent: true
  - name: move_file
    purpose: Move or rename a path under the allowed root
    side_effects: write
    reach:
      filesystem: read-write
      network: none
      processes: false
    idempotent: false
generated:
  date: 2026-08-07
  generator: hand-authored
credits:
  generated_with: https://toolfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Tool Facts - Filesystem MCP Server

| | |
|---|---|
| **Developer** | Model Context Protocol (illustrative) |
| **Version** | 0.2.0 |
| **Status** | active |
| **License** | MIT |
| **Kind** | mcp-server |

*Illustrative exemplar for the common local filesystem MCP shape. Not a
vendor-signed certificate. Roots are host-configured; this label assumes a
scoped workspace root.*

## Runtime

| | |
|---|---|
| Execution | local-process |
| Transport | stdio |

## Credentials

None required.

## Egress

| | |
|---|---|
| Telemetry | none |
| Destinations | (none) |

## Tools

| Tool | Side effects | Filesystem | Network | Processes | Idempotent |
|---|---|---|---|---|---|
| read_file | read | scoped | none | no | yes |
| list_directory | read | scoped | none | no | yes |
| write_file | write | read-write | none | no | no |
| create_directory | write | read-write | none | no | yes |
| move_file | write | read-write | none | no | no |

After a human reviews this label, a host might gate every `write` and treat the
reads as scoped local disk only. That is an example, not a universal
auto-approval rule. This illustrative toolset has no network and no process
spawn. Read-only is not the same as universally safe.

---
*Generated with [ToolFacts](https://toolfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
