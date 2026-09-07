import { useCallback, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { gsap, useGSAP, motionQuery, scrollToSection } from '../animation/gsap'
import { useLanguage } from '../i18n/useLanguage'
import LangToggle from './LangToggle'
import ThemeToggle from './ThemeToggle'

const ids = ['about', 'skills', 'projects', 'experience', 'education', 'contact'] as const

export default function Nav() {
  const { content, lang } = useLanguage()
  const [active, setActive] = useState<string>('about')
  const [open, setOpen] = useState(false)
  const pendingScroll = useRef<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const linksRef = useRef<HTMLElement>(null)
  const underlineRef = useRef<HTMLSpanElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const placed = useRef(false)

  const links = ids.map((id) => ({ id, label: content.nav[id] }))

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    if (!window.matchMedia(motionQuery).matches) return
    gsap.from(headerRef.current, {
      y: -22, autoAlpha: 0, duration: 0.6, ease: 'power2.out', clearProps: 'all',
    })
  }, { scope: headerRef })

  // One pill slides between the links instead of one fading in per link.
  const placeUnderline = useCallback((animate: boolean) => {
    const target = linksRef.current?.querySelector<HTMLElement>('.nav-link.active')
    const underline = underlineRef.current
    if (!underline) return
    // The link row is hidden on small screens, so there is nothing to mark.
    if (!target || target.offsetWidth === 0) {
      gsap.set(underline, { autoAlpha: 0 })
      return
    }
    const reduced = !window.matchMedia(motionQuery).matches
    gsap.to(underline, {
      x: target.offsetLeft, width: target.offsetWidth, autoAlpha: 1,
      duration: animate && !reduced ? 0.45 : 0, ease: 'power3.out',
    })
  }, [])

  useEffect(() => {
    placeUnderline(placed.current)
    placed.current = true
  }, [active, lang, placeUnderline])

  useEffect(() => {
    const reflow = () => placeUnderline(false)
    window.addEventListener('resize', reflow)
    document.fonts.ready.then(reflow)
    return () => window.removeEventListener('resize', reflow)
  }, [placeUnderline])

  // Collapsing the mobile menu shifts the layout, which cancels an in-flight
  // smooth scroll on mobile browsers. Wait for the collapse to finish instead.
  useGSAP(() => {
    const reduced = !window.matchMedia(motionQuery).matches
    gsap.to(menuRef.current, {
      height: open ? 'auto' : 0,
      autoAlpha: open ? 1 : 0,
      duration: reduced ? 0 : 0.32,
      ease: 'power2.inOut',
      onComplete: () => {
        if (open) return
        const id = pendingScroll.current
        pendingScroll.current = null
        if (id) scrollToSection(id)
      },
    })
  }, { dependencies: [open] })

  const handleClick = (id: string) => {
    if (open) {
      pendingScroll.current = id
      setOpen(false)
      return
    }
    scrollToSection(id)
  }

  return (
    <header ref={headerRef} className="nav">
      <div className="container nav-inner">
        <a
          href="#top"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault()
            handleClick('top')
          }}
        >
          AT<span>.</span>
        </a>

        <nav className="nav-links" ref={linksRef}>
          <span className="nav-underline" ref={underlineRef} aria-hidden="true" />
          {links.map((link) => (
            <button
              key={link.id}
              className={active === link.id ? 'nav-link active' : 'nav-link'}
              onClick={() => handleClick(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <LangToggle />
          <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" className="nav-mobile" ref={menuRef} inert={!open}>
        {links.map((link) => (
          <button
            key={link.id}
            className={active === link.id ? 'nav-mobile-link active' : 'nav-mobile-link'}
            onClick={() => handleClick(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
