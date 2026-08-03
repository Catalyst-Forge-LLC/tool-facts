---
tool_facts_version: "0.1.0"
name: Your MCP Server
developer: Your Org
version: 0.1.0
status: active
license: Apache-2.0
kind: mcp-server
# homepage: https://example.com
# repository: https://github.com/org/server
runtime:
  execution: local-process   # local-process | container | remote-service
  transport: stdio           # stdio | sse | streamable-http
credentials:
  required: []               # e.g. [GITHUB_TOKEN]
egress:
  telemetry: none            # none | anonymous | identified | undisclosed
  destinations: []           # hosts, or [undisclosed]
tools:
  - name: exampleTool
    purpose: One-line objective description of what this tool does
    side_effects: read       # none | read | write | destructive
    reach:
      filesystem: none       # none | read | read-write | scoped
      network: none          # none | allowlist | unrestricted
      processes: false
    idempotent: true
generated:
  date: 2026-08-03
  generator: hand-authored
# credits:
#   generated_with: https://toolfacts.dev
#   built_by: "Your Name - https://example.com"
---

# Tool Facts - Your MCP Server

| | |
|---|---|
| **Developer** | Your Org |
| **Version** | 0.1.0 |
| **Status** | active |
| **License** | Apache-2.0 |
| **Kind** | mcp-server |

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
| exampleTool | read | none | none | no | yes |

---
*Generated with [ToolFacts](https://toolfacts.dev)*
