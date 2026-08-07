# ToolFacts compact viewer payload — `tf1`

Companion to [`SPEC.md`](./SPEC.md). Portable `/v` fragment for QR codes and
shareable exemplar links. Codec matches AppFacts `af1` (zlib + base64url).

## URL shape

```
https://toolfacts.dev/v#tf1.<payload>
https://toolfacts.dev/v?face=raw#tf1.<payload>
```

## Encode / decode

Identical pipeline to AppFacts [`SPEC-af1.md`](../app-facts/SPEC-af1.md): JSON →
zlib deflate → base64url (no padding) → prefix `tf1.`.

Decoders MUST reject unknown `tfN.` prefixes with an update message.

## Compact JSON (`tf1`)

| Key | Source | Required |
|---|---|---|
| `v` | payload version | yes (`1`) |
| `name`, `developer`, `version`, `status`, `license`, `kind` | identity | yes |
| `runtime` | `{execution, transport}` | yes |
| `credentials` | `{required: string[]}` | yes |
| `egress` | `{telemetry, destinations}` | yes |
| `tools` | array of tool objects | yes (≥1 unless truncated empty — avoid) |
| `homepage`, `repository` | URLs | no |
| `raw` | full Markdown | no |
| `truncated` | boolean | no |

### `tools[]` items

Prefer full keys when budget allows; short keys also accepted by the viewer:

| Full | Short | Source |
|---|---|---|
| `name` | `n` | tool name |
| `purpose` | `p` | purpose |
| `side_effects` | `se` | enum |
| `reach` | `r` | `{filesystem\|fs, network\|net, processes\|proc}` |
| `idempotent` | `idemp` | boolean |

## Shrinkage (URL ≤ 1600)

1. Drop `homepage` / `repository`.
2. Drop per-tool `purpose` / `p`.
3. Drop `raw` if present.
4. Keep every `destructive` and `write` tool; fill remaining slots up to 12 tools.
5. Set `truncated: true` when anything material was dropped.

## License

CC0 — public domain. No attribution required.
