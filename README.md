# DistributionOS Agent Skill

DistributionOS is distribution memory and marketing context for coding agents, at [distributionos.dev](https://distributionos.dev).

This public repository gives compatible coding agents a concise operating guide for connecting an app repository to DistributionOS, fetching current app-scoped instructions, using reviewable marketing work, installing public first-party analytics, and returning verified work receipts.

## Supported Paths

- **Codex:** tested through the DistributionOS CLI and remote MCP OAuth flow.
- **Claude Code:** tested through the DistributionOS account connector and app-specific onboarding prompt.
- **Other agents:** the skill format and MCP endpoint are public, but other client paths are not currently claimed as tested.

The skill is optional. The DistributionOS onboarding page and current app-scoped instructions remain the source of truth.

## Connect an App Repository

Create or select an app in DistributionOS, copy its app ID, and run this from the app repository:

```bash
npx --yes @distributionos/cli@latest setup --app <appId> --agent codex
```

The command can open MCP OAuth first. It then prints a review plan before it changes repository files. Run the reviewed command again with `--apply` only after you approve the plan.

Claude Code users should use the DistributionOS account connector and the prompt shown on the app's onboarding page.

## Install the Optional Skill

Use your agent's Git-based skill installer when it supports one. A portable manual installation copies only the agent files into a directory named `distributionos`:

```text
distributionos/
  SKILL.md
  agents/openai.yaml
  references/
```

For Codex, place that directory under a supported skills location such as `.codex/skills/distributionos` for one repository or the user's Codex skills directory for machine-wide use. Restart or open a new agent session after installation.

Raw skill entry point:

```text
https://raw.githubusercontent.com/lawfan1026/distributionos-agent-skill/main/SKILL.md
```

## What the Skill Teaches

- Run connection and instruction preflight before marketing work.
- Surface DistributionOS startup alerts.
- Use the Marketing Pipeline as the reviewable work surface.
- Keep repository edits and deployment with the customer's coding agent.
- Install analytics only on public marketing and content routes by default.
- Keep review, apply, schedule, and publication states separate.
- Start and complete one work session for meaningful tasks.
- Return changed files, pull requests, public URLs, and verification receipts.
- Keep secrets and private customer data out of repositories and responses.

## Verified Public Components

- MCP endpoint: `https://distributionos.dev/api/mcp`
- CLI package: `@distributionos/cli`
- Product documentation: [distributionos.dev/docs](https://distributionos.dev/docs)
- Skill entry point: [`SKILL.md`](SKILL.md)
- Sanitized workflow: [`references/example.md`](references/example.md)

The repository checks skill structure, metadata, local links, secret patterns, current CLI commands, disposable installation, published CLI behavior, raw-file reachability, npm metadata, and MCP initialization on Windows and Ubuntu.

Compatibility snapshot dated `2026.08.12`: DistributionOS CLI `0.1.20`, setup contract `2026.07.09`, and MCP protocol `2025-06-18`. Current app-scoped instructions take precedence when behavior changes.

## Safety Boundary

This repository does not grant permission to edit a customer repository, publish content, schedule posts, deploy changes, create reviews, or use private data. The user and current app-scoped DistributionOS instructions control those actions.

## License

The files in this public agent-skill repository are available under the [MIT License](LICENSE). This license does not apply to the private DistributionOS application repository, hosted service, customer data, or DistributionOS trademarks.
