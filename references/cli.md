# DistributionOS CLI Reference

Use the CLI from inside the customer's app repository. Use `@latest` in displayed setup commands so an older local install does not hide a reviewed setup update.

## Setup

Review setup for Codex. This can open interactive MCP OAuth before the repository plan:

```bash
npx --yes @distributionos/cli@latest setup --app <appId> --agent codex
```

Apply only the reviewed setup:

```bash
npx --yes @distributionos/cli@latest setup --app <appId> --agent codex --apply
```

Direct terminal review without client-specific MCP setup:

```bash
npx --yes @distributionos/cli@latest setup --app <appId> --agent terminal
```

Login only:

```bash
npx --yes @distributionos/cli@latest login --app <appId>
```

## Verify and Close Work

Verify public analytics after deployment:

```bash
npx --yes @distributionos/cli@latest verify --app <appId> --url <liveUrl>
```

Start and complete one meaningful work session when MCP tools are unavailable:

```bash
npx --yes @distributionos/cli@latest start-work --app <appId> --task-type <type> --summary <text>
npx --yes @distributionos/cli@latest complete-work --app <appId> --work-session <id> --status <status> --summary <text> --url <liveUrl> --file <path> --pr-url <url>
```

Legacy artifact-only reporting:

```bash
npx --yes @distributionos/cli@latest report-implementation --app <appId> --artifact <artifactId> --url <liveUrl> --summary <text>
```

Prefer MCP `complete_agent_work`, then CLI `complete-work`. Use `report-implementation` only when neither work-session path is available.

## Behavior and Boundaries

`setup` detects the repository framework, package manager, routes, layouts, content files, agent instruction files, deployment hints, and build, lint, or test commands. It fetches current app instructions and analytics contracts after authentication, then prints a plan before file mutation.

`setup --agent codex` checks or adds the DistributionOS MCP server, runs MCP login, and verifies the active Codex runtime before it prints the repository plan. This is an interactive user path.

For a local or CI smoke test that must not authenticate, change files, create a tracker, or report setup state, use all of these flags:

```bash
npx --yes @distributionos/cli@latest setup --app <testAppId> --cwd <disposableRepo> --no-fetch --json --skip-agent-setup --skip-setup-report
```

Never use that smoke-test form as proof that a real app is connected or analytics is installed.

The CLI does not commit, push, or deploy. It refuses dirty worktrees before writes unless `--allow-dirty` is explicit.
