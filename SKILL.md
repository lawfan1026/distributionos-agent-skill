---
name: distributionos
description: Use when connecting an app repo to DistributionOS, installing DistributionOS first-party analytics, fetching DistributionOS app instructions, verifying analytics, or reporting shipped implementation work through the DistributionOS CLI, MCP, or API.
---

# DistributionOS

Use DistributionOS as the distribution memory, marketing context, artifact handoff, and first-party analytics layer for app repos.

## Default Setup

Run the CLI from inside the customer's app repo:

```bash
npx @distributionos/cli setup --app <appId>
```

The `appId` must come from the DistributionOS onboarding page. Do not invent one.

Start with the dry-run plan. Do not apply file changes until the user approves the planned files.

## Apply Changes

After the user reviews and approves the plan:

```bash
npx @distributionos/cli setup --app <appId> --apply
```

If the repo has unrelated dirty changes, stop and explain the dirty worktree before using `--allow-dirty`.

## Safety Rules

- Prefer DistributionOS OAuth/MCP over API keys.
- Use API-key environment variables only as an advanced fallback.
- Never write API keys, OAuth tokens, secrets, env vars, or private customer data into repo files.
- Never paste secrets into `AGENTS.md`, `CLAUDE.md`, README files, committed MCP config, shell output, or final responses.
- Do not commit, push, deploy, or publish unless the user explicitly asks.
- Do not track private app/dashboard/account/billing/settings/auth/admin/product routes by default.
- Keep canonical URLs clean; do not put DistributionOS IDs in normal URLs.

## Analytics

Install DistributionOS analytics only on public marketing/content surfaces by default.

Public route examples:

- `/`
- `/blog/**`
- `/docs/**`
- `/pricing/**`
- `/features/**`
- `/use-cases/**`

Private route examples:

- `/dashboard/**`
- `/account/**`
- `/billing/**`
- `/settings/**`
- `/auth/**`
- `/login/**`
- `/signup/**`
- `/admin/**`
- `/api/**`
- `/customer/**`
- `/product/**`

When working in a single-page app or shared shell, ensure the DistributionOS route privacy config is installed before the tracker script.

## Verify After Deploy

After a reviewed deployment, verify representative live public URLs:

```bash
npx @distributionos/cli verify --app <appId> --url <liveUrl>
```

## Report Implementation

When a DistributionOS artifact is shipped, scheduled, deployed, or otherwise implemented, report it back:

```bash
npx @distributionos/cli report-implementation --app <appId> --artifact <artifactId> --url <liveUrl>
```

## More Detail

- For CLI command details, read `references/cli.md`.
- For analytics install rules, read `references/analytics.md`.
- For MCP/API fallback guidance, read `references/mcp.md`.
