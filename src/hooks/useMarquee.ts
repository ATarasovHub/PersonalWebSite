import { useCallback, useEffect, useRef, useState } from 'react'

/** Pixels per second the track drifts on its own. A showcase, not a ticker. */
const DRIFT_SPEED = 20

/** How quickly a swipe or a flick bleeds off, per second. */
const FRICTION = 2.6

/** Drift stays out of the way this long after the visitor takes control. */
const RESUME_DELAY_MS = 6000

/** Below this width the track snaps instead of drifting; the two fight. */
const SNAP_BREAKPOINT = 600

type Options = {
  /** Held open by something outside the track, such as a dialog. */
  paused?: boolean
  /** How many real items there are, before the list is duplicated. */
  count: number
}

/**
 * Drives the project track: it drifts on its own and can be stepped or
 * scrubbed. The content is expected to be duplicated once, so the halfway
 * point wraps back to the start without a visible seam.
 *
 * Drift yields to the visitor in every direction — pointer, focus, touch,
 * an open dialog — and stops entirely while the track is off screen or the
 * viewport is narrow enough to use scroll snapping instead.
 */
export function useMarquee({ paused = false, count }: Options) {
  const ref = useRef<HTMLDivElement>(null)

  /** Extra velocity from a flick, on top of the constant drift. */
  const velocity = useRef(0)
  /**
   * Drift position kept as a float. scrollLeft rounds to whole pixels, so
   * adding a sub-pixel step to it each frame would round straight back and
   * never move at all on a high-refresh display.
   */
  const offset = useRef(0)
  /** One card plus its gap; re-measured on resize and after fonts load. */
  const step = useRef(0)
  /**
   * Where an arrow or a dot asked us to go. The loop eases towards it
   * rather than calling scrollTo: native smooth scrolling and a loop that
   * writes scrollLeft every frame cancel each other out.
   */
  const target = useRef<number | null>(null)

  const dragging = useRef(false)
  const hovering = useRef(false)
  const focusWithin = useRef(false)
  const onScreen = useRef(false)
  const holdUntil = useRef(0)

  const [index, setIndex] = useState(0)

  const hold = useCallback(() => {
    holdUntil.current = performance.now() + RESUME_DELAY_MS
  }, [])

  /** Move by one card, wrapping around the ends. */
  const nudge = useCallback(
    (direction: 1 | -1) => {
      const el = ref.current
      if (!el || step.current <= 0) return
      hold()
      velocity.current = 0
      const half = el.scrollWidth / 2
      const from = target.current ?? el.scrollLeft
      // Land on a whole card rather than wherever the drift left us.
      const cards = Math.round(from / step.current) + direction
      let next = cards * step.current
      if (next < 0) next += half
      if (next >= half) next -= half
      target.current = next
    },
    [hold],
  )

  /** Jump straight to one of the real items. */
  const goTo = useCallback(
    (item: number) => {
      const el = ref.current
      if (!el || step.current <= 0) return
      hold()
      velocity.current = 0
      target.current = item * step.current
    },
    [hold],
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const narrowQuery = window.matchMedia(`(max-width: ${SNAP_BREAKPOINT}px)`)

    let rafId: number | null = null
    let lastTs = 0
    let lastIndex = -1

    /** A card's width plus the gap, read from the DOM rather than assumed. */
    const measure = () => {
      const card = el.querySelector('.project-card')
      const track = el.querySelector('.carousel-track')
      if (!card || !track) return
      const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0
      step.current = card.getBoundingClientRect().width + gap
    }

    /** Keep the scroll position inside the first copy of the content. */
    const wrap = () => {
      const half = el.scrollWidth / 2
      if (half <= 0) return
      if (el.scrollLeft >= half) el.scrollLeft -= half
      else if (el.scrollLeft < 0) el.scrollLeft += half
      offset.current = el.scrollLeft
    }

    const tick = (ts: number) => {
      if (lastTs === 0) lastTs = ts
      const dt = Math.min((ts - lastTs) / 1000, 0.1)
      lastTs = ts

      const yielded =
        dragging.current ||
        hovering.current ||
        focusWithin.current ||
        paused ||
        !onScreen.current ||
        ts < holdUntil.current

      // Snapping and a per-frame scroll fight each other, so narrow screens
      // get the snap and no drift.
      const mayDrift = !prefersReducedMotion && !narrowQuery.matches

      if (target.current !== null) {
        // Ease towards the requested card. One authority owns the position,
        // so nothing here fights a native smooth scroll.
        const dest = target.current
        const gap = dest - el.scrollLeft
        if (Math.abs(gap) < 0.5) {
          el.scrollLeft = dest
          offset.current = dest
          target.current = null
        } else {
          const next = el.scrollLeft + gap * (1 - Math.exp(-dt / 0.12))
          el.scrollLeft = next
          offset.current = next
        }
      } else if (yielded) {
        // The visitor owns the position; follow it rather than fight it.
        offset.current = el.scrollLeft
        if (!dragging.current) velocity.current = 0
      } else {
        if (Math.abs(el.scrollLeft - offset.current) > 1.5) offset.current = el.scrollLeft
        offset.current += ((mayDrift ? DRIFT_SPEED : 0) + velocity.current) * dt
        velocity.current *= Math.exp(-FRICTION * dt)
        if (Math.abs(velocity.current) < 0.5) velocity.current = 0

        const half = el.scrollWidth / 2
        if (half > 0) {
          if (offset.current >= half) offset.current -= half
          else if (offset.current < 0) offset.current += half
        }
        el.scrollLeft = offset.current
      }

      if (step.current > 0 && count > 0) {
        const next = ((Math.round(el.scrollLeft / step.current) % count) + count) % count
        if (next !== lastIndex) {
          lastIndex = next
          setIndex(next)
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    measure()
    rafId = requestAnimationFrame(tick)

    // Only run while the track is actually on screen.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting
      },
      { threshold: 0 },
    )
    visibility.observe(el)

    // Card width changes with the viewport, and again once webfonts land.
    const resize = new ResizeObserver(() => {
      measure()
      wrap()
    })
    resize.observe(el)
    document.fonts?.ready.then(() => {
      measure()
      wrap()
    })

    const onEnter = () => {
      hovering.current = true
    }
    const onLeave = () => {
      hovering.current = false
      hold()
    }
    const onFocusIn = () => {
      focusWithin.current = true
    }
    const onFocusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node)) {
        focusWithin.current = false
        hold()
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        nudge(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        nudge(-1)
      }
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('focusin', onFocusIn)
    el.addEventListener('focusout', onFocusOut)
    el.addEventListener('keydown', onKeyDown)

    // Drag or swipe to scrub, with a flick carrying over when released.
    let startX = 0
    let startScroll = 0
    let lastX = 0
    let lastMoveTs = 0
    let moved = 0

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return
      // Stops the browser starting a text or image drag mid-scrub.
      if (e.pointerType === 'mouse') e.preventDefault()
      dragging.current = true
      target.current = null
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
      // A real drag must not also fire the card underneath it.
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
      visibility.disconnect()
      resize.disconnect()
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('focusin', onFocusIn)
      el.removeEventListener('focusout', onFocusOut)
      el.removeEventListener('keydown', onKeyDown)
      el.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', endDrag)
      window.removeEventListener('pointercancel', endDrag)
    }
  }, [paused, hold, nudge, count])

  return { ref, index, nudge, goTo }
}
