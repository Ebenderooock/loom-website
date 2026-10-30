# Loom website

Marketing site for [Loom](https://github.com/Ebenderooock/loom) — the unified,
self-hosted media automation server. Live at **https://loom.deroock.co.za**.

Built with React 19 + TypeScript + Vite + Tailwind CSS, and deployed to
Cloudflare Workers (static assets).

## Content and design

The dark library visual uses original CSS poster artwork and an interactive
workflow illustration, explicitly labelled as sample content rather than a
product screenshot. No external fonts or image services are required.

Product copy follows the Loom [README](https://github.com/Ebenderooock/loom#readme),
[platform reference](https://github.com/Ebenderooock/loom/blob/main/docs/platform-documentation.md),
and [implementation roadmap](https://github.com/Ebenderooock/loom/tree/main/docs/roadmap).
Keep pre-release caveats visible, distinguish available capabilities from
design proposals, and check these sources before marking a vertical shipped.
Docker examples use port `1925`; the built-in torrent workflow uses a Rain
sidecar, while a built-in Usenet client remains deferred.

## Develop

```bash
npm install
npm run dev      # local dev server with HMR
npm run lint     # ESLint
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build
```

## Deploy

Deployment is automated: every push to `main` runs
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the
site and publishes it to Cloudflare via `wrangler deploy`
(project `wispy-wind-1fb6`, see [`wrangler.jsonc`](wrangler.jsonc)).

Required repository secrets:

| Secret | Purpose |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Workers Scripts: Edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Target Cloudflare account |

To deploy manually: `npx wrangler deploy` (after `npm run build`).
