import { useState } from 'react'
import { ArrowDown, ArrowRight, BookOpen, Check, Film, Search, Tv } from 'lucide-react'

const collections = {
  Movies: [
    { title: 'The Quiet Orbit', detail: 'Science fiction', style: 'orbit' },
    { title: 'After the Rain', detail: 'Drama', style: 'rain' },
    { title: 'Field Notes', detail: 'Documentary', style: 'field' },
  ],
  Series: [
    { title: 'Outer Signals', detail: 'Season 01', style: 'orbit' },
    { title: 'Night Service', detail: 'Season 02', style: 'rain' },
    { title: 'Wild Country', detail: 'Season 01', style: 'field' },
  ],
}

export default function Hero() {
  const [collection, setCollection] = useState<keyof typeof collections>('Movies')

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
            <div className="preview-toolbar">
              <span className="preview-brand"><img src="/loom-logo.png" alt="" /> loom <span>/ library</span></span>
              <span className="preview-local">SELF-HOSTED</span>
            </div>
            <div className="preview-heading">
              <div><span className="eyebrow">A place for everything</span><h2>The collection</h2></div>
              <div className="preview-switch" aria-label="Illustrated collection">
                {(['Movies', 'Series'] as const).map((name) => (
                  <button key={name} aria-pressed={collection === name} onClick={() => setCollection(name)}>
                    {name === 'Movies' ? <Film size={14} /> : <Tv size={14} />}{name}
                  </button>
                ))}
              </div>
            </div>
            <div className="poster-grid">
              {collections[collection].map((item) => (
                <div key={item.title} className="preview-item">
                  <div className={`poster poster-${item.style}`} aria-hidden="true">
                    <span className="poster-mark">LOOM COLLECTION</span>
                    <strong>{item.title}</strong>
                  </div>
                  <h3>{item.title}</h3><p>{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="workflow-preview">
              <div className="workflow-label"><Search size={14} /><span>From discovery to your library</span></div>
              <ol className="workflow-steps">
                {['Search', 'Grab', 'Download', 'Import'].map((step) => (
                  <li key={step}><Check size={12} /><span>{step}</span></li>
                ))}
              </ol>
            </div>
            <figcaption>Interactive workflow illustration. Sample titles, not a product screenshot.</figcaption>
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
