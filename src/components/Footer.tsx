import { backgroundClips } from './backgroundClips'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-layout">
          <a className="footer-brand" href="/" aria-label="Loom home"><img src="/loom-logo-64.webp" srcSet="/loom-logo-64.webp 1x, /loom-logo-128.webp 2x" width={32} height={32} alt="" />loom<span>Unified media automation</span></a>
          <div className="footer-links">
            <a href="/#media-management">Media management</a>
            <a href="/guides/">Operator guides</a>
            <a href="https://github.com/Ebenderooock/loom/tree/main/docs">Documentation</a>
            <a href="https://github.com/Ebenderooock/loom">GitHub</a>
            <a href="https://github.com/Ebenderooock/loom/blob/main/LICENSE">AGPL-3.0</a>
            <a href="https://github.com/Ebenderooock/loom/discussions">Discussions</a>
          </div>
        </div>
        <p className="footer-note">Not a fork. Built from scratch. Pre-release, actively developing.</p>
        <div id="film-credits" className="media-credit">
          <p>Background films: trimmed, muted, resized, cropped and compressed; posters extracted. No endorsement implied.</p>
          {backgroundClips.map(film => (
            <p key={film.id}>
              <a href={film.website}>{film.title} — {film.attribution}</a>
              {' · '}<a href={`https://creativecommons.org/licenses/by/${film.license}/`}>CC BY {film.license}</a>
            </p>
          ))}
        </div>
      </div>
    </footer>
  )
}
