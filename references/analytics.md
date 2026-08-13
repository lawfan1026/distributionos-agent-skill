# DistributionOS Analytics Reference

DistributionOS first-party analytics is public marketing/content tracking by default, not private product analytics.

## Install Scope

Install the tracker on public pages that DistributionOS creates, modifies, imports, or measures:

- home and landing pages
- blog posts and article pages
- docs, guides, resources, pricing, features, use-case, case-study, about, contact, and changelog pages
- primary marketing CTAs and campaign links

Do not track these routes by default:

- authenticated dashboards
- account, billing, settings, admin, auth, login, signup, profile, checkout, portal, redirect, product, customer workflow, workspace, project, user, and API routes

## SPA Route Gates

For shared shells or single-page apps, install `window.distributionOSAnalyticsConfig` before the script tag. Use allow/block route patterns so public content can track while private routes send no DistributionOS events.

## Markers

Use stable DistributionOS IDs for tracked public content when available:

- `distributionos:content-id` meta tag
- `data-dos-content-id`
- `data-dos-event="cta_click"`
- `data-dos-link-id`
- `data-dos-campaign-id`

Do not add DistributionOS IDs to canonical URLs or normal internal links.

## Verification

After deployment, verify representative public URLs with:

```bash
npx --yes @distributionos/cli@latest verify --app <appId> --url <liveUrl>
```

If analytics is intentionally skipped for a public asset, report an `analyticsOptOutReason` through DistributionOS instead of silently omitting tracking.
