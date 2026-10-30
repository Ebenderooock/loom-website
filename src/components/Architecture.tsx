import { ArrowDown, ArrowRight } from 'lucide-react'

export default function Architecture() {
  return (
    <section className="architecture-section">
      <div className="page-shell">
        <div className="section-heading"><span className="eyebrow">The thread through it all</span><h2>Find. Download. Organize.</h2><p>One workflow coordinates your sources, download clients, and library.</p></div>
        <div className="architecture-flow">
          <div className="architecture-node"><span className="eyebrow">Find</span><h3>Your indexers</h3><p>Cardigann · Newznab · Torznab</p></div>
          <ArrowRight className="flow-arrow" aria-hidden="true" />
          <div className="architecture-node architecture-core"><span className="eyebrow">Coordinate</span><h3>Loom</h3><p>Search · score · grab · track · import</p><span className="database-label">SQLite / PostgreSQL</span></div>
          <ArrowRight className="flow-arrow" aria-hidden="true" />
          <div className="architecture-node"><span className="eyebrow">Organize</span><h3>Your library</h3><p>Download clients · media servers · notifications</p></div>
        </div>
        <a className="text-link section-source" href="https://github.com/Ebenderooock/loom/blob/main/docs/architecture.md">Read the architecture docs <ArrowDown size={14} /></a>
      </div>
    </section>
  )
}
