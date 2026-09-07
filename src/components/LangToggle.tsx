import { useCallback, useEffect, useRef } from 'react'
import { gsap, motionQuery } from '../animation/gsap'
import { useLanguage } from '../i18n/useLanguage'
import type { Lang } from '../data/types'

const options: Lang[] = ['en', 'de']

export default function LangToggle() {
  const { lang, content, toggle } = useLanguage()
  const ref = useRef<HTMLButtonElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const placed = useRef(false)

  // The pill is a single element that travels to whichever option is active.
  const place = useCallback((animate: boolean) => {
    const target = ref.current?.querySelector<HTMLElement>('.lang-option.active')
    const pill = pillRef.current
    if (!target || !pill) return
    const reduced = !window.matchMedia(motionQuery).matches
    gsap.to(pill, {
      x: target.offsetLeft, y: target.offsetTop,
      width: target.offsetWidth, height: target.offsetHeight,
      autoAlpha: 1,
      duration: animate && !reduced ? 0.42 : 0, ease: 'power3.out',
    })
  }, [])

  useEffect(() => {
    place(placed.current)
    placed.current = true
  }, [lang, place])

  useEffect(() => {
    const reflow = () => place(false)
    window.addEventListener('resize', reflow)
    document.fonts.ready.then(reflow)
    return () => window.removeEventListener('resize', reflow)
  }, [place])

  return (
    <button
      ref={ref}
      className="lang-toggle"
      onClick={toggle}
      aria-label={content.langToggleLabel}
      title={content.langToggleLabel}
    >
      <span ref={pillRef} className="lang-pill" aria-hidden="true" />
      {options.map((option) => (
        <span
          key={option}
          className={option === lang ? 'lang-option active' : 'lang-option'}
        >
          <span className="lang-label">{option.toUpperCase()}</span>
        </span>
      ))}
    </button>
  )
}
