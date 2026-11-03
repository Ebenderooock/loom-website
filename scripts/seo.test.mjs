import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const origin = 'https://loom.deroock.co.za'
const dist = resolve('dist')
const paths = ['/', '/guides/', '/guides/docker/', '/guides/media-downloads/']
const documents = new Map(paths.map(path => [path, readFileSync(resolve(dist, `.${path}index.html`), 'utf8')]))

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1]
}

function meta(html, name) {
  return [...html.matchAll(/<meta\b[^>]*>/g)]
    .map(match => match[0])
    .filter(tag => attribute(tag, 'name') === name || attribute(tag, 'property') === name)
    .map(tag => attribute(tag, 'content'))
}

function schema(html) {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  assert.equal(scripts.length, 1)
  return JSON.parse(scripts[0][1])
}

for (const [path, html] of documents) {
  test(`initial HTML, metadata and structured data: ${path}`, () => {
    assert.match(html, /<html lang="en"/)
    assert.match(html, /<main id="main">/)
    assert.doesNotMatch(html, /<div id="root"><\/div>|<!--page-head|noindex/)
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1)
    assert.equal([...html.matchAll(/<title>/g)].length, 1)
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)" \/>/g)]
    assert.deepEqual(canonicals.map(match => match[1]), [`${origin}${path}`])
    assert.deepEqual(meta(html, 'og:url'), [`${origin}${path}`])
    const descriptions = meta(html, 'description')
    assert.equal(descriptions.length, 1)
    assert.ok(descriptions[0].length >= 100 && descriptions[0].length <= 170)
    for (const key of ['og:title', 'og:description', 'twitter:title', 'twitter:description']) {
      assert.equal(meta(html, key).length, 1, key)
    }
    assert.deepEqual(meta(html, 'og:image'), [`${origin}/loom-movies.jpg`])
    assert.deepEqual(meta(html, 'twitter:image'), [`${origin}/loom-movies.jpg`])
    assert.deepEqual(meta(html, 'twitter:card'), ['summary_large_image'])
    assert.equal(meta(html, 'og:image:alt').length, 1)
    assert.match(html, /Pre-release|pre-release/)
    const data = schema(html)
    assert.equal(data['@context'], 'https://schema.org')
    const graph = data['@graph']
    const ids = new Set(graph.map(node => node['@id']))
    assert.equal(ids.size, graph.length)
    const webpage = graph.find(node => node['@id'] === `${origin}${path}#webpage`)
    assert.equal(webpage.url, `${origin}${path}`)
    assert.equal(webpage.isPartOf['@id'], `${origin}/#website`)
    assert.equal(webpage.about['@id'], `${origin}/#software`)
    const software = graph.find(node => node['@type'] === 'SoftwareSourceCode')
    assert.equal(software.codeRepository, 'https://github.com/Ebenderooock/loom')
    assert.match(software.description, /pre-release/)
    assert.doesNotMatch(JSON.stringify(data), /aggregateRating|ratingValue|reviewCount|offers/)
    if (path === '/guides/docker/' || path === '/guides/media-downloads/') {
      assert.equal(webpage['@type'], 'WebPage')
      const article = graph.find(node => node['@type'] === 'TechArticle')
      assert.equal(article.mainEntityOfPage['@id'], webpage['@id'])
      assert.equal(webpage.mainEntity['@id'], article['@id'])
      assert.ok(article.headline)
      assert.equal(meta(html, 'og:type')[0], 'article')
      const crumbs = graph.find(node => node['@type'] === 'BreadcrumbList')
      assert.equal(webpage.breadcrumb['@id'], crumbs['@id'])
      assert.deepEqual(crumbs.itemListElement.map(item => item.position), [1, 2, 3])
      assert.equal(crumbs.itemListElement.at(-1).item, `${origin}${path}`)
      assert.match(html, /Sources and scope/)
      assert.match(html, /blob\/d256d3a6b371429998ceb6d57d86e51369098474\/docs\//)
    }
  })

  test(`internal links, anchors and assets: ${path}`, () => {
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
    assert.equal(ids.length, new Set(ids).size, 'duplicate element IDs')
    for (const [tag] of html.matchAll(/<(?:a|link|script|img|source)\b[^>]*>/g)) {
      const value = attribute(tag, 'href') ?? attribute(tag, 'src')
      if (!value || /^(https?:)?\/\//.test(value)) continue
      const url = new URL(value, `${origin}${path}`)
      let destination
      if (url.pathname.endsWith('/')) {
        assert.ok(documents.has(url.pathname), `unknown local page: ${value}`)
        destination = documents.get(url.pathname)
      } else {
        assert.ok(existsSync(resolve(dist, `.${url.pathname}`)), `missing asset: ${value}`)
      }
      if (url.hash) {
        assert.ok(destination?.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `missing anchor: ${value}`)
      }
    }
  })
}

test('distinct content and complete discovery graph', () => {
  assert.equal(new Set([...documents.values()].map(html => html.match(/<title>(.*?)<\/title>/)[1])).size, paths.length)
  assert.equal(new Set([...documents.values()].map(html => meta(html, 'description')[0])).size, paths.length)
  for (const path of paths.slice(1)) assert.ok(documents.get('/guides/').includes(`href="${path}"`))
  assert.match(documents.get('/'), /href="\/guides\/docker\/"/)
  assert.match(documents.get('/'), /href="\/guides\/media-downloads\/"/)
  const docker = documents.get('/guides/docker/')
  for (const text of ['127.0.0.1:1925:1925', 'LOOM_STORAGE_SQLITE_PATH', '/config/loom.db', 'docker compose config --quiet', 'curl --fail', 'Back up before changing images']) {
    assert.ok(docker.includes(text), text)
  }
  const downloads = documents.get('/guides/media-downloads/')
  for (const text of ['qbittorrent', 'Rain sidecar', 'remote path mapping', 'same filesystem', 'no-op client', 'Diagnose the stage that failed', 'grants no rights']) {
    assert.ok(downloads.includes(text), text)
  }
})

test('generated sitemap and robots include exactly the indexable pages', () => {
  const sitemap = readFileSync(resolve(dist, 'sitemap.xml'), 'utf8')
  assert.match(sitemap, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/)
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), paths.map(path => `${origin}${path}`))
  assert.equal(readFileSync(resolve(dist, 'robots.txt'), 'utf8'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
  assert.ok(!existsSync(resolve('dist-ssr')), 'temporary SSR bundle should be removed')
})

test('404 page is usable and excluded from indexing', () => {
  const html = readFileSync(resolve(dist, '404.html'), 'utf8')
  assert.match(html, /Page not found/)
  assert.match(html, /href="\/guides\/"/)
  assert.deepEqual(meta(html, 'robots'), ['noindex'])
  assert.doesNotMatch(html, /rel="canonical"|application\/ld\+json/)
})
