import { useRef } from 'react'
import { gsap, useGSAP, motionQuery } from '../animation/gsap'
import { personal } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

export default function Footer() {
  const { content, lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 96%', once: true } })
        .fromTo('.footer-rule', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.inOut' }, 0)
        .from('.footer-inner > *', {
          y: 12, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', clearProps: 'all',
        }, 0.2)
    })
    return () => media.revert()
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true })

  return (
    <footer className="footer" ref={ref}>
      <span className="footer-rule" aria-hidden="true" />
      <div className="container footer-inner">
        <span>
          &copy; {new Date().getFullYear()} {personal.name}
        </span>
        <span className="footer-muted">{content.footer}</span>
      </div>
    </footer>
  )
}
