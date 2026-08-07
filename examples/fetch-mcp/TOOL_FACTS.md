---
tool_facts_version: "0.1.0"
name: Fetch MCP Server
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
  destinations: [undisclosed]
tools:
  - name: fetch
    purpose: HTTP GET a URL and return response body text for the model
    side_effects: read
    reach:
      filesystem: none
      network: unrestricted
      processes: false
    idempotent: true
generated:
  date: 2026-08-07
  generator: hand-authored
credits:
  generated_with: https://toolfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Tool Facts - Fetch MCP Server

| | |
|---|---|
| **Developer** | Model Context Protocol (illustrative) |
| **Version** | 0.2.0 |
| **Status** | active |
| **License** | MIT |
| **Kind** | mcp-server |

*Illustrative open-world fetch toolset. Destinations are caller-chosen, so
egress lists `undisclosed` rather than pretending there is a fixed host list.*

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
| Destinations | undisclosed (any URL the caller requests) |

## Tools

| Tool | Side effects | Filesystem | Network | Processes | Idempotent |
|---|---|---|---|---|---|
| fetch | read | none | unrestricted | no | yes |

Policy sketch: treat unrestricted network as gated even when `side_effects` is
`read` - data exfiltration and SSRF risk live in the URL argument, not in a
filesystem write.

---
*Generated with [ToolFacts](https://toolfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
