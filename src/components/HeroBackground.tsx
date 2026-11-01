import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Pause, Play } from 'lucide-react'
import { backgroundClips } from './backgroundClips'

type NetworkInformation = EventTarget & { saveData?: boolean; effectiveType?: string }

const motionQuery = '(prefers-reduced-motion: no-preference) and (min-width: 801px)'

function connection() {
  return (navigator as Navigator & { connection?: NetworkInformation }).connection
}

function canAnimate() {
  const network = connection()
  return window.matchMedia(motionQuery).matches && !network?.saveData &&
    !['slow-2g', '2g', '3g'].includes(network?.effectiveType ?? '')
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(motionQuery)
  const network = connection()
  media.addEventListener('change', onChange)
  network?.addEventListener('change', onChange)
  return () => {
    media.removeEventListener('change', onChange)
    network?.removeEventListener('change', onChange)
  }
}

export default function HeroBackground() {
  const eligible = useSyncExternalStore(subscribe, canAnimate, () => false)
  const [paused, setPaused] = useState(false)
  const [failed, setFailed] = useState(false)
  const mediaRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(paused)
  const updateRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    pausedRef.current = paused
    updateRef.current?.()
  }, [paused])

  useEffect(() => {
    const media = mediaRef.current
    if (!media || !eligible || failed) return
    const videos = Array.from(media.querySelectorAll('video'))
    let visible = false
    let disposed = false
    let active = 0
    let clip = 0
    let incoming: number | null = null
    let fading = false
    let fadeTimer: ReturnType<typeof setTimeout> | undefined
    const mayPlay = () => visible && !document.hidden && !pausedRef.current
    const fail = (error: unknown) => {
      if (disposed || (error instanceof DOMException && error.name === 'AbortError')) return
      console.warn('Background rotation unavailable; using the static poster.', error)
      setFailed(true)
    }
    const play = (video: HTMLVideoElement) => {
      if (video.paused && !video.ended) void video.play().catch(fail)
    }
    const load = (slot: number, index: number) => {
      videos[slot].preload = 'auto'
      videos[slot].src = `/media/${backgroundClips[index].id}-ambient.mp4`
      videos[slot].load()
    }
    const prepareNext = () => {
      const video = videos[active]
      if (!mayPlay() || incoming !== null || fading || !Number.isFinite(video.duration) ||
        video.currentTime < video.duration - 1.2) return
      incoming = 1 - active
      load(incoming, (clip + 1) % backgroundClips.length)
    }
    const updatePlayback = () => {
      if (!mayPlay()) {
        videos.forEach(video => video.pause())
        return
      }
      if (!videos[active].getAttribute('src')) load(active, clip)
      play(videos[active])
      prepareNext()
      if (incoming !== null && videos[incoming].readyState >= 3) play(videos[incoming])
    }
    const onPlaying = (event: Event) => {
      const video = event.currentTarget as HTMLVideoElement
      if (!mayPlay()) {
        video.pause()
        return
      }
      if (incoming !== null && video === videos[incoming]) {
        const outgoing = videos[active]
        active = incoming
        incoming = null
        clip = (clip + 1) % backgroundClips.length
        fading = true
        video.classList.add('is-playing')
        outgoing.classList.remove('is-playing')
        // Keep both frames available throughout the one-second dissolve.
        fadeTimer = setTimeout(() => {
          outgoing.pause()
          outgoing.removeAttribute('src')
          outgoing.load()
          fading = false
          prepareNext()
        }, 1000)
      } else if (video === videos[active]) {
        video.classList.add('is-playing')
      }
    }
    const onError = (event: Event) => fail((event.currentTarget as HTMLVideoElement).error)
    videos.forEach(video => {
      video.addEventListener('playing', onPlaying)
      video.addEventListener('canplay', updatePlayback)
      video.addEventListener('timeupdate', prepareNext)
      video.addEventListener('ended', prepareNext)
      video.addEventListener('error', onError)
    })
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      updatePlayback()
    }, { threshold: 0.1 })
    observer.observe(media)
    updateRef.current = updatePlayback
    document.addEventListener('visibilitychange', updatePlayback)
    return () => {
      disposed = true
      clearTimeout(fadeTimer)
      updateRef.current = null
      observer.disconnect()
      document.removeEventListener('visibilitychange', updatePlayback)
      videos.forEach(video => {
        video.removeEventListener('playing', onPlaying)
        video.removeEventListener('canplay', updatePlayback)
        video.removeEventListener('timeupdate', prepareNext)
        video.removeEventListener('ended', prepareNext)
        video.removeEventListener('error', onError)
        video.pause()
        video.removeAttribute('src')
        video.load()
        video.classList.remove('is-playing')
      })
    }
  }, [eligible, failed])

  return (
    <>
      <div className="hero-background" aria-hidden="true">
        <div className="hero-background-media" ref={mediaRef}>
          <picture>
            <source type="image/avif" srcSet="/media/tears-of-steel-poster-480.avif 480w, /media/tears-of-steel-poster-960.avif 960w" sizes="100vw" />
            <img src="/media/tears-of-steel-poster.webp" srcSet="/media/tears-of-steel-poster-480.webp 480w, /media/tears-of-steel-poster.webp 960w" sizes="100vw" alt="" width={960} height={400} fetchPriority="high" />
          </picture>
          {eligible && !failed && [0, 1].map(slot => (
            <video
              key={slot}
              muted playsInline preload="none" tabIndex={-1}
            />
          ))}
        </div>
      </div>
      {eligible && !failed && (
        <button className="background-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play background video' : 'Pause background video'}>
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          {paused ? 'Play background' : 'Pause background'}
        </button>
      )}
    </>
  )
}
