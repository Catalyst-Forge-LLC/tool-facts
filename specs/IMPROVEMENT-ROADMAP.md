# ToolFacts — improvement roadmap (from suite value assessment)

> Derived from x-facts
> [`SUITE-VALUE-AND-NETWORK-EFFECTS.md`](../../x-facts/specs/SUITE-VALUE-AND-NETWORK-EFFECTS.md).
> ToolFacts is the **highest-leverage label**: first chance to become plumbing
> (harness approval policy), not just disclosure.

**Status:** planned.  
**Role in the flywheel:** Emit from MCP reality → seed a directory → get **one
host** to gate on `side_effects` / reach. That closes the consumer loop.

---

## Where ToolFacts stands

SPEC/schema/validator, 5-type exemplar ladder, `llms.txt`, `/examples/index.json`,
portable `/v#tf1` with flip/copy, encode-viewer. Generator still plan-only.
No public directory crawl yet. Deploy/remote pending.

## Gaps vs the value thesis

| Gap | Why it matters |
|---|---|
| **No emitter from `tools/list`** | Without generation, authors will not scale. |
| **No harness consumer** | Network effects stay latent. |
| Empty directory | Cold start; `undisclosed` only bites with coverage. |
| Self-report risk | Wrong `none` on destructive tools is worse than silence. |
| Incomplete ForgeKit inventory | Dogfood should list full tool count from live handshake. |

## Improvements (ordered)

### Near-term

1. Deploy toolfacts.dev + GitHub remote; hub status → live when true.
2. Honor suite [discovery/publication contract](../../x-facts/specs/DISCOVERY-AND-PUBLICATION.md):
   document `toolFactsUrl` / README pointer; generator prints **canonical URL** +
   `/v` viewer URL; policy demo **fetches by URL** (not HTML scrape, not `/v` decode).
3. **Generator v0.1:** MCP handshake → names/descriptions/schemas; heuristics for
   reach; LLM only for `side_effects`, sanitized; human-review flag before publish.
4. Regenerate ForgeKit label with **complete** `tools/list` inventory.
5. Policy sketch → **working demo**: small host/harness reads TOOL_FACTS (via URL)
   and auto-approves read+idempotent, gates write, always prompts destructive.
6. Document “unlabeled MCP ⇒ treat as max caution” as a *CF tooling opinion*
   (optional flag), not a suite mandate.

### Mid-term

7. Shared MCP crawl with AgentFacts; seed directory (side effects + egress sort).
8. `capability_basis`-style honesty for annotation-derived fields (“self-reported
   from MCP hints” vs reviewed).
9. QR/badge emission once generator exists (AppFacts pattern).
10. Pitch one host/runtime for integration (open agent stack or CF ForgeKit path).

### Later

11. Verification / measurement of tool claims (paid layer; no “certified” until then).
12. Non-MCP `kind` values only when admission pressure is real (v0.2+).

## Roadmap phases

| Phase | Outcome | Exit |
|---|---|---|
| A | Live + discoverable | Deploy, DNS, footer/hub live |
| B | Emitter | Generator writes valid labels from live MCP |
| C | Load-bearing | One harness uses label for approvals in demo or prod |
| D | Directory | Seeded public catalog; crawl cadence documented |
| E | Integrity | Review workflow + measurement plan; still no certified |

## Non-goals

- Becoming the MCP registry.
- Five-value `side_effects` enum before v1.0.
- Trusting MCP annotations as ground truth.

## Success signals

- A host refuses or gates tools using ToolFacts without scraping HTML.
- Third-party MCP servers ship `TOOL_FACTS.md` next to the server package **and**
  advertise a fetchable label URL on the install surface.
- AgentFacts toolsets point at published ToolFacts URLs by default.

## Related

- [x-facts `DISCOVERY-AND-PUBLICATION.md`](../../x-facts/specs/DISCOVERY-AND-PUBLICATION.md)
- [`REVIEW-AND-PLAN.md`](./REVIEW-AND-PLAN.md), [`PORTABLE-VIEWER.md`](./PORTABLE-VIEWER.md), [`../SPEC-tf1.md`](../SPEC-tf1.md)
- Suite index: [`x-facts/specs/ROADMAPS.md`](../../x-facts/specs/ROADMAPS.md)
