# Loom website

Marketing site for [Loom](https://github.com/Ebenderooock/loom) — the unified,
self-hosted media automation server. Live at **https://loom.deroock.co.za**.

Built with React 19 + TypeScript + Vite + Tailwind CSS, and deployed to
Cloudflare Workers (static assets).

## Content and design

The hero uses a real, owner-approved capture of Loom's Movies view, not a
reconstructed interface. `public/loom-movies.png` was captured on 2026-10-30
with the application header and navigation sidebar included at the owner's
request. Browser chrome and the instance address are excluded. The caption
identifies it as pre-release UI. Future captures
must be checked for private information and approved before publication.
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
posters are 960 × 400 WebP at quality 70.

| Asset stem in `public/media/` | `-ambient.mp4` bytes | `-poster.webp` bytes |
|---|---:|---:|
| `tears-of-steel` | 401,566 | 28,946 |
| `big-buck-bunny` | 252,020 | 36,334 |
| `sintel` | 198,683 | 6,272 |
| `elephants-dream` | 459,936 | 33,232 |

Total media: **1,416,989 bytes** (not fetched up front).
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
  -c:v libwebp -quality 70 public/media/sintel-poster.webp
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
