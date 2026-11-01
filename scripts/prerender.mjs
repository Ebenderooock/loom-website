import { readFile, writeFile, rm } from 'node:fs/promises'
import { build } from 'vite'

const output = new URL('../dist/index.html', import.meta.url)
const serverOutput = new URL('../dist-ssr/', import.meta.url)
const placeholder = '<div id="root"></div>'

try {
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
    },
  })
  const { render } = await import(new URL('entry-server.js', serverOutput).href)
  const template = await readFile(output, 'utf8')
  if (template.split(placeholder).length !== 2) {
    throw new Error('Expected exactly one empty React root in the built HTML.')
  }
  const content = render()
  if (!content.includes('<main') || !content.includes('hero-title')) {
    throw new Error('Prerendering did not produce the marketing page.')
  }
  await writeFile(output, template.replace(placeholder, () => `<div id="root">${content}</div>`))
  console.log('Prerendered the marketing page into dist/index.html.')
} finally {
  await rm(serverOutput, { recursive: true, force: true })
}
