# DistributionOS MCP and API Reference

Prefer DistributionOS OAuth/MCP when available. It gives agents app-scoped access without writing secrets into the customer repo.

## MCP

DistributionOS MCP server:

```text
https://distributionos.dev/api/mcp
```

Use MCP to fetch current app instructions, Brain Doc context, Brain Vault context packs, analytics install instructions, opportunity maps, artifacts, and reporting tools.

Before distribution, SEO, blog, launch, content, analytics, social, email, positioning, or visual asset work, fetch the current DistributionOS instructions for the app.

## API Key Fallback

Use API keys only when OAuth/MCP is unavailable and the user explicitly provides a safe env-var setup.

Accepted environment variable names:

```text
DISTRIBUTIONOS_API_KEY
DOS_API_KEY
DISTRIBUTIONOS_TOKEN
```

Never put those values in committed files, shell transcripts, prompts, final responses, screenshots, issue comments, or logs.

## Reporting

When implementation work ships, report the result back to DistributionOS before the final user response. Include the live URL, artifact ID when available, analytics IDs when available, deployment status, and verification notes.
