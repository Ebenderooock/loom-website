export default function MediaManagement() {
  return (
    <section id="media-management" className="section-space" aria-labelledby="media-management-title">
      <div className="page-shell">
        <div className="section-heading">
          <span className="eyebrow">A closer look</span>
          <h2 id="media-management-title">Media management,<br /><em>on your server.</em></h2>
          <p>Loom is an open-source media manager for a library you control. It coordinates your configured sources and download clients; it does not host or distribute movies.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>What is self-hosted media management?</h3>
            <p>Run Loom on your own infrastructure to manage movie and TV metadata, quality preferences, indexers, and library organization. SQLite is the default database, with PostgreSQL support. <a className="text-link" href="#getting-started">Start with Docker or build from source.</a></p>
          </article>
          <article className="feature-card">
            <h3>How does Loom automate media downloads?</h3>
            <p>Loom searches your configured indexers, scores releases against your preferences, tracks downloads, and imports files into your library. Use the Rain sidecar torrent workflow or a supported external download client. Built-in Usenet downloading is deferred. <a className="text-link" href="https://github.com/Ebenderooock/loom/blob/main/docs/downloads.md">Read the download-client guide.</a></p>
          </article>
          <article className="feature-card">
            <h3>Can movie torrents be used legally?</h3>
            <p>BitTorrent is a transfer protocol, not a licence. Only download and share media you have permission to use, such as openly licensed films or works in the public domain in your jurisdiction. Check the source, licence, and local law first. Our background films are openly licensed Blender projects; <a className="text-link" href="#film-credits">see their sources and attribution.</a></p>
          </article>
        </div>
      </div>
    </section>
  )
}
