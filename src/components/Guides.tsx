import { ArrowUpRight } from 'lucide-react'
import { pages, sourceRepository, type Page } from '../site'
import CodeBlock from './CodeBlock'

const sourceRevision = 'd256d3a6b371429998ceb6d57d86e51369098474'
const reference = `${sourceRepository}/blob/${sourceRevision}/docs`

const compose = `services:
  loom:
    image: ghcr.io/ebenderooock/loom:latest
    user: "\${LOOM_UID:?Set LOOM_UID in .env}:\${LOOM_GID:?Set LOOM_GID in .env}"
    ports:
      - "127.0.0.1:1925:1925"
    environment:
      LOOM_CONFIG_DIR: /config
      LOOM_DATA_DIR: /config
      LOOM_STORAGE_SQLITE_PATH: /config/loom.db
    volumes:
      - ./config:/config
      - ./media:/media
    restart: unless-stopped`

function DockerGuide() {
  return (
    <>
      <nav className="guide-contents" aria-label="On this page">
        <a href="#prepare">Prepare storage</a>
        <a href="#compose">Compose configuration</a>
        <a href="#health">Start and check</a>
        <a href="#permissions">Troubleshoot</a>
        <a href="#updates">Back up and update</a>
      </nav>
      <section id="prepare">
        <h2>Start with a separate test library</h2>
        <p>Loom manages movie and TV metadata, indexers, download workflows and library imports on your server. It is pre-release software: APIs and database schemas can change. Test with media you have permission to use, not the only copy of your existing library.</p>
        <p>This example is for a Linux or macOS shell with Docker Engine or Docker Desktop and the Docker Compose plugin installed. Confirm <code>docker compose version</code> works first. It starts Loom only, not a torrent engine, indexer or media-streaming server.</p>
        <p>In a new, empty working directory, create persistent storage and a local <code>.env</code> file. The numeric IDs make the container write files as your host user rather than root. Do not overwrite an existing deployment&apos;s environment file; on a NAS or another host, use the account and permissions appropriate for that system.</p>
        <CodeBlock title="Prepare a test workspace" code={`mkdir -p loom-test/config loom-test/media/downloads loom-test/media/movies
cd loom-test
printf 'LOOM_UID=%s\\nLOOM_GID=%s\\n' "$(id -u)" "$(id -g)" > .env`} />
      </section>
      <section id="compose">
        <h2>Save the Docker Compose configuration</h2>
        <p>Save the following as <code>compose.yaml</code> beside <code>.env</code>. The example explicitly keeps the SQLite database under the persisted configuration directory and binds the UI to this computer&apos;s loopback address. It does not expose Loom to the public internet.</p>
        <CodeBlock title="compose.yaml" code={compose} />
        <dl className="guide-definitions">
          <div><dt><code>./config → /config</code></dt><dd>Configuration and state, including <code>loom.db</code>. Keep this directory between container updates and include it in backups.</dd></div>
          <div><dt><code>./media → /media</code></dt><dd>A test media tree. Later, mount the same files at consistent container paths in Loom and your download client.</dd></div>
          <div><dt><code>127.0.0.1:1925:1925</code></dt><dd>Local access on port 1925. On a remote server, use an SSH tunnel or a deliberately configured, authenticated TLS reverse proxy; your browser&apos;s localhost is not the remote machine.</dd></div>
        </dl>
        <p>The <code>latest</code> image is a moving release channel, not a promise of stable software. Read the selected release&apos;s notes before testing. For reproducible deployments, pin an actual published image digest or tag from the <a href={`${sourceRepository}/releases`}>release page</a>; do not guess a version number.</p>
      </section>
      <section id="health">
        <h2>Start Loom and check server health</h2>
        <CodeBlock title="Validate, pull and start" code={`docker compose config --quiet
docker compose pull
docker compose up -d
docker compose ps
curl --fail http://localhost:1925/healthz`} />
        <p>Open <a href="http://localhost:1925">http://localhost:1925</a> on the Docker host. Follow the authentication setup for your selected build. A successful health response confirms the server is reachable; it does not mean an indexer, download client or import workflow has been configured.</p>
        <p>Before enabling automation, choose a library folder under <code>/media</code>, configure your quality preferences and connect a source you are authorized to use. Continue with the <a href="/guides/media-downloads/">media downloads and library imports guide</a> for client connectivity, shared paths and a first controlled test.</p>
      </section>
      <section id="permissions">
        <h2>If the server does not start</h2>
        <p>Run <code>docker compose logs --tail=100 loom</code> locally and inspect the first startup error. Redact credentials, tokens, private URLs and personal paths before sharing diagnostics.</p>
        <ul>
          <li><strong>Permission denied:</strong> check that <code>LOOM_UID</code> and <code>LOOM_GID</code> identify the intended host account and that it can write to both bind mounts. Fix ownership or ACLs for that account; do not make the directories world-writable.</li>
          <li><strong>Port already allocated:</strong> change only the host port, for example to <code>127.0.0.1:1926:1925</code>, then use <code>http://localhost:1926</code>.</li>
          <li><strong>Connection refused:</strong> check <code>docker compose ps</code> and the logs before retrying. When Docker is remote, connect through that host rather than your own machine&apos;s localhost.</li>
          <li><strong>Download client unavailable:</strong> this Compose file contains only Loom. It does not install qBittorrent or the Rain sidecar. Connect a configured external client or follow the project&apos;s Rain deployment reference.</li>
        </ul>
      </section>
      <section id="updates">
        <h2>Back up before changing images</h2>
        <p>For this SQLite example, stop Loom with <code>docker compose stop loom</code> before copying the complete configuration directory, including any database sidecar files. Back up the Compose file, environment settings and media separately. Treat backups as sensitive and verify that they can be restored in an isolated test instance.</p>
        <p>After reviewing release notes and making a backup, pull the intended image and recreate the service. Record the previous image digest. Reverting an image does not reverse database migrations; rollback may require restoring the matching backup. Never run two instances against the same writable SQLite database.</p>
        <p>PostgreSQL, reverse proxies and alternate deployment shapes have different operational requirements. Use the <a href={`${sourceRepository}/blob/main/docs/deployment.md`}>deployment reference</a> and <a href={`${sourceRepository}/blob/main/docs/configuration.md`}>configuration reference</a> for your build rather than treating this introductory example as a production hardening guide.</p>
      </section>
      <aside className="guide-sources" aria-label="Guide sources">
        <h2>Sources and scope</h2>
        <p>Written against the project&apos;s <a href={`${reference}/deployment.md`}>deployment</a> and <a href={`${reference}/configuration.md`}>configuration documentation</a> at a fixed source revision, checked on 4 November 2026. This is a documented setup example, not a claim that every operating system, storage driver or release has been tested.</p>
      </aside>
    </>
  )
}

function DownloadsGuide() {
  return (
    <>
      <nav className="guide-contents" aria-label="On this page">
        <a href="#responsibilities">What Loom does</a>
        <a href="#client">Connect qBittorrent</a>
        <a href="#paths">Shared paths</a>
        <a href="#first-import">First import</a>
        <a href="#diagnostics">Troubleshoot</a>
      </nav>
      <section id="responsibilities">
        <h2>Separate the source, client and library</h2>
        <p>Loom coordinates media downloads; it does not provide a catalogue of movie files or distribute commercial films. Your configured indexer finds releases, your download client transfers files, and Loom tracks the workflow and imports completed media into your library.</p>
        <p>Use sources and files you have permission to access and share. Movie torrents can contain openly licensed or public-domain works, but BitTorrent itself grants no rights. Check the actual licence, source and law in your jurisdiction. The <a href="/#film-credits">openly licensed films credited on our home page</a> illustrate why permissions matter; their appearance here is not an endorsement of Loom by the filmmakers.</p>
        <p>Before configuring downloads, <a href="/guides/docker/">install Loom with persistent storage</a> and keep this test separate from a live library. Loom remains pre-release. Integration behavior can differ by build; consult the references for your version.</p>
      </section>
      <section id="client">
        <h2>Connect and test a qBittorrent client</h2>
        <p>The project documents qBittorrent&apos;s v2 Web API for versions 4.1 and later, including 5.x. Add a download client as an administrator in Loom using the <code>qbittorrent</code> kind. Use your real client&apos;s settings, not example credentials from a tutorial.</p>
        <dl className="guide-definitions">
          <div><dt>Host and port</dt><dd>The qBittorrent Web UI address reachable <em>from Loom</em>. On a shared Compose network, this can be the service name <code>qbittorrent</code> and its internal Web UI port. In separate containers, <code>localhost</code> refers to Loom&apos;s own container, not qBittorrent.</dd></div>
          <div><dt>TLS and base path</dt><dd>Match the client&apos;s actual URL. A proxy mounted at <code>/qbt/</code> needs that base path; it is not the filesystem download path.</dd></div>
          <div><dt>Credentials</dt><dd>Use the Web UI account configured on your client. Keep its credentials private and its management API off the public internet.</dd></div>
          <div><dt>Category and save path</dt><dd>Choose a category such as <code>loom</code> and a download directory the client can write. Configure the category in qBittorrent; do not assume Loom provisions it for you.</dd></div>
        </dl>
        <p>Use the client connection test before submitting a release. The documented API endpoint is <code>POST /api/v1/download-clients/&#123;id&#125;/test</code>; administrator access is required. A successful test checks connectivity and credentials, not whether Loom can read completed files.</p>
        <p>The Rain-backed <code>builtin/torrent</code> driver is a separate option. It communicates with a Rain sidecar over JSON-RPC; there is no in-process torrent engine inside the Loom binary. Keep its RPC endpoint internal and configure a shared download directory. Built-in Usenet downloading remains deferred; external-client setup has its own requirements.</p>
      </section>
      <section id="paths">
        <h2>Make completed files visible to both containers</h2>
        <p>A working network connection does not solve filesystem access. For example, mount a host directory such as <code>/srv/media</code> at <code>/media</code> in both Loom and qBittorrent. Then use <code>/media/downloads</code> for transfers and <code>/media/movies</code> for the organized library.</p>
        <CodeBlock title="Path layout inside both containers" code={`/media/
  downloads/    # download client writes here; Loom can read it
  movies/       # Loom imports and organizes here`} />
        <p>If qBittorrent reports <code>/downloads/example.mkv</code> but Loom sees that file under <code>/media/downloads/example.mkv</code>, the two paths do not match. Align mounts where practical or configure an appropriate remote path mapping in your build. A mapping translates paths; it does not mount files or grant permissions.</p>
        <p>Hardlinks need source and destination on the same filesystem with a layout that permits linking, and the Loom process needs the appropriate permissions. Matching path strings alone are not sufficient. Separate mounts or filesystems may require copies, additional space and different import settings. Keep the download client&apos;s seeding requirements in mind before moving or deleting originals.</p>
      </section>
      <section id="first-import">
        <h2>Run one controlled search-to-import test</h2>
        <ol>
          <li>Add a movie or episode you are authorized to obtain. Select a test library folder and review its quality profile and language preferences.</li>
          <li>Configure an authorized indexer and test it separately from the download client. Search manually and review results before enabling recurring automation.</li>
          <li>Choose an appropriate release and track its progress in Loom and the download client. A queued item is not yet a completed library import.</li>
          <li>After completion, confirm that Loom can read the reported source path and write to the library destination. Review any manual-import or collision message rather than forcing an overwrite.</li>
          <li>Check the destination file, library entry and ongoing seeding behavior. Only expand automation after this path works with your selected build and storage layout.</li>
        </ol>
        <p>Do not use the <code>builtin/null</code> test driver as evidence of a working download: it is a no-op client. Similarly, a healthy Loom server or a successful client test does not prove that indexer search and library import are configured.</p>
      </section>
      <section id="diagnostics">
        <h2>Diagnose the stage that failed</h2>
        <dl className="guide-definitions">
          <div><dt>No search results</dt><dd>Check indexer health, authentication, categories and query diagnostics first. Then review quality and language preferences. Do not disable validation indiscriminately to make a result pass.</dd></div>
          <div><dt>Client test fails</dt><dd>Check the host from inside Loom&apos;s network, port, TLS, base path and account. A reverse-proxy path mismatch or qBittorrent host validation can cause 401/403 responses. Repeated bad logins can temporarily ban the calling IP; fix the configuration before retrying.</dd></div>
          <div><dt>Download complete, import missing</dt><dd>Compare the exact path reported by the client with the file visible to Loom. Check directory permissions, free space and any remote mapping. Then inspect the workflow or manual-review reason.</dd></div>
          <div><dt>Destination already exists</dt><dd>The documented import behavior preserves files on collision. Review the existing file and import policy rather than deleting it or repeatedly retrying. Automatic replacement requires the configured preservation behavior to succeed.</dd></div>
        </dl>
        <p>Use the <a href={`${sourceRepository}/blob/main/docs/downloads-qbittorrent.md`}>qBittorrent reference</a> and <a href={`${sourceRepository}/blob/main/docs/downloads.md`}>download-client reference</a> for build-specific details. Redact secrets and private addresses from logs before reporting a reproducible issue.</p>
      </section>
      <aside className="guide-sources" aria-label="Guide sources">
        <h2>Sources and scope</h2>
        <p>Checked on 4 November 2026 against the project&apos;s <a href={`${reference}/downloads.md`}>download-client</a>, <a href={`${reference}/downloads-qbittorrent.md`}>qBittorrent</a> and <a href={`${reference}/deployment.md`}>deployment documentation</a> at a fixed source revision. This guide focuses on an operator&apos;s setup and diagnosis, not a guarantee of universal integration compatibility.</p>
      </aside>
    </>
  )
}

export default function Guides({ page }: { page: Page }) {
  const isArticle = page.kind === 'docker' || page.kind === 'downloads'

  return (
    <article className="page-shell guide-page">
      <nav className="guide-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Loom</a><span aria-hidden="true">/</span>
        {isArticle ? <><a href="/guides/">Guides</a><span aria-hidden="true">/</span><span aria-current="page">{page.kind === 'docker' ? 'Docker setup' : 'Media downloads'}</span></> : <span aria-current="page">Guides</span>}
      </nav>
      <header className="guide-heading">
        <span className="eyebrow">Loom operator guides · Pre-release</span>
        <h1>{page.heading}</h1>
        <p>{page.description}</p>
      </header>
      {page.kind === 'guides' ? (
        <>
          <div className="guide-list">
            {pages.filter(item => item.kind === 'docker' || item.kind === 'downloads').map(item => (
              <a className="roadmap-card" href={item.path} key={item.path}>
                <h2>{item.heading}<ArrowUpRight size={20} aria-hidden="true" /></h2>
                <p>{item.description}</p>
              </a>
            ))}
          </div>
          <div className="guide-body">
            <section>
              <h2>For people running their own media library</h2>
              <p>These guides connect the practical pieces: persistent state, client connectivity, shared filesystem paths and a controlled first import. Start with Docker setup if you are new to Loom. If the server is already running, work through media downloads to identify which part of the pipeline needs attention.</p>
              <p>Loom is open-source, self-hosted media management software, not a streaming service or a source of movie files. Use media you have permission to download and share. The software is pre-release; keep backups, start with a test library and check the documentation for your build.</p>
              <p>Need the complete API and configuration surface? Read the <a href={`${sourceRepository}/tree/main/docs`}>project documentation on GitHub</a>. For capabilities and planned work, see the <a href="/#features">platform overview</a> and <a href="/#roadmap">roadmap</a>.</p>
            </section>
          </div>
        </>
      ) : (
        <div className="guide-body">
          {page.kind === 'docker' ? <DockerGuide /> : <DownloadsGuide />}
          <nav className="guide-related" aria-label="Related guide">
            <span className="eyebrow">Continue the workflow</span>
            <a href={page.kind === 'docker' ? '/guides/media-downloads/' : '/guides/docker/'}>
              {page.kind === 'docker' ? 'Configure media downloads and library imports' : 'Install Loom with Docker Compose'} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </article>
  )
}
