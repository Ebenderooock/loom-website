# Loom website

Marketing site for [Loom](https://github.com/Ebenderooock/loom) — the unified,
self-hosted media automation server. Live at **https://loom.deroock.co.za**.

Built with React 19 + TypeScript + Vite + Tailwind CSS, and deployed to
Cloudflare Workers (static assets).

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
