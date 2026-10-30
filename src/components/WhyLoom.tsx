const comparisons = [
  { category: 'Core stack', separate: 'Radarr + Sonarr + Prowlarr', loom: 'Movies, series, and indexers together' },
  { category: 'Deployment', separate: 'Separate core applications and databases', loom: 'One Go binary; SQLite or PostgreSQL' },
  { category: 'Downloads', separate: 'External torrent and Usenet clients', loom: 'External clients + built-in torrent workflow via Rain sidecar' },
  { category: 'Quality & automation', separate: 'Profiles and scheduling across apps', loom: 'Quality profiles, custom formats, RSS, and rolling searches' },
  { category: 'Requests', separate: 'A separate request application', loom: 'Core authenticated requests, quotas, approval, and bots' },
  { category: 'Media-server insights', separate: 'Dedicated analytics tools', loom: 'Connections and play-session tracking; broader analytics planned' },
  { category: 'Customization & cleanup', separate: 'Shell hooks and maintenance tools', loom: 'Script engine, marketplace, and expanded maintenance proposed' },
  { category: 'Operations', separate: 'Per-application logs and settings', loom: 'Shared health probes, logs, metrics, and tracing' },
  { category: 'Moving across', separate: 'Existing *arr configuration and libraries', loom: 'Radarr/Sonarr/Prowlarr database importers and API shims' },
]

export default function WhyLoom() {
  return (
    <section id="why-loom" className="section-space comparison-section">
      <div className="page-shell">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">Why bring it together?</span><h2>A stack that feels<br /><em>like one system.</em></h2></div>
          <p>The *arr ecosystem set the standard. Loom takes a clean-room approach to the same core workflow, with fewer core services to operate. It is not yet a stable, drop-in replacement for every setup.</p>
        </div>
        <div className="comparison-scroll" tabIndex={0} role="region" aria-label="Platform comparison, scroll horizontally on smaller screens">
          <table className="comparison-table">
            <caption className="sr-only">Traditional media stack compared with Loom’s current capabilities and planned work</caption>
            <thead><tr><th scope="col">The moving parts</th><th scope="col">Separate applications</th><th scope="col">With Loom</th></tr></thead>
            <tbody>{comparisons.map((row) => <tr key={row.category}><th scope="row">{row.category}</th><td>{row.separate}</td><td>{row.loom}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
