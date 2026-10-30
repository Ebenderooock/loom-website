import { useState } from 'react'
import { ArrowUpRight, Terminal } from 'lucide-react'
import CodeBlock from './CodeBlock'

const installMethods = [
  {
    title: 'Docker',
    code: `docker run --rm -p 1925:1925 \\
  -v /opt/loom/config:/config \\
  -v /mnt/media:/media \\
  ghcr.io/ebenderooock/loom:latest`,
  },
  {
    title: 'Docker Compose',
    code: `services:
  loom:
    image: ghcr.io/ebenderooock/loom:latest
    container_name: loom
    ports:
      - "1925:1925"
    volumes:
      - ./config:/config
      - /mnt/media:/media
    restart: unless-stopped`,
  },
  {
    title: 'From source',
    code: `git clone https://github.com/Ebenderooock/loom.git
cd loom
make build
mkdir -p ./run
LOOM_CONFIG_DIR=./run LOOM_DATA_DIR=./run \\
  LOOM_STORAGE_SQLITE_PATH=./run/loom.db \\
  ./dist/loom serve`,
  },
]

export default function GettingStarted() {
  const [methodIndex, setMethodIndex] = useState(0)
  const method = installMethods[methodIndex]

  return (
    <section id="getting-started" className="section-space quickstart-section">
      <div className="page-shell quickstart-layout">
        <div className="section-heading">
          <span className="eyebrow"><Terminal size={15} /> On your own terms</span>
          <h2>Make room<br /><em>for Loom.</em></h2>
          <p>Run a container or build from source. Adjust the configuration and media paths for your server before starting.</p>
          <p className="quickstart-warning">Pre-release software. Back up existing data before testing or migrating; APIs and database schemas may change.</p>
          <a className="text-link" href="https://github.com/Ebenderooock/loom/blob/main/docs/deployment.md">Deployment guide <ArrowUpRight size={16} /></a>
        </div>
        <div className="install-panel">
          <div className="install-switch" aria-label="Installation method">
            {installMethods.map((item, index) => <button key={item.title} onClick={() => setMethodIndex(index)} aria-pressed={index === methodIndex}>{item.title}</button>)}
          </div>
          <CodeBlock key={method.title} title={method.title} code={method.code} />
          <div className="install-next">
            <p>Then open <a href="http://localhost:1925" className="text-link">localhost:1925</a>. Check server health at <a href="http://localhost:1925/healthz" className="text-link">/healthz</a>.</p>
            <p>{methodIndex === 2 ? 'Source builds require Go 1.26+ and Make. ' : 'The latest image follows tagged releases. '}See the <a href="https://github.com/Ebenderooock/loom/blob/main/docs/configuration.md" className="text-link">configuration reference</a> for your setup.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
