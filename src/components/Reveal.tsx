import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, motionQuery } from '../animation/gsap'
import { useLanguage } from '../i18n/useLanguage'

type Direction = 'up' | 'left' | 'right' | 'scale'
type RevealProps = {
  children: ReactNode
  className?: string
  from?: Direction
  delay?: number
  duration?: number
  amount?: number
}
const offsets = { up: { y: 38 }, left: { x: -36 }, right: { x: 36 }, scale: { scale: 0.94, y: 24 } }

export default function Reveal({ children, className, from = 'up', delay = 0, duration = 0.9, amount = 0.2 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      gsap.from(ref.current, {
        ...offsets[from], opacity: 0, duration, delay, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: ref.current, start: 'top ' + (100 - Math.min(amount, 0.2) * 50) + '%', once: true },
      })
    })
    return () => media.revert()
  }, { scope: ref, dependencies: [from, delay, duration, amount, lang], revertOnUpdate: true })

  return <div ref={ref} className={className}>{children}</div>
}
