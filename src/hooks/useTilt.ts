import { useRef } from 'react'
import { gsap, useGSAP } from '../animation/gsap'

/** One smoothed position drives the card, photo depth and reflected light. */
export function useTilt() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const media = gsap.matchMedia()
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const point = { x: 50, y: 50 }
      const render = () => {
        const x = point.x / 100
        const y = point.y / 100
        wrap.style.setProperty('--pointer-x', point.x + '%')
        wrap.style.setProperty('--pointer-y', point.y + '%')
        wrap.style.setProperty('--pointer-from-left', String(x))
        wrap.style.setProperty('--pointer-from-top', String(y))
        wrap.style.setProperty('--rotate-y', (x - 0.5) * 18 + 'deg')
        wrap.style.setProperty('--rotate-x', (0.5 - y) * 18 + 'deg')
      }
      const xTo = gsap.quickTo(point, 'x', { duration: 0.65, ease: 'power3.out', onUpdate: render })
      const yTo = gsap.quickTo(point, 'y', { duration: 0.65, ease: 'power3.out', onUpdate: render })
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return
        const rect = wrap.getBoundingClientRect()
        wrap.classList.add('is-active')
        xTo(gsap.utils.clamp(0, 100, (event.clientX - rect.left) / rect.width * 100))
        yTo(gsap.utils.clamp(0, 100, (event.clientY - rect.top) / rect.height * 100))
      }
      const leave = () => { wrap.classList.remove('is-active'); xTo(50); yTo(50) }
      wrap.addEventListener('pointermove', move)
      wrap.addEventListener('pointerleave', leave)
      return () => {
        wrap.removeEventListener('pointermove', move)
        wrap.removeEventListener('pointerleave', leave)
        wrap.classList.remove('is-active')
        point.x = point.y = 50
        render()
      }
    })
    return () => media.revert()
  }, { scope: wrapRef })
  return { wrapRef, cardRef }
}
