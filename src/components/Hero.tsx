import { useRef } from 'react'
import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { gsap, useGSAP, ScrollTrigger, motionQuery, scrollToSection } from '../animation/gsap'
import TiltCard from './TiltCard'
import { personal } from '../data/profile'
import { useLanguage } from '../i18n/useLanguage'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { lang, content } = useLanguage()

  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-eyebrow', { y: 18, autoAlpha: 0, duration: 0.8 }, 0.1)
        .from('.hero-letter', { yPercent: 115, rotation: 7, stagger: 0.035, duration: 1.15 }, 0.18)
        .from('.hero-role, .hero-tagline', { y: 24, autoAlpha: 0, stagger: 0.12, duration: 0.9 }, 0.55)
        .from('.hero-cta > a', { y: 22, autoAlpha: 0, stagger: 0.08, duration: 0.75, clearProps: 'all' }, 0.8)
        .from('.portrait-entry', { y: 48, rotation: 5, scale: 0.92, autoAlpha: 0, duration: 1.35 }, 0.25)
        .from('.portrait-reveal', { clipPath: 'inset(0% 0% 100% 0% round 30px)', duration: 1.4, ease: 'power4.inOut' }, 0.12)
        .from('.portrait-orbit', { scale: 0.8, autoAlpha: 0, stagger: 0.14, duration: 1.3 }, 0.45)
        .from('.hero-bottom', { autoAlpha: 0, y: 12, duration: 0.7 }, 1)

      const ambient = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 7, ease: 'sine.inOut' } })
        .to('.hero-glow-one', { xPercent: 15, yPercent: -12, scale: 1.12 }, 0)
        .to('.hero-glow-two', { xPercent: -12, yPercent: 14 }, 0)
      const orbit = gsap.to('.orbit-track', { rotation: 360, duration: 36, ease: 'none', repeat: -1 })
      const scrollCue = gsap.to('.hero-scroll svg', { y: 5, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      const loops = [ambient, orbit, scrollCue]
      const updateLoops = () => {
        const bounds = ref.current?.getBoundingClientRect()
        const playing = !document.hidden && !!bounds && bounds.bottom > 0 && bounds.top < innerHeight
        loops.forEach((loop) => loop.paused(!playing))
      }
      ScrollTrigger.create({ trigger: ref.current, start: 'top bottom', end: 'bottom top', onToggle: updateLoops })
      document.addEventListener('visibilitychange', updateLoops)
      updateLoops()

      // Independent layers compose the entrance, scroll and pointer motion.
      const desktop = gsap.matchMedia()
      desktop.add('(min-width: 900px)', () => {
        const scroll = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.8 }
        gsap.to('.hero-text', { y: 90, ease: 'none', scrollTrigger: scroll })
        gsap.to('.hero-visual', { y: -65, ease: 'none', scrollTrigger: scroll })
        gsap.to('.portrait-orbits', { rotation: 22, ease: 'none', scrollTrigger: scroll })
      })
      return () => {
        desktop.revert()
        document.removeEventListener('visibilitychange', updateLoops)
      }
    })
    return () => media.revert()
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true })

  return (
    <section ref={ref} id="top" className="hero">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-grid" />
      </div>
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="hero-eyebrow"><MapPin size={14} /> {content.location}</span>
          <h1 className="hero-name" aria-label={personal.name}>
            {personal.name.split(' ').map((word) => (
              <span className="hero-word" key={word} aria-hidden="true">
                {[...word].map((char, i) => <span className="hero-letter-mask" key={i}><span className="hero-letter">{char}</span></span>)}
              </span>
            ))}
          </h1>
          <p className="hero-role">{content.roleLine}</p>
          <p className="hero-tagline">{content.tagline}</p>
          <div className="hero-cta">
            <a className="pill-button primary" href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
              {content.hero.primaryCta}<ArrowUpRight size={17} />
            </a>
            <a className="pill-button" href={personal.cv[lang]} download={personal.cvFileName[lang]}><Download size={16} />{content.hero.cvCta}</a>
            <a className="pill-button ghost" href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}>
              {content.hero.secondaryCta}<ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-orbits" aria-hidden="true">
            <span className="portrait-orbit orbit-outer" />
            <span className="portrait-orbit orbit-inner" />
            <span className="orbit-track"><i /></span>
            <span className="orbit-cross">+</span>
          </div>
          <div className="portrait-entry"><div className="portrait-reveal"><TiltCard /></div></div>
        </div>
      </div>
      <div className="container hero-bottom">
        <span className="hero-availability"><span />{content.status}</span>
        <a className="hero-scroll" href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }} aria-label={content.hero.scrollLabel}>
          <span>{content.sections.about}</span><ArrowDown size={17} />
        </a>
        <span className="hero-bottom-index" aria-hidden="true">01 / 06</span>
      </div>
    </section>
  )
}
