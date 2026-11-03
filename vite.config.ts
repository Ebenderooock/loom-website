import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getPage, renderPageHead } from './src/site'

// Cookieless Cloudflare Web Analytics beacon, only emitted in production builds
// when a token is provided. No consent is required because it sets no cookies.
function cloudflareBeacon(token: string) {
  const config = JSON.stringify({ token }).replaceAll('&', '&amp;').replaceAll("'", '&#39;').replaceAll('<', '&lt;')
  return `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${config}'></script>`
}

export default defineConfig(({ isPreview, command, mode }) => {
  const cfToken = loadEnv(mode, process.cwd(), 'VITE_').VITE_CF_WEB_ANALYTICS_TOKEN?.trim() ?? ''

  return {
    appType: isPreview ? 'mpa' : 'spa',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'page-metadata',
        transformIndexHtml(html, context) {
          const page = getPage((context.originalUrl ?? context.path).split('?')[0])
          const withHead = html.replace('<!--page-head-->', () =>
            `<!--page-head:start-->\n    ${renderPageHead(page)}\n    <!--page-head:end-->`)
          return command === 'build' && cfToken
            ? withHead.replace('</body>', () => `  ${cloudflareBeacon(cfToken)}\n  </body>`)
            : withHead
        },
      },
    ],
  }
})
