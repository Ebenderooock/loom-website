import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { build } from 'vite'

const output = new URL('../dist/index.html', import.meta.url)
const serverOutput = new URL('../dist-ssr/', import.meta.url)
const placeholder = '<div id="root"></div>'
const headPattern = /<!--page-head:start-->[\s\S]*?<!--page-head:end-->/

try {
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
    },
  })
  const { render, paths, siteOrigin } = await import(new URL('entry-server.js', serverOutput).href)
  const template = await readFile(output, 'utf8')
  if (template.split(placeholder).length !== 2 || !headPattern.test(template)) {
    throw new Error('Expected an empty React root and generated metadata in the built HTML.')
  }
  for (const pathname of [...paths, '/404.html']) {
    const { html, head } = render(pathname)
    if (!html.includes('<main') || !html.includes('<h1')) {
      throw new Error(`Prerendering did not produce page content for ${pathname}.`)
    }
    const directory = new URL(`../dist${pathname === '/404.html' ? '/' : pathname}`, import.meta.url)
    await mkdir(directory, { recursive: true })
    const file = new URL(pathname === '/404.html' ? '404.html' : 'index.html', directory)
    const document = template
      .replace(headPattern, () => head)
      .replace(placeholder, () => `<div id="root">${html}</div>`)
    await writeFile(file, document)
    console.log(`Prerendered ${pathname}`)
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(pathname => `  <url><loc>${siteOrigin}${pathname}</loc></url>`).join('\n')}\n</urlset>\n`
  await writeFile(new URL('../dist/sitemap.xml', import.meta.url), sitemap)
  await writeFile(new URL('../dist/robots.txt', import.meta.url),
    `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`)
} finally {
  await rm(serverOutput, { recursive: true, force: true })
}
