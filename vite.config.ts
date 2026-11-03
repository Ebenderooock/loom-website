import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { getPage, renderPageHead } from './src/site'

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? 'mpa' : 'spa',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'page-metadata',
      transformIndexHtml(html, context) {
        const page = getPage((context.originalUrl ?? context.path).split('?')[0])
        return html.replace('<!--page-head-->', () =>
          `<!--page-head:start-->\n    ${renderPageHead(page)}\n    <!--page-head:end-->`)
      },
    },
  ],
}))
