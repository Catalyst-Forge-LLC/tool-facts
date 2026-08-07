---
tool_facts_version: "0.1.0"
name: GitHub MCP Server
developer: GitHub (illustrative)
version: "0.4.0"
status: active
license: MIT
kind: mcp-server
homepage: https://github.com/github/github-mcp-server
repository: https://github.com/github/github-mcp-server
runtime:
  execution: local-process
  transport: stdio
credentials:
  required: [GITHUB_TOKEN]
egress:
  telemetry: undisclosed
  destinations: [api.github.com]
tools:
  - name: get_file_contents
    purpose: Fetch file contents from a GitHub repository via the API
    side_effects: read
    reach:
      filesystem: none
      network: allowlist
      processes: false
    idempotent: true
  - name: list_issues
    purpose: List issues for a repository
    side_effects: read
    reach:
      filesystem: none
      network: allowlist
      processes: false
    idempotent: true
  - name: create_issue
    purpose: Create a new issue in a repository
    side_effects: write
    reach:
      filesystem: none
      network: allowlist
      processes: false
    idempotent: false
  - name: create_or_update_file
    purpose: Create or update a file via the GitHub contents API
    side_effects: write
    reach:
      filesystem: none
      network: allowlist
      processes: false
    idempotent: false
  - name: merge_pull_request
    purpose: Merge an open pull request
    side_effects: destructive
    reach:
      filesystem: none
      network: allowlist
      processes: false
    idempotent: false
generated:
  date: 2026-08-07
  generator: hand-authored
credits:
  generated_with: https://toolfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Tool Facts - GitHub MCP Server

| | |
|---|---|
| **Developer** | GitHub (illustrative) |
| **Version** | 0.4.0 |
| **Status** | active |
| **License** | MIT |
| **Kind** | mcp-server |

*Illustrative exemplar for a credentialed, allowlisted remote API toolset.
Tool names are representative; regenerate from a live `tools/list` before
production policy use.*

## Runtime

| | |
|---|---|
| Execution | local-process |
| Transport | stdio |

## Credentials

`GITHUB_TOKEN` required.

## Egress

| | |
|---|---|
| Telemetry | undisclosed |
| Destinations | api.github.com |

## Tools

| Tool | Side effects | Filesystem | Network | Processes | Idempotent |
|---|---|---|---|---|---|
| get_file_contents | read | none | allowlist | no | yes |
| list_issues | read | none | allowlist | no | yes |
| create_issue | write | none | allowlist | no | no |
| create_or_update_file | write | none | allowlist | no | no |
| merge_pull_request | destructive | none | allowlist | no | no |

Policy sketch: auto-approve reads; gate writes; always prompt on
`merge_pull_request` and any other destructive tool.

---
*Generated with [ToolFacts](https://toolfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
