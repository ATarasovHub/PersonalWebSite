import { useEffect, useRef } from 'react'

/** Pixels per second the track drifts on its own. */
const DRIFT_SPEED = 26

/** How quickly a swipe bleeds off, per second. */
const FRICTION = 2.6

type Options = {
  /** Stop drifting while a dialog is open. */
  paused?: boolean
}

/**
 * Turns a horizontally scrollable element into a track that drifts on its
 * own. The content is expected to be duplicated once, so the halfway point
 * can be wrapped back to the start without a visible seam.
 *
 * Deliberately ignores the mouse: the wheel belongs to the page, and
 * hijacking it here made the section awkward to scroll past. Touch and pen
 * can still swipe, which costs the page nothing.
 */
export function useMarquee({ paused = false }: Options = {}) {
  const ref = useRef<HTMLDivElement>(null)
  /** Extra velocity from a swipe, on top of the constant drift. */
  const velocity = useRef(0)
  const dragging = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafId: number | null = null
    let lastTs = 0

    /** Keep the scroll position inside the first copy of the content. */
    const wrap = () => {
      const half = el.scrollWidth / 2
      if (half <= 0) return
      if (el.scrollLeft >= half) el.scrollLeft -= half
      else if (el.scrollLeft < 0) el.scrollLeft += half
    }

    const step = (ts: number) => {
      if (lastTs === 0) lastTs = ts
      const dt = Math.min((ts - lastTs) / 1000, 0.1)
      lastTs = ts

      if (!dragging.current) {
        const drift = paused || prefersReducedMotion ? 0 : DRIFT_SPEED
        el.scrollLeft += (drift + velocity.current) * dt
        velocity.current *= Math.exp(-FRICTION * dt)
        if (Math.abs(velocity.current) < 0.5) velocity.current = 0
        wrap()
      }

      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)

    // Swipe to scrub, with a flick carrying over when released.
    let startX = 0
    let startScroll = 0
    let lastX = 0
    let lastMoveTs = 0
    let moved = 0

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      dragging.current = true
      moved = 0
      startX = lastX = e.clientX
      startScroll = el.scrollLeft
      lastMoveTs = performance.now()
      velocity.current = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current || e.pointerType === 'mouse') return
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
      // A real swipe must not also fire the button underneath it.
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
  }, [paused])

  return ref
}
