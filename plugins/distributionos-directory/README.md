# DistributionOS planning plugin

Read your app's saved context, review existing work, and save a marketing plan for review.

This package is a candidate for the official directory. It is not an approved listing. The hosted Claude custom connector has passed an owner-account pilot. Package validation does not establish support in every Claude client.

## Connect in Claude Code

You need a DistributionOS account, saved app context, and an active subscription for the selected app. Current pricing is $50 per month or $500 per year per app.

1. Clone this public repository.
2. From the repository root, start Claude Code with this package.

```sh
claude --plugin-dir ./plugins/distributionos-directory
```

3. Open `/mcp` and select this plugin's DistributionOS connection.
4. Sign in to DistributionOS and approve the displayed read and proposal permissions.
5. Ask Claude to use the DistributionOS planning skill and list your apps.
6. Choose an app, then ask for its saved context and next actions.

This command loads the plugin for that session. It does not install a global marketplace or replace your existing connector.

## Save and return to a plan

Ask Claude to save a proposed marketing plan for your selected app. The tool returns a review link. Save that link or the output ID.

In a new session with this plugin, ask Claude to read the saved output for the same app. The plan is stored in DistributionOS, not only in chat history.

A saved plan is not an approved work item. Review it before authorizing work through a separate workflow.

## Connection problems

- If the server requests authentication, use `/mcp` to connect again.
- If you cancel sign-in, no connection is granted. Start connection again when ready.
- If app access is denied, check the selected app and its subscription in DistributionOS.
- If app context is missing, complete app setup in DistributionOS. The plugin does not initialize or overwrite your app.
- If another DistributionOS connector is present, select the server bundled with this plugin. Do not use the advanced connector as a substitute for a failed restricted connection.
- If the saved output is not on the first page, use the returned next offset or read its exact output ID.
- Never paste an API key, OAuth token, password, or private customer record into a support issue.

## Permissions and data

The server is `https://distributionos.dev/api/mcp/directory`. It uses OAuth, not a customer-supplied API key. App-specific calls require an explicit app ID and check account ownership and paid access.

Seven tools read connection status, app summaries, saved context, existing work, and saved outputs. Only `propose_marketing_plan` writes. It saves a new review-only plan and returns the existing record for an identical retry.

The plugin cannot publish, schedule, generate media, run paid research, execute tasks, or change billing. It contains no local executable or hook. It does not need an application repository.

## Privacy policy

See the [DistributionOS privacy policy](https://distributionos.dev/legal/privacy) and [service terms](https://distributionos.dev/legal/terms).

The connector reads selected account and app data and stores plan text that you ask it to save. Do not include secrets or private customer information in plans.

For package issues, use [GitHub issues](https://github.com/lawfan1026/distributionos-agent-skill/issues).

## License

This plugin is covered by the repository's [MIT license](../../LICENSE). The hosted DistributionOS service remains subject to its separate service terms.
