import { contactEmail, sourceRepository, type Page } from '../site'

const effectiveDate = '4 November 2026'

export default function AppPrivacy({ page }: { page: Page }) {
  return (
    <article className="page-shell guide-page">
      <nav className="guide-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Loom</a><span aria-hidden="true">/</span>
        <a href="/privacy/">Privacy</a><span aria-hidden="true">/</span>
        <span aria-current="page">App</span>
      </nav>
      <header className="guide-heading">
        <span className="eyebrow">Effective {effectiveDate}</span>
        <h1>{page.heading}</h1>
        <p>This notice covers the Loom self-hosted server (including its web UI) and the Loom TV Android TV app. For this website, see the <a className="text-link" href="/privacy/">website privacy and cookie policy</a>.</p>
      </header>
      <div className="guide-body">
        <nav className="guide-contents" aria-label="On this page">
          <a href="#summary">Summary</a>
          <a href="#server-data">Data on the server</a>
          <a href="#services">Third-party services</a>
          <a href="#browser">Browser requests</a>
          <a href="#loom-tv">Loom TV</a>
          <a href="#rights">Your rights</a>
          <a href="#contact">Contact</a>
        </nav>

        <section id="summary">
          <h2>Summary</h2>
          <ul>
            <li>Loom is <strong>self-hosted</strong>. Each Loom server is installed and run by an operator, such as you, your household or your organisation.</li>
            <li>The Loom project (Eben de Roock and Loom contributors) <strong>does not operate any Loom service and receives no data from your instance</strong>. There is no telemetry, analytics, crash reporting or advertising in the server, web UI or Loom TV app.</li>
            <li>Loom does not check for updates or otherwise contact the Loom project. It only contacts third-party services that the operator configures.</li>
            <li>The <strong>operator of each instance is the data controller</strong> (the &ldquo;responsible party&rdquo; under POPIA) for personal information stored on that instance.</li>
          </ul>
        </section>

        <section id="server-data">
          <h2>Data stored on the server</h2>
          <p>All data stays in the operator&apos;s own database (SQLite by default, or PostgreSQL) and data directories. Depending on the features in use, this can include:</p>
          <ul>
            <li><strong>User accounts:</strong> username, optional email address, role and a password hash (plaintext passwords are not stored), plus single sign-on (OIDC) or trusted reverse-proxy identities if configured.</li>
            <li><strong>Credentials:</strong> API keys, user invite tokens and the credentials the operator enters for connected services (indexers, download clients, media servers, Trakt, notification and chat-bot services). These are stored in the database, so operators should restrict access to the database, data directory and backups.</li>
            <li><strong>Library and activity data:</strong> movies, series, music, collections, quality settings, per-user requests, and search, download and import history.</li>
            <li><strong>Watch history:</strong> if Plex, Jellyfin or Emby is connected, playback sessions reported by those servers, such as the media server username, title, device, timestamps and progress.</li>
            <li><strong>Chat-bot links:</strong> if Discord or Telegram bots are enabled, the linked platform user ID and username.</li>
            <li><strong>Logs and audit trail:</strong> application logs, an audit log of user and system actions, and HTTP request logs that include the client IP address, method, path, status and timing.</li>
            <li><strong>Metrics:</strong> Prometheus metrics for the operator to scrape. OpenTelemetry export is off by default and, if enabled, sends data only to the endpoint the operator configures.</li>
          </ul>
          <p>Retention, backups, access control and deletion are controlled by the operator.</p>
        </section>

        <section id="services">
          <h2>Third-party services the server contacts</h2>
          <p>The server only makes outbound requests to services the operator enables or configures, for example:</p>
          <ul>
            <li><strong>Metadata providers:</strong> TMDB, TheTVDB, TVmaze, MusicBrainz, the Cover Art Archive and IMDb. Requests contain search terms and IDs for titles, plus the operator&apos;s API key where required.</li>
            <li><strong>Indexers:</strong> Newznab/Torznab, Cardigann definitions (downloaded from the source the operator configures), Jackett/Prowlarr, and optional proxies or FlareSolverr.</li>
            <li><strong>Download clients:</strong> qBittorrent, Deluge, Transmission, SABnzbd, NZBGet, or the built-in torrent client, which, like any BitTorrent client, exchanges data with trackers and peers.</li>
            <li><strong>Media servers and sync:</strong> Plex, Jellyfin, Emby and Trakt.</li>
            <li><strong>Notifications and bots:</strong> Discord, Telegram, Slack, email (SMTP), Pushover, Gotify, ntfy, Apprise and custom webhooks.</li>
            <li><strong>Plugins:</strong> operator-installed plugins can make their own network requests.</li>
          </ul>
          <p>Each service processes data under its own privacy policy and terms.</p>
        </section>

        <section id="browser">
          <h2>Requests made by your browser</h2>
          <p>The web UI loads poster and backdrop images directly from TMDB (<code>image.tmdb.org</code>) and music artwork from the Cover Art Archive (<code>coverartarchive.org</code>), so those services can see the viewer&apos;s IP address and browser details. Links to external sites such as TMDB, IMDb, TVmaze or GitHub are only contacted if you open them.</p>
        </section>

        <section id="loom-tv">
          <h2>Loom TV (Android TV app)</h2>
          <p>Loom TV is a client for <strong>your own</strong> Loom server.</p>
          <ul>
            <li><strong>Stored on the device:</strong> the server URL, whether plain HTTP was allowed, and the API key from pairing or manual setup. The API key is encrypted with a key held in the Android Keystore, and app data is excluded from Android cloud backup and device transfer.</li>
            <li><strong>Network access:</strong> the app only talks to your configured Loom server. It contains no analytics, ads, crash reporting or third-party SDKs, and requests only the <code>INTERNET</code> permission.</li>
            <li><strong>TV inputs:</strong> the app reads the list of visible TV inputs (HDMI/AV) so you can launch them. This list stays on the device.</li>
            <li><strong>Transport security:</strong> traffic is encrypted in transit only if your server uses HTTPS. Plain HTTP requires explicit consent; over HTTP, the API key and data can be read by others on the network.</li>
            <li><strong>Deleting data:</strong> clear the server configuration or app storage, or uninstall the app, and revoke the TV&apos;s API key on your server.</li>
          </ul>
        </section>

        <section id="rights">
          <h2>Your rights</h2>
          <p>Because each Loom instance is operated independently, requests to access, correct, delete or object to the processing of your personal information (for example under South Africa&apos;s POPIA or the EU/UK GDPR) must be made to <strong>the operator of the Loom instance you use</strong>. The Loom project does not hold your data and cannot access any instance.</p>
          <p>If you operate Loom for other people, you are responsible for giving them appropriate privacy information, securing the instance (including using HTTPS) and honouring their rights.</p>
          <p>Loom is not directed at children, and the Loom project does not knowingly collect personal information from anyone.</p>
        </section>

        <section id="contact">
          <h2>Changes and contact</h2>
          <p>Changes to this notice are published on this page with an updated effective date. Questions: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>. Report security vulnerabilities using the <a href={`${sourceRepository}/security/policy`}>security policy</a>.</p>
        </section>
      </div>
    </article>
  )
}
