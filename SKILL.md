---
name: distributionos
description: Connect an app repository to DistributionOS and use its app-scoped marketing context, Marketing Pipeline, analytics contract, startup alerts, and work-session receipts. Use for DistributionOS onboarding, preflight before marketing work, public analytics installation or verification, tracked campaign links, and reporting shipped work through MCP, CLI, or the API fallback.
---

# DistributionOS

Use DistributionOS as distribution memory and marketing context for coding agents. Keep the customer's coding agent responsible for repository changes and deployment; use DistributionOS for app context, reviewable marketing work, tracking requirements, and outcome receipts.

## Connect

For Codex, run the review-first CLI from the customer's app repository:

```bash
npx --yes @distributionos/cli@latest setup --app <appId> --agent codex
```

The `appId` must come from the DistributionOS onboarding page. Do not invent one. The Codex path can open MCP OAuth before it prints the repository plan. Approve file changes only after reviewing the plan.

For Claude Code, prefer the DistributionOS account connector and the onboarding prompt supplied by DistributionOS. Read [references/mcp.md](references/mcp.md) for the current client boundary and recovery flow.

## Session Preflight

When DistributionOS tools are available for an app repository:

1. Call `check_distributionos_connection`.
2. Call `get_agent_instructions` with the app ID and installed bootstrap version.
3. Call `list_agent_alerts` and tell the user about returned alerts before unrelated work.
4. Review a returned setup update before applying it. Apply only after user approval.

Fetch current app instructions before SEO, blog, landing-page, launch, content, social, email, analytics, positioning, competitor, image, or video work. Do not rely on the public skill as a substitute for live app-scoped instructions.

## Execute Meaningful Work

For a meaningful task, start one work session with `start_agent_work`. Use `complete_agent_work` before the final response when the task ships, schedules, implements, or materially changes DistributionOS-relevant work. Include public URLs, changed files, pull requests, verification, analytics status, and product-change details when applicable.

Use CLI `start-work` and `complete-work` only when the MCP work-session tools are not callable. Use `report-implementation` only for a legacy artifact-only flow when work-session tools are unavailable.

## Safety

- Prefer DistributionOS OAuth/MCP over API keys.
- Use API-key environment variables only as an explicit advanced fallback.
- Never write credentials, secrets, env values, or private customer data into tracked files or responses.
- Never apply setup with unrelated dirty work unless the user recognizes the state and explicitly approves `--allow-dirty`.
- Do not commit, push, deploy, schedule, or publish unless the user authorizes that action.
- Track public marketing and content routes by default. Do not track private product, dashboard, account, billing, settings, auth, admin, or customer workflows without separate product-analytics approval.
- Keep canonical URLs clean. Use DistributionOS IDs in page and link markers, not normal URLs.
- Keep proposed or review state separate from applied, scheduled, or published state.

## References

- Read [references/cli.md](references/cli.md) for current CLI commands and non-interactive boundaries.
- Read [references/analytics.md](references/analytics.md) before installing or changing analytics.
- Read [references/mcp.md](references/mcp.md) for MCP preflight, supported clients, authentication recovery, and API fallback.
- Read [references/example.md](references/example.md) for a sanitized end-to-end work receipt.
