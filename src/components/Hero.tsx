import { ArrowDown, ArrowRight, BookOpen } from 'lucide-react'
import HeroBackground from './HeroBackground'

const screenshotSizes = '(max-width: 800px) min(600px, calc(100vw - 40px)), (max-width: 1080px) 52vw, 640px'

export default function Hero() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <HeroBackground />
      <div className="page-shell">
        <div className="hero-topline">
          <span className="eyebrow">Loom media manager · Self-hosted automation</span>
          <a href="https://github.com/Ebenderooock/loom/releases" className="release-badge">
            <span aria-hidden="true" /> Pre-release — Actively Developing <ArrowRight size={13} />
          </a>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 id="hero-title">Loom. Your library.<br /><em>Woven together.</em></h1>
            <p className="hero-description">
              Self-hosted media management for movies, TV, indexers, and
              media downloads. Loom keeps your library and automation
              together on your own server.
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
            <a className="product-capture-link" href="/loom-movies-1440.webp" target="_blank" rel="noopener noreferrer" aria-label="Open full-size screenshot of Loom’s Movies view">
              <picture>
                <source type="image/avif" srcSet="/loom-movies-640.avif 640w, /loom-movies-960.avif 960w, /loom-movies-1440.avif 1440w" sizes={screenshotSizes} />
                <img className="product-capture" src="/loom-movies-960.webp" srcSet="/loom-movies-640.webp 640w, /loom-movies-960.webp 960w, /loom-movies-1440.webp 1440w" sizes={screenshotSizes} width={1440} height={900} decoding="async" alt="Loom’s real Movies view, with the application header, navigation sidebar, search and quality filters, and a poster grid showing available, missing, and unreleased titles." />
              </picture>
            </a>
            <figcaption>Actual Loom Movies view · pre-release UI. <a href="/loom-movies-1440.webp" target="_blank" rel="noopener noreferrer">View full size <span aria-hidden="true">↗</span></a></figcaption>
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
