import { useRef } from 'react'
import { gsap, useGSAP, motionQuery } from '../animation/gsap'

type Props = {
  value: string
  className?: string
  /** Inside a dialog there is no scroll to trigger on, so count straight away. */
  immediate?: boolean
  delay?: number
}

export default function AnimatedStat({ value, className = 'stat-value', immediate = false, delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  useGSAP(() => {
    const element = ref.current
    const parts = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/)
    if (!element || !parts) return
    const [, prefix, digits, suffix] = parts
    const precision = digits.split(/[.,]/)[1]?.length ?? 0
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      const number = { value: 0 }
      gsap.to(number, {
        value: Number(digits.replace(',', '.')), duration: 1.8, delay, ease: 'power3.out',
        scrollTrigger: immediate ? undefined : { trigger: element, start: 'top 90%', once: true },
        onUpdate: () => {
          const formatted = number.value.toFixed(precision)
          element.textContent = prefix + (digits.includes(',') ? formatted.replace('.', ',') : formatted) + suffix
        },
        onComplete: () => { element.textContent = value },
      })
      return () => { element.textContent = value }
    })
    return () => media.revert()
  }, { scope: ref, dependencies: [value, immediate, delay], revertOnUpdate: true })
  return <span className={className}><span className="sr-only">{value}</span><span ref={ref} aria-hidden="true">{value}</span></span>
}
