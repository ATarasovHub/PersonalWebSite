import { useCallback, useEffect, useRef, useState } from 'react'

/** Pixels per second the track drifts on its own. */
const DRIFT_SPEED = 34

/** How quickly a swipe or a nudge bleeds off, per second. */
const FRICTION = 2.6

/** Drift stays off this long after the visitor takes control. */
const RESUME_DELAY_MS = 2500

type Options = {
  /** Stop drifting while a dialog is open. */
  paused?: boolean
  /** Width of one card plus its gap, used by the arrow buttons. */
  step?: number
}

/**
 * Drives the project track: it drifts on its own, and can be stepped or
 * scrubbed explicitly. The content is expected to be duplicated once, so
 * the halfway point wraps back to the start without a visible seam.
 *
 * The mouse can drag the track, which costs the page nothing. The wheel
 * is deliberately left alone — that belongs to the page's own scrolling.
 */
export function useMarquee({ paused = false, step = 444 }: Options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  /** Extra velocity from a swipe, on top of the constant drift. */
  const velocity = useRef(0)
  /**
   * Drift position kept as a float. scrollLeft rounds to whole pixels, so
   * adding a sub-pixel step to it each frame would round straight back and
   * never move at all on a high-refresh display.
   */
  const offset = useRef(0)
  const dragging = useRef(false)
  /** Timestamp until which the drift stays out of the way. */
  const holdUntil = useRef(0)
  const [progress, setProgress] = useState(0)

  const hold = useCallback(() => {
    holdUntil.current = performance.now() + RESUME_DELAY_MS
  }, [])

  /** Move by one card, wrapping around the ends. */
  const nudge = useCallback((direction: 1 | -1) => {
    const el = ref.current
    if (!el) return
    hold()
    velocity.current = 0
    const half = el.scrollWidth / 2
    let target = el.scrollLeft + direction * step
    if (target < 0) target += half
    if (target >= half) target -= half
    el.scrollTo({ left: target, behavior: 'smooth' })
  }, [hold, step])

  /** Jump to a fraction (0–1) of the way through one copy of the list. */
  const seek = useCallback((fraction: number) => {
    const el = ref.current
    if (!el) return
    hold()
    velocity.current = 0
    el.scrollLeft = (el.scrollWidth / 2) * fraction
  }, [hold])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafId: number | null = null
    let lastTs = 0
    let lastReported = -1

    /** Keep the scroll position inside the first copy of the content. */
    const wrap = () => {
      const half = el.scrollWidth / 2
      if (half <= 0) return
      if (el.scrollLeft >= half) el.scrollLeft -= half
      else if (el.scrollLeft < 0) el.scrollLeft += half
      offset.current = el.scrollLeft
    }

    const step_ = (ts: number) => {
      if (lastTs === 0) lastTs = ts
      const dt = Math.min((ts - lastTs) / 1000, 0.1)
      lastTs = ts

      const held = ts < holdUntil.current
      if (dragging.current || held) {
        // The visitor owns the position; follow it rather than fight it.
        offset.current = el.scrollLeft
      } else {
        const drift = paused || prefersReducedMotion ? 0 : DRIFT_SPEED
        // Resync if anything else moved the track since the last frame.
        if (Math.abs(el.scrollLeft - offset.current) > 1.5) offset.current = el.scrollLeft
        offset.current += (drift + velocity.current) * dt
        velocity.current *= Math.exp(-FRICTION * dt)
        if (Math.abs(velocity.current) < 0.5) velocity.current = 0

        const half = el.scrollWidth / 2
        if (half > 0) {
          if (offset.current >= half) offset.current -= half
          else if (offset.current < 0) offset.current += half
        }
        el.scrollLeft = offset.current
      }

      const half = el.scrollWidth / 2
      if (half > 0) {
        const next = Math.min(1, Math.max(0, el.scrollLeft / half))
        // Only re-render when the thumb would actually move.
        if (Math.abs(next - lastReported) > 0.004) {
          lastReported = next
          setProgress(next)
        }
      }

      rafId = requestAnimationFrame(step_)
    }
    rafId = requestAnimationFrame(step_)

    // Drag or swipe to scrub, with a flick carrying over when released.
    let startX = 0
    let startScroll = 0
    let lastX = 0
    let lastMoveTs = 0
    let moved = 0

    const onPointerDown = (e: PointerEvent) => {
      // Ignore secondary mouse buttons; let every other pointer through.
      if (e.pointerType === 'mouse' && e.button !== 0) return
      // Stops the browser starting a text or image drag mid-scrub.
      if (e.pointerType === 'mouse') e.preventDefault()
      dragging.current = true
      moved = 0
      startX = lastX = e.clientX
      startScroll = el.scrollLeft
      lastMoveTs = performance.now()
      velocity.current = 0
      el.classList.add('is-dragging')
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - startX
      moved = Math.max(moved, Math.abs(dx))
      el.scrollLeft = startScroll - dx
      wrap()

      const now = performance.now()
      const dt = (now - lastMoveTs) / 1000
      if (dt > 0) velocity.current = -(e.clientX - lastX) / dt
      lastX = e.clientX
      lastMoveTs = now
    }

    const endDrag = () => {
      if (!dragging.current) return
      dragging.current = false
      el.classList.remove('is-dragging')
      hold()
      // A real drag must not also fire the button underneath it.
      if (moved > 6) {
        const swallow = (ev: MouseEvent) => {
          ev.preventDefault()
          ev.stopPropagation()
        }
        el.addEventListener('click', swallow, { capture: true, once: true })
        setTimeout(() => el.removeEventListener('click', swallow, { capture: true }), 0)
      }
    }

    el.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', endDrag)
    window.addEventListener('pointercancel', endDrag)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
    }
  }, [paused, hold])

  return { ref, progress, seek, nudge }
}
