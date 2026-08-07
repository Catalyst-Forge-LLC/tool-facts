---
tool_facts_version: "0.1.0"
name: Shell MCP Server
developer: Catalyst Forge (illustrative)
version: "0.1.0"
status: preview
license: Apache-2.0
kind: mcp-server
runtime:
  execution: local-process
  transport: stdio
credentials:
  required: []
egress:
  telemetry: none
  destinations: [undisclosed]
tools:
  - name: run_command
    purpose: Execute a shell command in a working directory and return stdout/stderr
    side_effects: destructive
    reach:
      filesystem: read-write
      network: unrestricted
      processes: true
    idempotent: false
  - name: run_script
    purpose: Write a temporary script and execute it with a shell interpreter
    side_effects: destructive
    reach:
      filesystem: read-write
      network: unrestricted
      processes: true
    idempotent: false
generated:
  date: 2026-08-07
  generator: hand-authored
credits:
  generated_with: https://toolfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Tool Facts - Shell MCP Server

| | |
|---|---|
| **Developer** | Catalyst Forge (illustrative) |
| **Version** | 0.1.0 |
| **Status** | preview |
| **License** | Apache-2.0 |
| **Kind** | mcp-server |

*Illustrative worst-case toolbelt: arbitrary process spawn implies filesystem
mutation and open network unless the host sandboxes harder than this label
assumes. Prefer the harsher `side_effects` value when unsure.*

## Runtime

| | |
|---|---|
| Execution | local-process |
| Transport | stdio |

## Credentials

None required at the server boundary (commands may still consume ambient credentials).

## Egress

| | |
|---|---|
| Telemetry | none |
| Destinations | undisclosed (command-dependent) |

## Tools

| Tool | Side effects | Filesystem | Network | Processes | Idempotent |
|---|---|---|---|---|---|
| run_command | destructive | read-write | unrestricted | yes | no |
| run_script | destructive | read-write | unrestricted | yes | no |

Policy sketch: never auto-approve. Always prompt. Prefer not attaching this
toolset to unsupervised agents.

---
*Generated with [ToolFacts](https://toolfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
