# Sanitized End-to-End Example

This example shows the shape of a useful receipt. It contains fictional IDs and no customer data.

## Request

> Use DistributionOS to add the approved launch page for my app, deploy it, and verify the public tracking.

## Agent Flow

1. Confirm the app-scoped MCP connection.
2. Fetch current instructions and startup alerts.
3. Start one agent work session.
4. Fetch the approved Marketing Pipeline task and claim boundaries.
5. Inspect the app repository and implement only the approved page.
6. Add required public page and CTA tracking markers.
7. Run repository tests, deploy the reviewed change, and verify the live URL.
8. Verify analytics installation on the public page.
9. Complete the work session with the changed file, pull request, live URL, and verification results.

## Sanitized Closeout

```json
{
  "appId": "app_example",
  "workSessionId": "work_example",
  "status": "completed",
  "summary": "Added and deployed the approved launch page.",
  "files": ["src/app/launch/page.tsx"],
  "pullRequestUrl": "https://github.com/example/app/pull/42",
  "liveUrl": "https://example.com/launch",
  "verification": {
    "httpStatus": 200,
    "canonical": "https://example.com/launch",
    "analytics": "verified"
  }
}
```

Do not copy fictional IDs into real work. Use the exact app, task, artifact, analytics, and work-session identifiers returned by DistributionOS.
