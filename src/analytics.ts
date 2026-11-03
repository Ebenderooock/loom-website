// Browser-only analytics helpers. Nothing here touches `window` at import time,
// so the module is safe to load during prerendering.

export const CONSENT_STORAGE_KEY = 'loom-cookie-consent'
export const OPEN_COOKIE_SETTINGS_EVENT = 'loom:open-cookie-settings'
export const CONSENT_CHANGE_EVENT = 'loom:consent-change'

export type ConsentChoice = 'accepted' | 'declined'

const rawMeasurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID ?? '').trim()
export const gaMeasurementId = /^G-[A-Z0-9]+$/i.test(rawMeasurementId) ? rawMeasurementId.toUpperCase() : ''

// About 13 months, instead of Google's two-year default.
const GA_COOKIE_EXPIRES_SECONDS = 60 * 60 * 24 * 395

type ZarazConsent = {
  setAll?: (granted: boolean) => void
  sendQueuedEvents?: () => void
}

declare global {
  interface ImportMetaEnv {
    readonly VITE_GA_MEASUREMENT_ID?: string
    readonly VITE_CF_WEB_ANALYTICS_TOKEN?: string
  }
  interface Window {
    zaraz?: { consent?: ZarazConsent }
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

export function hasZaraz() {
  return typeof window !== 'undefined' && Boolean(window.zaraz?.consent)
}

/** Whether there is anything optional to ask consent for. */
export function consentRequired() {
  return Boolean(gaMeasurementId) || hasZaraz()
}

export function readConsent(): ConsentChoice | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (stored === 'accepted' || stored === 'declined') return stored
  } catch {
    /* storage blocked (private mode) — treat as no choice yet */
  }
  return null
}

export function storeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice)
  } catch {
    /* ignore persistence failure; the choice still applies to this page view */
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))
}

function gtag(...args: unknown[]) {
  window.gtag?.(...args)
}

let consentDefaultsSet = false
let gaLoaded = false

/** Consent Mode v2 defaults: everything denied until the visitor accepts. */
function ensureConsentDefaults() {
  if (consentDefaultsSet) return
  consentDefaultsSet = true
  window.dataLayer = window.dataLayer ?? []
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js requires the Arguments object itself, not an array copy.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  }
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('set', 'ads_data_redaction', true)
}

function grantGoogleAnalytics() {
  if (!gaMeasurementId) return
  ensureConsentDefaults()
  window[`ga-disable-${gaMeasurementId}`] = false
  gtag('consent', 'update', { analytics_storage: 'granted' })
  if (gaLoaded) return
  gaLoaded = true
  gtag('js', new Date())
  // The site uses full page loads, so this config sends one page_view per page.
  gtag('config', gaMeasurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: GA_COOKIE_EXPIRES_SECONDS,
  })
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`
  document.head.appendChild(script)
}

function deleteGoogleAnalyticsCookies() {
  const names = document.cookie.split(';')
    .map(cookie => cookie.split('=')[0].trim())
    .filter(name => name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat')
  if (!names.length) return
  const labels = window.location.hostname.split('.')
  const domains = ['']
  for (let index = 0; index < labels.length - 1; index++) {
    domains.push(`; domain=.${labels.slice(index).join('.')}`)
  }
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`
    }
  }
}

function denyGoogleAnalytics() {
  if (!gaMeasurementId) return
  window[`ga-disable-${gaMeasurementId}`] = true
  if (consentDefaultsSet) gtag('consent', 'update', { analytics_storage: 'denied' })
  deleteGoogleAnalyticsCookies()
}

function applyZarazConsent(granted: boolean) {
  const consent = window.zaraz?.consent
  if (!consent) return
  try {
    consent.setAll?.(granted)
    if (granted) consent.sendQueuedEvents?.()
  } catch {
    /* Zaraz not fully initialised — safe to ignore */
  }
}

export function applyConsent(choice: ConsentChoice) {
  const granted = choice === 'accepted'
  if (granted) grantGoogleAnalytics()
  else denyGoogleAnalytics()
  applyZarazConsent(granted)
}
