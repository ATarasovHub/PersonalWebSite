import { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap, Flip, useGSAP, motionQuery } from '../animation/gsap'
import { GitFork, LockKeyhole, X } from 'lucide-react'
import AnimatedStat from './AnimatedStat'
import TriageDiagram from './diagrams/TriageDiagram'
import StockKeeperDiagram from './diagrams/StockKeeperDiagram'
import GatewayDiagram from './diagrams/GatewayDiagram'
import ThreadlyDiagram from './diagrams/ThreadlyDiagram'
import NrwCorpDiagram from './diagrams/NrwCorpDiagram'
import { useLanguage } from '../i18n/useLanguage'
import type { Project } from '../data/types'

type Props = {
  project: Project
  /** The card that was clicked, so the panel can grow out of it and back into it. */
  origin: HTMLElement | null
  /** Set by the parent to play the exit before the dialog is unmounted. */
  closing: boolean
  onClose: () => void
  onClosed: () => void
}

export default function ProjectModal({ project, origin, closing, onClose, onClosed }: Props) {
  const { content } = useLanguage()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const headRef = useRef<HTMLElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Freeze the page behind the dialog without letting it jump sideways. This
  // runs before the flip below measures anything, since the scrollbar
  // compensation shifts the very card the panel has to line up with.
  useLayoutEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
    }
  }, [])

  // The panel grows out of the card that opened it, so the dialog reads as the
  // same object rather than a new one. Without a card it falls back to a lift.
  useGSAP(() => {
    const panel = panelRef.current
    const backdrop = backdropRef.current
    if (!panel || !backdrop) return
    const reduced = !window.matchMedia(motionQuery).matches
    const card = origin?.isConnected ? origin : null

    if (closing) {
      const exit = gsap.timeline({ onComplete: onClosed })
      if (reduced) {
        exit.to([panel, backdrop], { opacity: 0, duration: 0 })
      } else if (card) {
        const shrink = Flip.fit(panel, card, { scale: true, duration: 0.42, ease: 'power3.inOut' })
        if (shrink) exit.add(shrink as gsap.core.Tween, 0)
        exit.to([headRef.current, bodyRef.current], { opacity: 0, duration: 0.22, ease: 'power2.in' }, 0)
          .to(backdrop, { opacity: 0, duration: 0.32, ease: 'power2.in' }, 0.12)
      } else {
        exit.to(panel, { y: 24, scale: 0.98, opacity: 0, duration: 0.25, ease: 'power2.in' })
          .to(backdrop, { opacity: 0, duration: 0.2 }, 0.08)
      }
      return
    }

    if (reduced) return
    const enter = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from(backdrop, { opacity: 0, duration: 0.35 }, 0)

    if (card) {
      // Park the panel on the card, record that, then play the difference back.
      Flip.fit(panel, card, { scale: true })
      const fromCard = Flip.getState(panel)
      gsap.set(panel, { clearProps: 'all' })
      enter.add(Flip.from(fromCard, { scale: true, duration: 0.62, ease: 'power3.inOut' }), 0)
        // The panel is stretched from the card's shape for the first half, so
        // the content only appears once it is close to its own proportions.
        .from([headRef.current, bodyRef.current], { opacity: 0, duration: 0.3 }, 0.2)
        .from('.modal-body > *', { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.36)
    } else {
      enter.from(panel, { y: 60, scale: 0.94, rotationX: 5, opacity: 0, duration: 0.75, clearProps: 'transform' }, 0.04)
        .from('.modal-body > *', { y: 18, opacity: 0, duration: 0.65, stagger: 0.07 }, 0.2)
    }
  }, { scope: backdropRef, dependencies: [closing, onClosed, origin], revertOnUpdate: true })

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus({ preventScroll: true })
    const root = document.getElementById('root')
    const previousInert = root?.inert ?? false
    if (root) root.inert = true

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Keep tabbing inside the dialog while it is open.
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (root) root.inert = previousInert
      previousFocus?.focus({ preventScroll: true })
    }
  }, [onClose])

  return createPortal(
    <div
      ref={backdropRef}
      className="modal-backdrop"
      onClick={onClose}
      style={{ pointerEvents: closing ? 'none' : 'auto' }}
    >
      <div
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-head" ref={headRef}>
          <div>
            <h3>{project.title}</h3>
            <span className="project-context">{project.context}</span>
          </div>
          <button
            ref={closeRef}
            className="modal-close"
            onClick={onClose}
            aria-label={content.projectLabels.close}
          >
            <X size={20} />
          </button>
        </header>

        <div className="modal-body" ref={bodyRef}>
          <p className="project-summary">{project.summary}</p>

          <div className="project-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="project-metric">
                <AnimatedStat className="project-metric-value" value={metric.value} immediate delay={0.5} />
                <span className="project-metric-label">{metric.label}</span>
              </div>
            ))}
          </div>

          <div className="project-body">
            <div className="project-block">
              <h4>{content.projectLabels.problem}</h4>
              <p>{project.problem}</p>
            </div>
            <div className="project-block">
              <h4>{content.projectLabels.approach}</h4>
              <p>{project.approach}</p>
            </div>
          </div>

          {project.diagram === 'triage' && <TriageDiagram />}
          {project.diagram === 'stock' && <StockKeeperDiagram />}
          {project.diagram === 'gateway' && <GatewayDiagram />}
          {project.diagram === 'threadly' && <ThreadlyDiagram />}
          {project.diagram === 'nrw' && <NrwCorpDiagram />}

          <div className="project-stack-wrap">
            <h4>{content.projectLabels.stack}</h4>
            <div className="project-stack">
              {project.stack.map((tech) => (
                <span key={tech} className="project-tech">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="project-modal-actions">
            {project.repoUrl ? (
              <a
                className="project-github"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                <GitFork size={17} />
                {content.projectLabels.github}
              </a>
            ) : (
              <span className="project-private">
                <LockKeyhole size={16} />
                {content.projectLabels.privateRepo}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
