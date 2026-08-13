import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, readdir, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const requiredFiles = [
  "SKILL.md",
  "agents/openai.yaml",
  "references/analytics.md",
  "references/cli.md",
  "references/example.md",
  "references/mcp.md",
];

const text = new Map();
for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  assert.equal((await stat(fullPath)).isFile(), true, `${file} must exist`);
  text.set(file, await readFile(fullPath, "utf8"));
}

const skill = text.get("SKILL.md");
const frontmatter = skill.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
assert(frontmatter, "SKILL.md must start with YAML frontmatter");
const frontmatterLines = frontmatter[1]
  .split(/\r?\n/)
  .filter(Boolean)
  .map((line) => line.split(":", 1)[0]);
assert.deepEqual(frontmatterLines, ["name", "description"], "frontmatter must contain only name and description");
assert.match(frontmatter[1], /^name: distributionos$/m);
assert.match(frontmatter[1], /^description: .{80,}$/m);
assert(skill.split(/\r?\n/).length < 500, "SKILL.md must remain under 500 lines");

const openai = text.get("agents/openai.yaml");
for (const key of ["display_name", "short_description", "default_prompt", "transport", "url"]) {
  assert.match(openai, new RegExp(`^\\s*${key}: ".+"$`, "m"), `agents/openai.yaml needs quoted ${key}`);
}
assert.match(openai, /default_prompt: ".*\$distributionos.*"/);
const shortDescription = openai.match(/short_description: "([^"]+)"/)[1];
assert(shortDescription.length >= 25 && shortDescription.length <= 64, "short_description must be 25-64 characters");
assert.match(openai, /url: "https:\/\/distributionos\.dev\/api\/mcp"/);

const markdownFiles = new Set(["README.md", ...requiredFiles.filter((file) => file.endsWith(".md"))]);
for (const file of markdownFiles) {
  const source = await readFile(path.join(root, file), "utf8");
  const links = [...source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
  for (const link of links) {
    if (/^(?:https?:|mailto:|#)/.test(link)) continue;
    const localPath = path.resolve(path.dirname(path.join(root, file)), link.split("#")[0]);
    assert.equal((await stat(localPath)).isFile(), true, `${file} has a broken local link: ${link}`);
  }
}

const cli = text.get("references/cli.md");
for (const command of ["setup", "login", "verify", "start-work", "complete-work", "report-implementation"]) {
  assert(cli.includes(command), `CLI reference must include ${command}`);
}
for (const flag of ["--no-fetch", "--json", "--skip-agent-setup", "--skip-setup-report"]) {
  assert(cli.includes(flag), `safe smoke command must include ${flag}`);
}
assert.match(skill, /check_distributionos_connection/);
assert.match(skill, /get_agent_instructions/);
assert.match(skill, /list_agent_alerts/);
assert.match(skill, /start_agent_work/);
assert.match(skill, /complete_agent_work/);
assert.match(text.get("references/mcp.md"), /Opportunity Map is retired/);
assert.doesNotMatch(text.get("references/mcp.md"), /fetch[^.]*opportunity maps/i, "retired Opportunity Map fetch guidance is not allowed");

const publicFiles = await collectFiles(root);
const secretPatterns = [
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\b/,
];
for (const file of publicFiles) {
  const source = await readFile(path.join(root, file), "utf8").catch(() => null);
  if (source === null) continue;
  for (const pattern of secretPatterns) assert.doesNotMatch(source, pattern, `${file} looks like it contains a secret`);
}

const installRoot = await mkdtemp(path.join(os.tmpdir(), "distributionos-skill-install-"));
const installPath = path.join(installRoot, ".codex", "skills", "distributionos");
for (const entry of ["SKILL.md", "agents", "references"]) {
  await cp(path.join(root, entry), path.join(installPath, entry), { recursive: true });
}
const discovered = await readFile(path.join(installPath, "SKILL.md"), "utf8");
assert.match(discovered, /^name: distributionos$/m, "installed skill must be discoverable by name");
assert.match(discovered, /^description: .+$/m, "installed skill must be discoverable by description");

console.log(`Validated ${requiredFiles.length} skill files, ${publicFiles.length} repository files, and one disposable Codex installation.`);

async function collectFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.name === ".git") continue;
    if (entry.isDirectory()) files.push(...(await collectFiles(path.join(directory, entry.name), relative)));
    else files.push(relative);
  }
  return files;
}
