import assert from "node:assert/strict";

const pages = [
  "https://raw.githubusercontent.com/lawfan1026/distributionos-agent-skill/main/SKILL.md",
  "https://raw.githubusercontent.com/lawfan1026/distributionos-agent-skill/main/agents/openai.yaml",
  "https://distributionos.dev/docs",
];

for (const url of pages) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  assert.equal(response.status, 200, `${url} must return 200`);
}

const npm = await fetch("https://registry.npmjs.org/%40distributionos%2Fcli/latest", {
  signal: AbortSignal.timeout(20_000),
}).then((response) => response.json());
assert.equal(npm.name, "@distributionos/cli");
assert.match(npm.version, /^\d+\.\d+\.\d+$/);
assert.equal(npm.homepage, "https://distributionos.dev");

const mcp = await fetch("https://distributionos.dev/api/mcp", {
  method: "POST",
  headers: {
    Accept: "application/json, text/event-stream",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "distributionos-agent-skill-ci", version: "1.0.0" },
    },
  }),
  signal: AbortSignal.timeout(20_000),
});
assert.equal(mcp.status, 200, "MCP initialize must return 200");
const payload = await mcp.json();
assert.equal(payload.result?.serverInfo?.name, "distribution-os");
assert.equal(payload.result?.protocolVersion, "2025-06-18");

console.log(`Remote checks passed for ${pages.length} pages, npm ${npm.version}, and MCP initialization.`);
