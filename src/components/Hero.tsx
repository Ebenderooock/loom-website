import { ArrowDown, ArrowRight, BookOpen } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="page-shell">
        <div className="hero-topline">
          <span className="eyebrow">Self-hosted media automation</span>
          <a href="https://github.com/Ebenderooock/loom/releases" className="release-badge">
            <span aria-hidden="true" /> Pre-release — Actively Developing <ArrowRight size={13} />
          </a>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 id="hero-title">Your library.<br /><em>Woven together.</em></h1>
            <p className="hero-description">
              Movies, TV, indexers, and downloads. Loom brings the media automation
              stack into one place, on your own server.
            </p>
            <div className="hero-actions">
              <a href="#getting-started" className="button-primary">Run Loom <ArrowRight size={17} /></a>
              <a href="https://github.com/Ebenderooock/loom/tree/main/docs" className="button-secondary">
                <BookOpen size={17} /> Read the docs
              </a>
            </div>
            <p className="hero-footnote">One Go binary. One database. Your infrastructure.</p>
          </div>

          <figure className="library-preview">
            <a className="product-capture-link" href="/loom-movies.png" target="_blank" rel="noopener noreferrer" aria-label="Open full-size screenshot of Loom’s Movies view">
              <img className="product-capture" src="/loom-movies.png" width={1440} height={900} fetchPriority="high" alt="Loom’s real Movies view, with the application header, navigation sidebar, search and quality filters, and a poster grid showing available, missing, and unreleased titles." />
            </a>
            <figcaption>Actual Loom Movies view · pre-release UI. <a href="/loom-movies.png" target="_blank" rel="noopener noreferrer">View full size <span aria-hidden="true">↗</span></a></figcaption>
          </figure>
        </div>
        <div className="hero-bottomline">
          <span>Open source · AGPL-3.0 · Built from scratch</span>
          <a href="#features">Explore the platform <ArrowDown size={14} /></a>
        </div>
      </div>
    </section>
  )
}
