import { useEffect, useRef } from 'react'

const INTRO_DURATION_MS = 1200
const INTRO_X_OFFSET = 70
const INTRO_Y_OFFSET = 60

/** Smoothing time constants: larger = slower settle. */
const TAU_INTRO = 0.6
const TAU_ACTIVE = 0.14

const MAX_TILT_DEG = 12

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max)
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision))
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin))

type TiltHandlers = {
  wrapRef: React.RefObject<HTMLDivElement | null>
  cardRef: React.RefObject<HTMLDivElement | null>
}

/**
 * Drives a pointer-following 3D tilt by writing CSS custom properties onto the
 * wrapper, so the card's tilt, glare, shadow and photo parallax can all be
 * expressed in CSS from a single set of variables.
 *
 * Uses frame-rate independent exponential smoothing rather than a fixed
 * per-frame lerp, and parks the rAF loop once motion has settled.
 */
export function useTilt(enabled = true): TiltHandlers {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const card = cardRef.current
    if (!wrap || !card) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (!enabled || prefersReducedMotion || isCoarsePointer) return

    let rafId: number | null = null
    let running = false
    let lastTs = 0
    let introUntil = 0

    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const applyVars = (x: number, y: number) => {
      const width = card.clientWidth || 1
      const height = card.clientHeight || 1

      const percentX = clamp((100 / width) * x)
      const percentY = clamp((100 / height) * y)
      const centerX = percentX - 50
      const centerY = percentY - 50

      wrap.style.setProperty('--pointer-x', `${percentX}%`)
      wrap.style.setProperty('--pointer-y', `${percentY}%`)
      wrap.style.setProperty('--pointer-from-left', `${percentX / 100}`)
      wrap.style.setProperty('--pointer-from-top', `${percentY / 100}`)
      wrap.style.setProperty(
        '--pointer-from-center',
        `${clamp(Math.hypot(centerX, centerY) / 50, 0, 1)}`,
      )
      wrap.style.setProperty('--background-x', `${adjust(percentX, 0, 100, 35, 65)}%`)
      wrap.style.setProperty('--background-y', `${adjust(percentY, 0, 100, 35, 65)}%`)
      wrap.style.setProperty('--rotate-y', `${round((centerX / 50) * MAX_TILT_DEG)}deg`)
      wrap.style.setProperty('--rotate-x', `${round(-(centerY / 50) * MAX_TILT_DEG)}deg`)
    }

    const step = (ts: number) => {
      if (!running) return
      if (lastTs === 0) lastTs = ts
      const dt = (ts - lastTs) / 1000
      lastTs = ts

      const tau = ts < introUntil ? TAU_INTRO : TAU_ACTIVE
      const k = 1 - Math.exp(-dt / tau)

      currentX += (targetX - currentX) * k
      currentY += (targetY - currentY) * k
      applyVars(currentX, currentY)

      const stillMoving =
        Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05

      if (stillMoving || ts < introUntil) {
        rafId = requestAnimationFrame(step)
      } else {
        running = false
        lastTs = 0
        rafId = null
      }
    }

    const start = () => {
      if (running) return
      running = true
      lastTs = 0
      rafId = requestAnimationFrame(step)
    }

    const setTarget = (x: number, y: number) => {
      targetX = x
      targetY = y
      start()
    }

    const toCenter = () => setTarget(card.clientWidth / 2, card.clientHeight / 2)

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      const rect = card.getBoundingClientRect()
      setTarget(e.clientX - rect.left, e.clientY - rect.top)
    }

    const onPointerEnter = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      wrap.classList.add('is-active')
      onPointerMove(e)
    }

    const onPointerLeave = () => {
      wrap.classList.remove('is-active')
      toCenter()
    }

    card.addEventListener('pointerenter', onPointerEnter)
    card.addEventListener('pointermove', onPointerMove)
    card.addEventListener('pointerleave', onPointerLeave)

    // Intro: start tilted from the top-right, then glide to rest at center.
    currentX = (card.clientWidth || 0) - INTRO_X_OFFSET
    currentY = INTRO_Y_OFFSET
    applyVars(currentX, currentY)
    introUntil = performance.now() + INTRO_DURATION_MS
    toCenter()

    return () => {
      card.removeEventListener('pointerenter', onPointerEnter)
      card.removeEventListener('pointermove', onPointerMove)
      card.removeEventListener('pointerleave', onPointerLeave)
      if (rafId) cancelAnimationFrame(rafId)
      running = false
    }
  }, [enabled])

  return { wrapRef, cardRef }
}
