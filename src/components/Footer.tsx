import { backgroundClips, demoLibraryFilms } from './backgroundClips'
import { openCookieSettings } from '../analytics'
import { contactEmail, sourceRepository } from '../site'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-layout">
          <a className="footer-brand" href="/" aria-label="Loom home"><img src="/loom-logo-64.webp" srcSet="/loom-logo-64.webp 1x, /loom-logo-128.webp 2x" width={32} height={32} alt="" />loom<span>Unified media automation</span></a>
          <div className="footer-links">
            <a href="/#media-management">Media management</a>
            <a href="/guides/">Operator guides</a>
            <a href={`${sourceRepository}/tree/main/docs`}>Documentation</a>
            <a href={sourceRepository}>GitHub</a>
            <a href={`${sourceRepository}/discussions`}>Discussions</a>
          </div>
        </div>
        <nav className="footer-links footer-legal" aria-label="Legal and contact">
          <a href="/privacy/">Website privacy</a>
          <a href="/privacy/app/">App privacy</a>
          <a
            href="/privacy/#cookies"
            onClick={event => {
              event.preventDefault()
              openCookieSettings()
            }}
          >
            Cookie settings
          </a>
          <a href={`${sourceRepository}/blob/main/LICENSE`}>Licence (AGPL-3.0)</a>
          <a href={`${sourceRepository}/security/policy`}>Security policy</a>
          <a href={`mailto:${contactEmail}`}>Contact: {contactEmail}</a>
        </nav>
        <p className="footer-note">Not a fork. Built from scratch. Pre-release, actively developing.</p>
        <p className="footer-note footer-legal-note">
          © 2026 Eben de Roock. Loom is open-source software licensed under AGPL-3.0. Not affiliated with Loom, Inc.
          {' '}Use Loom only with media you have the right to download, store and share.
        </p>
        <div id="film-credits" className="media-credit">
          <p>Background films: trimmed, muted, resized, cropped and compressed; posters extracted. No endorsement implied.</p>
          {backgroundClips.map(film => (
            <p key={film.id}>
              <a href={film.website}>{film.title} — {film.attribution}</a>
              {' · '}<a href={`https://creativecommons.org/licenses/by/${film.license}/`}>CC BY {film.license}</a>
            </p>
          ))}
          <p>
            Screenshot demo library posters (via <a href="https://commons.wikimedia.org/">Wikimedia Commons</a>), all © Blender Foundation,
            {' '}<a href="https://studio.blender.org/films/">studio.blender.org</a>. No endorsement implied:
            {' '}{demoLibraryFilms.map((film, index) => (
              <span key={film.title}>
                {index > 0 && ' · '}{film.title} ({film.year}),{' '}
                <a href={`https://creativecommons.org/licenses/by/${film.license}/`}>CC BY {film.license}</a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
