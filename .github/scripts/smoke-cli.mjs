import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const timeout = 120_000;

const version = run(["--yes", "@distributionos/cli@latest", "--version"]).trim();
assert.match(version, /^\d+\.\d+\.\d+$/, "published CLI must return a semantic version");

const repo = await mkdtemp(path.join(os.tmpdir(), "distributionos-cli-smoke-"));
execFileSync("git", ["init"], { cwd: repo, stdio: "ignore", timeout: 10_000 });
await writeFile(path.join(repo, "package.json"), JSON.stringify({ name: "distributionos-cli-smoke", private: true }, null, 2));
await writeFile(path.join(repo, "README.md"), "# Disposable DistributionOS CLI smoke repository\n");
const baseline = gitStatus(repo);

const output = run([
  "--yes",
  "@distributionos/cli@latest",
  "setup",
  "--app",
  "00000000-0000-4000-8000-000000000001",
  "--cwd",
  repo,
  "--no-fetch",
  "--json",
  "--skip-agent-setup",
  "--skip-setup-report",
]);
const plan = JSON.parse(output);
assert.equal(plan.mode, "review");
assert.equal(plan.remote.status, "skipped");
assert.equal(plan.setupReport, null);
assert.equal(gitStatus(repo), baseline, "safe review must not mutate the disposable repository");
assert.equal((await readFile(path.join(repo, "README.md"), "utf8")).startsWith("# Disposable"), true);

console.log(`Published CLI ${version} passed a no-auth, no-report, no-mutation review smoke test.`);

function run(args) {
  const command = process.platform === "win32" ? process.env.ComSpec ?? "cmd.exe" : "npx";
  const commandArgs = process.platform === "win32" ? ["/d", "/s", "/c", "npx", ...args] : args;
  return execFileSync(command, commandArgs, {
    encoding: "utf8",
    env: process.env,
    maxBuffer: 10 * 1024 * 1024,
    timeout,
    windowsHide: true,
  });
}

function gitStatus(cwd) {
  return execFileSync("git", ["status", "--short"], { cwd, encoding: "utf8", timeout: 10_000 }).trim();
}
