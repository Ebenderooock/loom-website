import { Activity, Bell, Cable, Download, FolderSync, HardDrive, Inbox, Layers, ListFilter, Search, ShieldCheck, Users } from 'lucide-react'

const features = [
  { icon: Layers, title: 'A connected library', description: 'Manage movies and TV, metadata, seasons, and episodes in one interface. Music includes artist, album, and track management and acquisition.' },
  { icon: Search, title: 'Your sources, together', description: '500+ bundled Cardigann indexer definitions, Newznab and Torznab, aggregated search, release scoring, and per-indexer diagnostics.' },
  { icon: ListFilter, title: 'Choose what qualifies', description: 'Quality profiles, custom formats, language preferences, and upgrade thresholds guide what Loom searches for and grabs.' },
  { icon: HardDrive, title: 'Torrent workflows', description: 'Built-in torrent workflow integration uses a Rain sidecar. Torrent detail views and per-indexer seed-ratio overrides remain polish work.' },
  { icon: Download, title: 'Bring your download client', description: 'Connect qBittorrent, Transmission, Deluge, rTorrent, SABnzbd, or NZBGet. A built-in Usenet client is a deferred proposal.' },
  { icon: FolderSync, title: 'Search through import', description: 'Track search, grab, download, post-processing, and import. Rename files, move or hardlink them, and recover interrupted workflows.' },
  { icon: ShieldCheck, title: 'Review before import', description: 'Release validation, suspicious-file checks, collision handling, and a manual review queue help keep imports under your control.' },
  { icon: Inbox, title: 'Requests with boundaries', description: 'Authenticated requests, per-user quotas, admin approval, and Discord/Telegram request bots exist. Expanded request features remain on the roadmap.' },
  { icon: Users, title: 'Connect your ecosystem', description: 'Plex, Jellyfin, Emby, and Trakt connections support library and watch-status workflows. Broader media-server analytics remain in development.' },
  { icon: Cable, title: 'A path from the *arr stack', description: 'Radarr, Sonarr, and Prowlarr compatibility shims and database migration importers provide a path across. Check the API docs for your integration.' },
  { icon: Bell, title: 'Keep up without checking in', description: 'RSS and import lists, scheduled missing-media searches, and notifications through Discord, webhooks, Gotify, Ntfy, and other channels.' },
  { icon: Activity, title: 'See what your server is doing', description: 'Health probes, structured JSON logs, Prometheus metrics, OpenTelemetry tracing, and configurable pprof profiling are part of the platform.' },
]

export default function Features() {
  return (
    <section id="features" className="section-space">
      <div className="page-shell">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">Inside the platform</span><h2>Less app switching.<br /><em>More library.</em></h2></div>
          <p>From finding a release to putting it in the right folder, keep the moving parts in view. Available capabilities are still pre-release; not every planned vertical is complete.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <feature.icon size={21} strokeWidth={1.5} aria-hidden="true" />
              <h3>{feature.title}</h3><p>{feature.description}</p>
            </article>
          ))}
        </div>
        <a className="text-link section-source" href="https://github.com/Ebenderooock/loom/blob/main/docs/platform-documentation.md">Explore the capability reference <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  )
}
