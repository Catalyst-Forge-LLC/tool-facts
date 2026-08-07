---
tool_facts_version: "0.1.0"
name: ForgeKit MCP Server
developer: Catalyst Forge
version: 0.3.0
status: active
license: Apache-2.0
kind: mcp-server
homepage: https://www.catalystforge.com/
repository: https://github.com/Catalyst-Forge-LLC/forgekit
runtime:
  execution: local-process
  transport: stdio
credentials:
  required: []
egress:
  telemetry: none
  destinations: []
tools:
  - name: ping
    purpose: Health check; returns a fixed ok payload
    side_effects: none
    reach:
      filesystem: none
      network: none
      processes: false
    idempotent: true
  - name: getPhaseGuidance
    purpose: Return phase guidance text for the current ForgeKit workflow stage
    side_effects: none
    reach:
      filesystem: none
      network: none
      processes: false
    idempotent: true
  - name: getTemplate
    purpose: Return a named ForgeKit template document by id
    side_effects: none
    reach:
      filesystem: none
      network: none
      processes: false
    idempotent: true
  - name: searchLessons
    purpose: Search the ForgeKit lessons corpus by query string
    side_effects: none
    reach:
      filesystem: none
      network: none
      processes: false
    idempotent: true
  - name: getChecklist
    purpose: Return a milestone checklist section or the full checklist
    side_effects: none
    reach:
      filesystem: none
      network: none
      processes: false
    idempotent: true
  - name: runAudit
    purpose: Audit a workspace against the current phase checklist
    side_effects: read
    reach:
      filesystem: scoped
      network: none
      processes: false
    idempotent: true
  - name: validateTracking
    purpose: Validate .forgekit/workflow_tracking.json against the tracking schema
    side_effects: read
    reach:
      filesystem: scoped
      network: none
      processes: false
    idempotent: true
  - name: ingestPlanArtifact
    purpose: Parse a plan artifact and return a draft PHASE_1_BRIEF.md body
    side_effects: none
    reach:
      filesystem: none
      network: none
      processes: false
    idempotent: true
generated:
  date: 2026-08-03
  generator: hand-authored
credits:
  generated_with: https://toolfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Tool Facts - ForgeKit MCP Server

| | |
|---|---|
| **Developer** | Catalyst Forge |
| **Version** | 0.3.0 |
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

## Tools (representative subset)

The live ForgeKit MCP server exposes **29 tools**. This label lists **8** representative
tools so the shape is clear; regenerate from `tools/list` for a complete inventory.

| Tool | Side effects | Filesystem | Network | Processes | Idempotent |
|---|---|---|---|---|---|
| ping | none | none | none | no | yes |
| getPhaseGuidance | none | none | none | no | yes |
| getTemplate | none | none | none | no | yes |
| searchLessons | none | none | none | no | yes |
| getChecklist | none | none | none | no | yes |
| runAudit | read | scoped | none | no | yes |
| validateTracking | read | scoped | none | no | yes |
| ingestPlanArtifact | none | none | none | no | yes |

**Purpose lines**

| Tool | Purpose |
|---|---|
| ping | Health check; returns a fixed ok payload |
| getPhaseGuidance | Return phase guidance text for the current ForgeKit workflow stage |
| getTemplate | Return a named ForgeKit template document by id |
| searchLessons | Search the ForgeKit lessons corpus by query string |
| getChecklist | Return a milestone checklist section or the full checklist |
| runAudit | Audit a workspace against the current phase checklist |
| validateTracking | Validate `.forgekit/workflow_tracking.json` against the tracking schema |
| ingestPlanArtifact | Parse a plan artifact and return a draft `PHASE_1_BRIEF.md` body |

Policy sketch: every listed tool is `none` or `read` and idempotent. A host could
auto-approve this subset; still gate any future `write` / `destructive` tools.

---
*Generated with [ToolFacts](https://toolfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
