import { contactEmail, sourceRepository, type Page } from '../site'
import { openCookieSettings } from '../analytics'

const effectiveDate = '4 November 2026'
const appPrivacyNotice = '/privacy/app/'

function CookieSettingsLink() {
  return (
    <a
      href="#cookies"
      onClick={event => {
        event.preventDefault()
        openCookieSettings()
      }}
    >
      Cookie settings
    </a>
  )
}

export default function Privacy({ page }: { page: Page }) {
  return (
    <article className="page-shell guide-page">
      <nav className="guide-breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Loom</a><span aria-hidden="true">/</span><span aria-current="page">Privacy</span>
      </nav>
      <header className="guide-heading">
        <span className="eyebrow">Effective {effectiveDate}</span>
        <h1>{page.heading}</h1>
        <p>This policy explains what personal information is processed when you visit loom.deroock.co.za, why, and the choices you have. It is written to be read, not skimmed past.</p>
      </header>
      <div className="guide-body">
        <nav className="guide-contents" aria-label="On this page">
          <a href="#who">Who we are</a>
          <a href="#collected">What is collected</a>
          <a href="#cookies">Cookies and storage</a>
          <a href="#processors">Service providers</a>
          <a href="#rights">Your rights</a>
          <a href="#contact">Contact</a>
        </nav>

        <section id="who">
          <h2>Who operates this website</h2>
          <p>This website is operated by <strong>Eben de Roock</strong>, an individual based in South Africa, who is the responsible party (data controller) for the personal information described here. Contact: <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
          <p>This policy covers only the marketing website at <code>loom.deroock.co.za</code>. Loom is self-hosted software: when you run your own Loom instance, it stays on your infrastructure. <strong>This website does not receive, collect or process any data from self-hosted Loom instances.</strong> How the Loom application itself handles data is described in the separate <a href={appPrivacyNotice}>Loom application privacy notice</a>.</p>
        </section>

        <section id="collected">
          <h2>What is collected and why</h2>
          <p>There are no accounts, forms, comments or newsletters on this website. We do not sell personal information or use it for advertising.</p>
          <ul>
            <li><strong>Cloudflare request logs (always).</strong> The site is hosted on Cloudflare. To deliver pages and protect the site from abuse, Cloudflare processes technical data about each request, such as your IP address, browser user agent, requested URL, referrer and time. Legal basis: our legitimate interest in operating a secure, reliable website (POPIA section 11(1)(f); GDPR Article 6(1)(f)).</li>
            <li><strong>Cloudflare Web Analytics (always, cookieless).</strong> A small Cloudflare script measures aggregate statistics such as page views, referrers, countries and page-load performance. It does not use cookies or local storage and does not build a profile of you or track you across sites. Legal basis: legitimate interest in understanding, in aggregate, how the site is used.</li>
            <li><strong>Google Analytics 4 (only if you accept).</strong> If you choose &ldquo;Accept analytics&rdquo;, Google Analytics 4 collects usage data such as pages viewed, approximate location, device and browser type, and interactions, to give us aggregate usage statistics. Google signals and advertising features are disabled, and advertising consent signals always remain &ldquo;denied&rdquo;. Google Analytics 4 does not log or store IP addresses; Google uses the IP address only briefly to derive approximate location before discarding it. Legal basis: your consent (POPIA section 11(1)(a); GDPR Article 6(1)(a)), which you can withdraw at any time. If you do not accept, the Google Analytics script is not loaded at all.</li>
          </ul>
          <p>We do not knowingly collect information from children, and we do not process special personal information.</p>
        </section>

        <section id="cookies">
          <h2>Cookies and browser storage</h2>
          <dl className="guide-definitions">
            <div><dt><code>loom-cookie-consent</code> (local storage, this site)</dt><dd>Remembers whether you accepted or rejected analytics so we do not ask on every page. Strictly necessary for honouring your choice; kept until you clear your browser storage or change your choice.</dd></div>
            <div><dt><code>_ga</code> (Google, only with consent)</dt><dd>Distinguishes visitors for aggregate statistics. Set to expire after about 13 months.</dd></div>
            <div><dt><code>_ga_&lt;ID&gt;</code> (Google, only with consent)</dt><dd>Keeps session state for the site&apos;s Google Analytics property. Set to expire after about 13 months.</dd></div>
          </dl>
          <p>Cloudflare may set strictly necessary security cookies (for example, <code>__cf_bm</code> for bot management, lasting about 30 minutes) when it detects suspicious traffic. Cloudflare Web Analytics sets no cookies.</p>
          <p><strong>Changing or withdrawing consent:</strong> use the <CookieSettingsLink /> link in the footer of any page. If you reject or withdraw consent, Google Analytics is switched off and its <code>_ga</code> cookies are deleted from your browser. Withdrawal does not affect processing that happened before it.</p>
        </section>

        <section id="processors">
          <h2>Service providers and international transfers</h2>
          <p>We use two service providers (operators/processors) who process data on our behalf:</p>
          <ul>
            <li><strong>Cloudflare, Inc.</strong> (United States) — hosting, content delivery, security and Web Analytics. See the <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare privacy policy</a>.</li>
            <li><strong>Google LLC / Google Ireland Limited</strong> — Google Analytics 4, only with your consent. See <a href="https://policies.google.com/privacy">Google&apos;s privacy policy</a> and <a href="https://business.safety.google/adsprocessorterms/">data processing terms</a>.</li>
          </ul>
          <p>Both providers operate global networks, so your information may be processed outside South Africa, the European Economic Area or the United Kingdom, including in the United States. These transfers rely on the providers&apos; contractual safeguards, such as their data processing terms incorporating Standard Contractual Clauses and, where applicable, certification under the EU–US Data Privacy Framework, which provide protection comparable to POPIA section 72 and GDPR Chapter V.</p>
        </section>

        <section id="retention">
          <h2>How long information is kept</h2>
          <ul>
            <li>Cloudflare request and security logs are kept for short, limited periods under Cloudflare&apos;s own policies.</li>
            <li>Cloudflare Web Analytics data is aggregated and kept by Cloudflare for a limited period under its own retention policy.</li>
            <li>Google Analytics event data is kept for no more than 14 months, after which it is deleted automatically; aggregate reports may be kept longer because they do not identify anyone.</li>
            <li>Emails you send us are kept only as long as needed to respond and for related record-keeping.</li>
          </ul>
        </section>

        <section id="rights">
          <h2>Your rights</h2>
          <p>Under South Africa&apos;s Protection of Personal Information Act (POPIA), you may ask whether we hold personal information about you and request access to it, ask us to correct or delete it, object to processing based on legitimate interest, and withdraw consent at any time. If you are in the European Economic Area or the United Kingdom, the GDPR or UK GDPR also gives you rights of access, rectification, erasure, restriction, data portability and objection.</p>
          <p>Because this site does not identify visitors, we may only be able to act on a request if you give us enough information to locate the data, and in many cases we will hold none. To exercise a right, email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>; we aim to respond within 30 days.</p>
          <p>You may complain to South Africa&apos;s <a href="https://inforegulator.org.za">Information Regulator</a>, or to the data protection authority where you live or work (in the UK, the <a href="https://ico.org.uk">Information Commissioner&apos;s Office</a>). We would appreciate the chance to address your concern first.</p>
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <p>For privacy questions or requests, and any other questions about this website: <a href={`mailto:${contactEmail}`}>{contactEmail}</a> (Eben de Roock, South Africa).</p>
          <p>Report security vulnerabilities in Loom using the <a href={`${sourceRepository}/security/policy`}>security policy</a>. For questions about the software, use <a href={`${sourceRepository}/discussions`}>GitHub Discussions</a>.</p>
        </section>

        <section id="changes">
          <h2>Changes to this policy</h2>
          <p>If how this website handles personal information changes, we will update this page and its effective date. If a change requires your consent, such as a new type of analytics cookie, we will ask again. Effective date: {effectiveDate}.</p>
        </section>
      </div>
    </article>
  )
}
