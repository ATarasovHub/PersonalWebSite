import { useEffect, useRef } from 'react'

/** Lower = more lag, so the cloud drifts rather than sticks to the cursor. */
const LEAD_TAU = 0.55
const TRAIL_TAU = 1.4

/**
 * A soft emerald haze that drifts after the cursor across the whole page.
 * Two layers with different lag give it a sense of depth and weight.
 *
 * Renders nothing for touch devices and reduced-motion users.
 */
export default function CursorCloud() {
  const leadRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lead = leadRef.current
    const trail = trailRef.current
    if (!lead || !trail) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isCoarsePointer) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let leadX = targetX
    let leadY = targetY
    let trailX = targetX
    let trailY = targetY

    let rafId: number | null = null
    let lastTs = 0
    let visible = false

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) {
        visible = true
        lead.style.opacity = '1'
        trail.style.opacity = '1'
      }
    }

    const step = (ts: number) => {
      if (lastTs === 0) lastTs = ts
      const dt = Math.min((ts - lastTs) / 1000, 0.1)
      lastTs = ts

      const kLead = 1 - Math.exp(-dt / LEAD_TAU)
      const kTrail = 1 - Math.exp(-dt / TRAIL_TAU)

      leadX += (targetX - leadX) * kLead
      leadY += (targetY - leadY) * kLead
      trailX += (targetX - trailX) * kTrail
      trailY += (targetY - trailY) * kTrail

      lead.style.transform = `translate3d(${leadX}px, ${leadY}px, 0) translate(-50%, -50%)`
      trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`

      rafId = requestAnimationFrame(step)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    rafId = requestAnimationFrame(step)

    return () => {
      window.removeEventListener('pointermove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="cursor-cloud" aria-hidden="true">
      <div ref={trailRef} className="cursor-cloud-layer trail" />
      <div ref={leadRef} className="cursor-cloud-layer lead" />
    </div>
  )
}
