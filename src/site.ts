export const siteOrigin = 'https://loom.deroock.co.za'
export const sourceRepository = 'https://github.com/Ebenderooock/loom'
export const contactEmail = 'admin@deroock.co.za'
export const screenshotAlt = 'Loom Movies view (pre-release UI) with a demo library of Blender Foundation open films (CC BY): application header, navigation sidebar, search and quality filters, and a poster grid.'

type PageKind = 'home' | 'guides' | 'docker' | 'downloads' | 'privacy' | 'not-found'

export interface Page {
  path: string
  kind: PageKind
  title: string
  heading: string
  description: string
}

export const pages: readonly Page[] = [
  {
    path: '/',
    kind: 'home',
    title: 'Loom Media Manager — Self-hosted Movies, TV & Downloads',
    heading: 'Loom media manager',
    description: 'Loom is an open-source, self-hosted media manager for movies, TV and media downloads. Coordinate indexers, download clients and library imports. Pre-release.',
  },
  {
    path: '/guides/',
    kind: 'guides',
    title: 'Loom Guides — Docker Setup & Media Download Workflows',
    heading: 'Run Loom. Understand the workflow.',
    description: 'Practical Loom guides: install the self-hosted media manager with Docker Compose, connect download clients and troubleshoot imports. Pre-release caveats included.',
  },
  {
    path: '/guides/docker/',
    kind: 'docker',
    title: 'Install Loom with Docker Compose — Media Manager Setup',
    heading: 'Install Loom with Docker Compose',
    description: 'Set up the Loom media manager with Docker Compose: persistent storage, local access, health checks, permissions and safe updates for a pre-release server.',
  },
  {
    path: '/guides/media-downloads/',
    kind: 'downloads',
    title: 'Loom Media Downloads — qBittorrent, Paths & Library Imports',
    heading: 'From media download to organized library',
    description: 'Configure Loom media downloads with qBittorrent, shared paths and quality preferences. Diagnose search, client and import failures using media you may legally use.',
  },
  {
    path: '/privacy/',
    kind: 'privacy',
    title: 'Privacy & Cookie Policy — Loom Media Manager Website',
    heading: 'Privacy and cookie policy',
    description: 'How the Loom website uses Cloudflare logs, cookieless Cloudflare Web Analytics and optional Google Analytics 4 cookies, and your rights under POPIA and GDPR.',
  },
]

const notFound: Page = {
  path: '/404.html',
  kind: 'not-found',
  title: 'Page not found — Loom Media Manager',
  heading: 'This thread ends here.',
  description: 'This Loom page could not be found. Find installation and media download guides or return to the Loom media manager home page.',
}

export function getPage(pathname: string): Page {
  return pages.find(page => page.path === pathname || page.path === `${pathname}/`) ?? notFound
}

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#39;')
}

export function renderPageHead(page: Page) {
  const url = `${siteOrigin}${page.path}`
  const image = `${siteOrigin}/loom-movies.jpg`
  const imageAlt = screenshotAlt
  const indexable = page.kind !== 'not-found'
  const article = page.kind === 'docker' || page.kind === 'downloads'
  const guide = page.kind === 'guides' || article
  const breadcrumbs = [
    { name: 'Loom', item: `${siteOrigin}/` },
    ...(guide ? [{ name: 'Guides', item: `${siteOrigin}/guides/` }] : []),
    ...(article || page.kind === 'privacy' ? [{ name: page.heading, item: url }] : []),
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteOrigin}/#website`,
        url: `${siteOrigin}/`,
        name: 'Loom',
        alternateName: 'Loom media manager',
        description: 'The open-source, self-hosted Loom media manager.',
        inLanguage: 'en',
      },
      {
        '@type': page.kind === 'guides' ? 'CollectionPage' : 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        ...(article ? { mainEntity: { '@id': `${url}#article` } } : {}),
        description: page.description,
        isPartOf: { '@id': `${siteOrigin}/#website` },
        about: { '@id': `${siteOrigin}/#software` },
        ...(page.kind !== 'home' ? { breadcrumb: { '@id': `${url}#breadcrumbs` } } : {}),
        ...(page.kind === 'home' ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: image,
            caption: 'Loom Movies view (pre-release UI) with a demo library of Blender Foundation open films (CC BY).',
            width: 1440,
            height: 900,
          },
        } : {}),
        inLanguage: 'en',
      },
      ...(article ? [{
        '@type': 'TechArticle',
        '@id': `${url}#article`,
        url,
        headline: page.heading,
        description: page.description,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        about: { '@id': `${siteOrigin}/#software` },
        inLanguage: 'en',
      }] : []),
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${siteOrigin}/#software`,
        name: 'Loom',
        alternateName: 'Loom media manager',
        url: `${siteOrigin}/`,
        description: 'Open-source, pre-release self-hosted media management and download automation for movies and TV, with indexer search, download tracking and library imports.',
        codeRepository: sourceRepository,
        license: 'https://www.gnu.org/licenses/agpl-3.0.html',
        programmingLanguage: 'Go',
      },
      ...(page.kind !== 'home' ? [{
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumbs`,
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          ...crumb,
        })),
      }] : []),
    ],
  }
  const meta = (attribute: string, key: string, value: string) =>
    `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`

  return [
    `<title>${escapeHtml(page.title)}</title>`,
    meta('name', 'description', page.description),
    indexable ? `<link rel="canonical" href="${url}" />` : meta('name', 'robots', 'noindex'),
    meta('property', 'og:type', article ? 'article' : 'website'),
    meta('property', 'og:site_name', 'Loom'),
    meta('property', 'og:title', page.title),
    meta('property', 'og:description', page.description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', image),
    meta('property', 'og:image:type', 'image/jpeg'),
    meta('property', 'og:image:width', '1440'),
    meta('property', 'og:image:height', '900'),
    meta('property', 'og:image:alt', imageAlt),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.title),
    meta('name', 'twitter:description', page.description),
    meta('name', 'twitter:image', image),
    meta('name', 'twitter:image:alt', imageAlt),
    ...(indexable ? [`<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`] : []),
  ].join('\n    ')
}
