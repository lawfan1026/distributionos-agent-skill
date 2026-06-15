# DistributionOS CLI Reference

Use the CLI from inside the customer's app repository.

## Commands

Dry-run setup:

```bash
npx @distributionos/cli setup --app <appId>
```

Apply reviewed setup:

```bash
npx @distributionos/cli setup --app <appId> --apply
```

Login only:

```bash
npx @distributionos/cli login --app <appId>
```

Verify analytics:

```bash
npx @distributionos/cli verify --app <appId> --url <liveUrl>
```

Report shipped work:

```bash
npx @distributionos/cli report-implementation --app <appId> --artifact <artifactId> --url <liveUrl>
```

## Behavior

`setup` detects the repo framework, package manager, public/private routes, layout files, content files, agent instruction files, deploy hints, and build/lint/test commands.

The default setup flow fetches current DistributionOS instructions and analytics contract data through OAuth/MCP, then prints a plan before changing files.

`--no-fetch --json` is for smoke tests, CI checks, or debugging. It does not log in, fetch app instructions, create analytics trackers, or submit onboarding.

## Dirty Worktrees

Do not run `--apply --allow-dirty` casually. If the repo has unrelated changes, explain the dirty state and ask the user whether the CLI should apply only the DistributionOS-managed changes.

## Deployment

The CLI does not commit, push, or deploy. Deploy only after the user reviews the diff and explicitly asks for deployment.
