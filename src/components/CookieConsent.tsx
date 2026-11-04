import { useEffect, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  OPEN_COOKIE_SETTINGS_EVENT,
  applyConsent,
  consentRequired,
  readConsent,
  storeConsent,
  type ConsentChoice,
} from '../analytics'

type Snapshot = ConsentChoice | 'pending' | 'not-required'

function getSnapshot(): Snapshot {
  if (!consentRequired()) return 'not-required'
  return readConsent() ?? 'pending'
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === CONSENT_STORAGE_KEY) onChange()
  }
  window.addEventListener('storage', onStorage)
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onStorage)
    window.removeEventListener(CONSENT_CHANGE_EVENT, onChange)
  }
}

const buttonBase = 'flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950'
const choiceButton = `${buttonBase} border-zinc-600 bg-zinc-800/60 text-white hover:bg-zinc-700`

export default function CookieConsent() {
  // Storage and Zaraz are browser-only; render nothing until after hydration.
  const state = useSyncExternalStore(subscribe, getSnapshot, () => 'not-required' as Snapshot)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    if (state === 'accepted' || state === 'declined') applyConsent(state)
  }, [state])

  useEffect(() => {
    const open = () => setSettingsOpen(true)
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, open)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, open)
  }, [])

  const decide = (next: ConsentChoice) => {
    storeConsent(next)
    applyConsent(next)
    setSettingsOpen(false)
  }

  const visible = state === 'pending' || settingsOpen
  const optional = state !== 'not-required'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-[120] sm:max-w-sm"
        >
          <div className="glass rounded-2xl border border-brand-purple/20 p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="feature-icon-wrap mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                <Cookie size={18} className="text-brand-purple" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id="cookie-consent-title" className="text-sm font-semibold text-white">
                  {optional ? 'Allow analytics cookies?' : 'Cookie settings'}
                </h2>
                <div id="cookie-consent-desc" className="mt-1 space-y-2 text-xs leading-relaxed text-zinc-400">
                  {optional ? (
                    <>
                      <p>
                        With your permission, we use Google Analytics 4 (provided by Google) to
                        collect aggregate usage statistics, such as which pages are visited. It sets
                        the <code>_ga</code> and <code>_ga_&lt;ID&gt;</code> cookies, which expire after
                        about 13 months. Ad features and Google signals are off.
                      </p>
                      <p>
                        Rejecting does not affect the site. Cookieless Cloudflare statistics are always
                        on. {state === 'accepted' ? 'You currently allow analytics.' : state === 'declined' ? 'You currently reject analytics.' : ''}{' '}
                        <a className="underline hover:text-white" href="/privacy/">Privacy policy</a>
                      </p>
                    </>
                  ) : (
                    <p>
                      This site does not set optional cookies. It only uses cookieless, aggregate
                      Cloudflare statistics. <a className="underline hover:text-white" href="/privacy/">Privacy policy</a>
                    </p>
                  )}
                </div>
              </div>
              {(!optional || state !== 'pending') && (
                <button
                  onClick={() => setSettingsOpen(false)}
                  aria-label="Close cookie settings"
                  className="shrink-0 text-zinc-500 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            {optional && (
              <div className="mt-4 flex items-center gap-2.5">
                <button onClick={() => decide('accepted')} aria-pressed={state === 'accepted'} className={choiceButton}>
                  Accept analytics
                </button>
                <button onClick={() => decide('declined')} aria-pressed={state === 'declined'} className={choiceButton}>
                  Reject
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
