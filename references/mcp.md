# DistributionOS MCP and API Reference

Prefer DistributionOS OAuth/MCP because it provides app-scoped access without putting secrets in the customer repository.

## Server and Supported Clients

Remote MCP endpoint:

```text
https://distributionos.dev/api/mcp
```

Codex and Claude Code are the currently tested coding-agent clients. For Codex, use the CLI review path because it can configure and verify the active Codex MCP runtime. For Claude Code, prefer the DistributionOS account connector and the app-specific onboarding prompt. Treat other clients as unverified unless current DistributionOS instructions say otherwise.

## Preflight

For an app-scoped session:

1. Call `check_distributionos_connection`.
2. Call `get_agent_instructions` with the app ID and installed bootstrap version.
3. Call `list_agent_alerts`.
4. If a setup update is returned, show the review command. Apply it only after approval.

Use current instructions and context packs for the Brain Doc, Marketing Pipeline, artifacts, analytics, claims, and reporting rules. Opportunity Map is retired; do not use it as the planning surface.

## Authentication Recovery

If only authentication tools are visible, authenticate first, wait for the user to approve the browser or OAuth step, complete authentication, and then repeat the preflight.

If DistributionOS tools are absent, tell the user to reconnect or restart the agent from the app repository and approve the DistributionOS MCP server. Do not inspect unrelated dashboards or repositories as a substitute.

## Work Sessions and Reporting

Use `start_agent_work` once per meaningful task. Use `complete_agent_work` before the final response when relevant work is shipped, scheduled, implemented, or otherwise completed. Keep draft/review state separate from applied or published state.

When work-session MCP tools are unavailable, use CLI `start-work` and `complete-work`. Retain `report_implementation` only for legacy artifact-only reporting.

## API-Key Fallback

Use an API key only after OAuth/MCP is unavailable and the user approves the fallback. Pass it through a supported environment variable such as `DISTRIBUTIONOS_API_KEY`, `DOS_API_KEY`, or `DISTRIBUTIONOS_TOKEN`.

Never put the value in tracked files, prompts, final responses, screenshots, issue comments, or logs.
