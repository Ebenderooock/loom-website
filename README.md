# Loom website

Marketing site for [Loom](https://github.com/Ebenderooock/loom) — the unified,
self-hosted media automation server. Live at **https://loom.deroock.co.za**.

Built with React 19 + TypeScript + Vite + Tailwind CSS, and deployed to
Cloudflare Workers (static assets).

## Content and design

The hero uses a real, owner-approved capture of Loom's Movies view, not a
reconstructed interface. The `public/loom-movies-*` images were captured on 2026-10-30
with the application header and navigation sidebar included at the owner's
request. Browser chrome and the instance address are excluded. The caption
identifies it as pre-release UI. Future captures
must be checked for private information and approved before publication.

### Image delivery

Images are served at their displayed size in modern formats; regenerate all
variants whenever a source changes:

- Screenshot: AVIF (quality 55) and WebP (quality 78) at 640, 960 and 1440 px
  wide, chosen with `srcset`/`sizes`. `loom-movies.jpg` (1440 × 900, quality 82)
  is the social-preview and structured-data image.
- Logo: 64 and 128 px WebP for the header/footer, `favicon-48.png`,
  `apple-touch-icon.png` (180 px) and a palette-compressed 500 px
  `loom-logo.png` master.
- Hero poster: Tears of Steel AVIF at 480/960 px and WebP at 480/960 px; it is
  the LCP image, so it carries `fetchpriority="high"`. The screenshot is not
  high priority.
No external fonts or image services are required.

### Background films and attribution

The hero rotates four openly licensed films in the order below. Each licence
was checked individually on the official project site (2026-11-02). These
Attribution licences permit reuse and modification, including commercial use.
Credits, licence links and modifications are visible in the footer, generated
from the same film list used by the player (`backgroundClips.ts`). All excerpts
are trimmed, muted, resized/cropped and compressed; posters are extracted from
their first frames. No endorsement is implied. Film assets retain their own
CC BY licences independently of the site's code.
Do not substitute commercial movie/TV clips: a short excerpt alone does not
establish permission.

| Film | Required attribution | Verified licence | Official source | Excerpt |
|---|---|---|---|---|
| Tears of Steel | (CC) Blender Foundation \| mango.blender.org | [CC BY 3.0 — project terms](https://mango.blender.org/sharing/) | [720p MOV](https://download.blender.org/demo/movies/ToS/tears_of_steel_720p.mov) | 00:35–00:45 |
| Big Buck Bunny | (c) copyright 2008, Blender Foundation / www.bigbuckbunny.org | [CC BY 3.0 — project terms](https://peach.blender.org/about/) | [720p MOV ZIP](https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_h264.mov.zip) | 00:35–00:45 |
| Sintel | © copyright Blender Foundation \| durian.blender.org | [CC BY 3.0 — project terms](https://durian.blender.org/sharing/) | [1080p MKV](https://download.blender.org/durian/movies/Sintel.2010.1080p.mkv) | 02:05–02:15 |
| Elephants Dream | (c) copyright 2006, Blender Foundation / Netherlands Media Art Institute / www.elephantsdream.org | [CC BY 2.5 — project terms](https://orange.blender.org/blog/creative-commons-license-2/) | [720p MOV](https://download.blender.org/ED/elephantsdream-720-h264-st-aac.mov) | 01:30–01:40 |

Licence deeds: [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) and
[CC BY 2.5](https://creativecommons.org/licenses/by/2.5/).
No soundtrack or audio stream is included. Tears of Steel's
[`copyright.txt`](https://download.blender.org/demo/movies/ToS/copyright.txt)
applies separate CC BY-ND terms to its original soundtrack; Elephants Dream's
additional soundtrack files have CC BY-NC-ND 2.5 terms, as noted on its sharing
page. Neither separately licensed soundtrack is used. No full-length source
files are retained in the repository.

Every MP4 is H.264, 960 × 400, 24 fps, 10 seconds, no audio, with fast-start.
New encodes use CRF 30 and a 400 kbps maximum video rate / 800 kb buffer;
posters are 960 × 400 WebP at quality 62.

| Asset stem in `public/media/` | `-ambient.mp4` bytes | `-poster.webp` bytes |
|---|---:|---:|
| `tears-of-steel` | 401,566 | 25,828 |
| `big-buck-bunny` | 252,020 | 32,240 |
| `sintel` | 198,683 | 5,454 |
| `elephants-dream` | 459,936 | 30,092 |

Total media: **1,405,819 bytes** (not fetched up front).
The current MP4 is fetched only when the hero is visible on a viewport wider than
800px, reduced motion is not requested, and the browser does not report
Save-Data or a slow (2G/3G) connection. Mobile, reduced-motion and data-saving
visitors receive only the single Tears of Steel poster. The next clip starts
loading in the final 1.2 seconds of the active clip, then dissolves in over one
second once playback is ready. Only two video elements are used; the outgoing
source is released after the dissolve. On a slow fetch, its last frame remains
until the next clip is ready. There is no playlist-wide prefetch.
Playback and preparation of further clips pause offscreen and in hidden tabs;
a visible pause/play button stops both players. Unsupported/failed playback
falls back to the static poster and logs a diagnostic. Browsers without the
Network Information API still respect viewport and motion preferences.

To reproduce a new excerpt with FFmpeg (substitute the source, start time and
film stem from the table; unzip the Bunny MOV in temporary storage first):

```bash
ffmpeg -ss 125 -i https://download.blender.org/durian/movies/Sintel.2010.1080p.mkv \
  -t 10 -an -vf 'scale=960:400:force_original_aspect_ratio=increase,crop=960:400,setsar=1,fps=24' \
  -c:v libx264 -preset slow -crf 30 -maxrate 400k -bufsize 800k \
  -pix_fmt yuv420p -movflags +faststart public/media/sintel-ambient.mp4
ffmpeg -i public/media/sintel-ambient.mp4 -frames:v 1 \
  -c:v libwebp -quality 62 public/media/sintel-poster.webp
```

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
npm run test:seo # check generated HTML, links, metadata and crawler files after building
npm run preview  # preview the production build
```

## Search discovery and initial HTML

`npm run build` renders the home page and operator guides into individual HTML
files using React's server renderer and a temporary Vite SSR bundle. The bundle
is removed after rendering; deployment is still static assets only, with no
runtime server, routing dependency or additional packages. Links use ordinary
document navigation, so guides also work with JavaScript disabled. Production
hydrates the selected page; the Vite dev server uses client rendering.
Vite preview uses multi-page handling instead of falling back to the home
page for missing URLs. Cloudflare serves the custom error page in production.
Keep render-time code safe without browser APIs,
and ensure the first client render matches the server snapshot. The consent
dialog reads browser storage after hydration; hero-video eligibility already
uses a static server snapshot. Page content, installation instructions,
screenshot and film attribution are visible without JavaScript.

The canonical origin is **https://loom.deroock.co.za**, verified against the
live HTTPS site on 2026-11-02. The custom domain is configured in Cloudflare,
not declared in `wrangler.jsonc`; retain its existing mapping. `src/site.ts`
is the single source for the public page registry, origin and page-specific
titles, descriptions, canonicals, Open Graph / Twitter metadata and JSON-LD.
The Vite HTML transform supplies metadata during development; the prerender
step writes the correct head and body for every production page.
Schema describes the website and source code, with `TechArticle` and
`BreadcrumbList` for the two guides. Sharing uses the actual owner-approved
screenshot, not a fabricated product image.

Public pages:

| URL | Reader's task |
|---|---|
| `/` | Understand Loom's capabilities and pre-release status |
| `/guides/` | Choose an operator guide |
| `/guides/docker/` | Set up persistent Docker storage, local access, health checks and safe updates |
| `/guides/media-downloads/` | Connect qBittorrent, align paths and troubleshoot the search-to-import workflow |

Guide instructions are original explanatory content grounded in the upstream
documentation. Their source links pin the revision that was checked; current
reference links are included separately. Recheck the relevant implementation
and docs when changing commands or capability claims. The Docker example is
for an isolated local test instance, not a production-ready deployment or
evidence of an end-to-end live download test.

`scripts/prerender.mjs` generates `dist/robots.txt` and `dist/sitemap.xml` from
the same origin and page registry. Do not maintain a second list in `public/`.
Only canonical, indexable pages enter the sitemap. A real `dist/404.html`
returns a useful, `noindex` error page for unknown paths rather than duplicate
home-page HTML.

When changing the domain, update `siteOrigin` in `src/site.ts`. After building, inspect the
HTML source (not just the live DOM) for meaningful content and parse the
JSON-LD and sitemap. Preview with JavaScript both enabled and disabled;
check local anchors, assets, hydration, installation controls and responsive
navigation. `npm run build` runs `scripts/seo.test.mjs` after prerendering and
fails for missing page content, duplicate metadata, broken internal links,
invalid JSON-LD, incorrect sitemap membership or indexing the error page.
The source template intentionally has an empty root and metadata placeholder;
only the production build is prerendered. Deploy `dist/`, never the source template.

Copy targets Loom media management and download automation, not competitive
replacement of the *arr ecosystem. Compatibility shims are described with
integration caveats. Movie torrents are discussed only in the context of
permission, openly licensed/public-domain media and local law. Keep
pre-release limitations visible; do not add invented ratings, usage figures,
verification tokens or stable-release claims.

### Owner actions after deployment

1. If needed, verify ownership of `loom.deroock.co.za` in Google Search Console using its
   supplied DNS TXT record in Cloudflare (or use an already verified property).
   This requires the owner's Google and DNS access; no token is bundled here.
2. Submit `https://loom.deroock.co.za/sitemap.xml`. Use URL Inspection on
   `https://loom.deroock.co.za/`, check the rendered/crawled page and request
   indexing for the home page and the two new guides. Check Google's selected
   canonical and last crawl date for each page. Confirm production `/robots.txt`
   and `/sitemap.xml` serve the actual files and nonexistent paths return 404.
3. Use an account with repository administration access to set the
   `Ebenderooock/loom` and `Ebenderooock/loom-website` About-panel Website fields
   to `https://loom.deroock.co.za/`. Relevant Loom topics include `self-hosted`,
   `media-management`, `media-automation` and `movie-manager`. Link useful
   guides from appropriate project documentation; avoid spam, purchased links
   and unrelated directory submissions. Repository push access alone does
   not grant permission to edit these settings.
4. Monitor indexing, queries and canonical selection. For Bing, verify the
   site in Bing Webmaster Tools (or import the verified Search Console
   property) and submit the same sitemap.

These changes improve crawlability and relevance, not guaranteed rankings.
Broad “Loom” searches compete with the established video-messaging brand;
focused self-hosted media queries are more realistic. Track branded discovery
(`Loom media manager`), setup (`install Loom Docker`) and workflow
(`Loom qBittorrent downloads`) queries separately from broad category terms.
Use unfiltered Web search impressions and query/page data in Search Console,
with its latest-data date in view; zero clicks alone does not diagnose an
indexing failure. Record the deployment date and compare complete reporting
periods rather than interpreting two days as a ranking verdict.
Ranking also depends on indexing, useful ongoing documentation, legitimate
links and search demand. Neither these guides nor requesting indexing can
guarantee a first-page position.

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
