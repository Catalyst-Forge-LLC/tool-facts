/**
 * Encode exemplar TOOL_FACTS.md files into portable /v#tf1.… URLs.
 * Updates examples/index.json and site/examples/index.json with `viewer` fields.
 *
 *   pnpm encode-viewer
 */
import { deflateSync } from "node:zlib";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const PREFIX = "tf1.";
const ORIGIN = "https://toolfacts.dev";
/** Full absolute URL soft cap (origin + path + hash). */
const MAX = 1600;

function extractFrontmatter(md: string): { fm: Record<string, unknown>; raw: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/.exec(md);
  if (!match) throw new Error("missing frontmatter");
  return { fm: parseYaml(match[1]) as Record<string, unknown>, raw: md };
}

function encode(payload: unknown): string {
  const json = JSON.stringify(payload);
  const compressed = deflateSync(Buffer.from(json, "utf8"), { level: 9 });
  return PREFIX + compressed.toString("base64url");
}

function buildPayload(fm: Record<string, unknown>, opts: { purposes: boolean; urls: boolean; raw?: string; maxTools: number }) {
  const toolsIn = Array.isArray(fm.tools) ? (fm.tools as Record<string, unknown>[]) : [];
  const ranked = [...toolsIn].sort((a, b) => {
    const rank = (se: unknown) =>
      se === "destructive" ? 0 : se === "write" ? 1 : se === "read" ? 2 : 3;
    return rank(a.side_effects) - rank(b.side_effects);
  });
  const tools = ranked.slice(0, opts.maxTools).map((t) => {
    const reach = (t.reach || {}) as Record<string, unknown>;
    const row: Record<string, unknown> = {
      name: t.name,
      side_effects: t.side_effects,
      reach: {
        filesystem: reach.filesystem,
        network: reach.network,
        processes: reach.processes,
      },
      idempotent: t.idempotent,
    };
    if (opts.purposes && t.purpose) row.purpose = t.purpose;
    return row;
  });
  const payload: Record<string, unknown> = {
    v: 1,
    name: fm.name,
    developer: fm.developer,
    version: fm.version,
    status: fm.status,
    license: fm.license,
    kind: fm.kind,
    runtime: fm.runtime,
    credentials: fm.credentials,
    egress: fm.egress,
    tools,
  };
  if (opts.urls) {
    if (fm.homepage) payload.homepage = fm.homepage;
    if (fm.repository) payload.repository = fm.repository;
  }
  if (opts.raw) payload.raw = opts.raw;
  const truncated =
    !opts.purposes ||
    !opts.urls ||
    !opts.raw ||
    tools.length < toolsIn.length;
  if (truncated) payload.truncated = true;
  return payload;
}

function viewerUrlFor(fm: Record<string, unknown>, raw: string): string {
  const attempts = [
    { purposes: true, urls: true, raw, maxTools: 24 },
    { purposes: true, urls: true, maxTools: 24 },
    { purposes: true, urls: false, maxTools: 16 },
    { purposes: false, urls: false, maxTools: 12 },
    { purposes: false, urls: false, maxTools: 8 },
  ] as const;
  let url = "";
  for (const opts of attempts) {
    url = `/v#${encode(buildPayload(fm, { ...opts }))}`;
    if ((ORIGIN + url).length <= MAX) return url;
  }
  return url;
}

const examplesDir = join(root, "examples");
const slugs = readdirSync(examplesDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const indexPath = join(examplesDir, "index.json");
const index = JSON.parse(readFileSync(indexPath, "utf8")) as {
  exemplars: Array<Record<string, unknown>>;
};

for (const ex of index.exemplars) {
  const slug = String(ex.slug);
  const mdPath = join(examplesDir, slug, "TOOL_FACTS.md");
  const md = readFileSync(mdPath, "utf8");
  const { fm, raw } = extractFrontmatter(md);
  const viewer = viewerUrlFor(fm, raw);
  ex.viewer = viewer;
  console.log(`${slug}: ${viewer.length} chars`);
}

const json = JSON.stringify(index, null, 2) + "\n";
writeFileSync(indexPath, json);
writeFileSync(join(root, "site/examples/index.json"), json);
console.log("Updated examples/index.json and site/examples/index.json");
