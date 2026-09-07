import { useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger, useGSAP, motionQuery } from '../animation/gsap'
import { useLanguage } from '../i18n/useLanguage'

export default function MotionSurface({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()

  useGSAP(() => {
    const root = ref.current
    if (!root) return
    const media = gsap.matchMedia()
    gsap.fromTo('.reading-progress', { scaleX: 0 }, {
      scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true },
    })
    media.add(motionQuery, () => {
      root.querySelectorAll<HTMLElement>('.section-heading').forEach((heading) => {
        gsap.from(heading.querySelectorAll('.heading-word'), {
          yPercent: 110, rotation: 3, duration: 0.95, stagger: 0.06, ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 90%', once: true },
        })
        gsap.from(heading.querySelector('.section-rule'), {
          scaleX: 0, ease: 'none',
          scrollTrigger: { trigger: heading, start: 'top 90%', end: 'top 50%', scrub: 0.6 },
        })
      })
      root.querySelectorAll<HTMLElement>('.skill-group').forEach((group) => {
        gsap.from(group.querySelectorAll('.skill-chip'), {
          y: 14, opacity: 0, duration: 0.55, stagger: 0.035, ease: 'power2.out', clearProps: 'all',
          scrollTrigger: { trigger: group, start: 'top 85%', once: true },
        })
      })
      gsap.from('.project-card', {
        y: 65, opacity: 0, duration: 1, stagger: 0.09, ease: 'power3.out', clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.carousel', start: 'top 88%', once: true },
      })
    })
    media.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      root.querySelectorAll<HTMLElement>('.education-photo').forEach((frame) => {
        gsap.fromTo(frame.querySelector('img'), { yPercent: -7, scale: 1.18 }, {
          yPercent: 7, ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
        })
      })
    })
    media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const cleanups: (() => void)[] = []
      root.querySelectorAll<HTMLElement>('.pill-button, .carousel-arrow, .hero-scroll').forEach((button) => {
        const xTo = gsap.quickTo(button, '--magnet-x', { duration: 0.45, ease: 'power3.out' })
        const yTo = gsap.quickTo(button, '--magnet-y', { duration: 0.45, ease: 'power3.out' })
        const move = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return
          const rect = button.getBoundingClientRect()
          xTo((event.clientX - rect.left - rect.width / 2) * 0.14)
          yTo((event.clientY - rect.top - rect.height / 2) * 0.2)
        }
        const leave = () => { xTo(0); yTo(0) }
        button.addEventListener('pointermove', move)
        button.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          button.removeEventListener('pointermove', move)
          button.removeEventListener('pointerleave', leave)
          button.style.removeProperty('--magnet-x')
          button.style.removeProperty('--magnet-y')
        })
      })
      root.querySelectorAll<HTMLElement>('.project-card, .skill-group, .stat-card, .education-card, .contact-action').forEach((card) => {
        const xTo = gsap.quickTo(card, '--light-x', { duration: 0.35, ease: 'power2.out' })
        const yTo = gsap.quickTo(card, '--light-y', { duration: 0.35, ease: 'power2.out' })
        const move = (event: PointerEvent) => {
          if (event.pointerType !== 'mouse') return
          const rect = card.getBoundingClientRect()
          xTo(event.clientX - rect.left)
          yTo(event.clientY - rect.top)
          card.classList.add('is-lit')
        }
        const leave = () => card.classList.remove('is-lit')
        card.addEventListener('pointermove', move)
        card.addEventListener('pointerleave', leave)
        cleanups.push(() => {
          card.removeEventListener('pointermove', move)
          card.removeEventListener('pointerleave', leave)
          card.classList.remove('is-lit')
          card.style.removeProperty('--light-x')
          card.style.removeProperty('--light-y')
        })
      })
      return () => cleanups.forEach((cleanup) => cleanup())
    })

    // Font loading and accordion expansion can change every later trigger.
    let alive = true
    let refresh: gsap.core.Tween | undefined
    const observer = new ResizeObserver(() => {
      refresh?.kill()
      refresh = gsap.delayedCall(0.2, () => ScrollTrigger.refresh())
    })
    observer.observe(root)
    document.fonts.ready.then(() => { if (alive) ScrollTrigger.refresh() })
    return () => {
      alive = false
      observer.disconnect()
      refresh?.kill()
      media.revert()
    }
  }, { scope: ref, dependencies: [lang], revertOnUpdate: true })

  return <div ref={ref} className="motion-surface"><div className="reading-progress" aria-hidden="true" />{children}</div>
}
