import { useCallback, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react'
import Section from './Section'
import ProjectModal from './ProjectModal'
import { useMarquee } from '../hooks/useMarquee'
import { useLanguage } from '../i18n/useLanguage'
import type { Project } from '../data/types'

export default function Projects() {
  const { content } = useLanguage()
  const [open, setOpen] = useState<Project | null>(null)
  const total = content.projects.length
  const { ref, index, nudge, goTo } = useMarquee({ paused: open !== null, count: total })

  /** Focus goes back here when the dialog closes. */
  const trigger = useRef<HTMLButtonElement | null>(null)
  // Stable, so the dialog's key handler is not re-registered every render.
  const close = useCallback(() => setOpen(null), [])

  const openProject = (project: Project, card: HTMLElement) => {
    trigger.current = card.querySelector('.project-more')
    setOpen(project)
  }

  // Duplicated once so the track can wrap at the halfway point unnoticed.
  const looped = [...content.projects, ...content.projects]

  return (
    <Section id="projects" index="03" title={content.sections.projects}>
      <p className="carousel-hint">
        <MoveHorizontal size={15} aria-hidden="true" /> {content.projectLabels.dragHint}
      </p>

      <div className="carousel" ref={ref}>
        <div className="carousel-track">
          {looped.map((project, i) => (
            <article
              className="project-card"
              key={`${project.title}-${i}`}
              /* The whole card is the target; the button inside keeps it
                 reachable from the keyboard and names the action. */
              onClick={(e) => openProject(project, e.currentTarget)}
            >
              <span className="project-index">
                {String((i % total) + 1).padStart(2, '0')}
              </span>

              <header className="project-head">
                <h3>{project.title}</h3>
                <span className="project-context">{project.context}</span>
              </header>

              <p className="project-summary">{project.summary}</p>

              <div className="project-metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="project-metric">
                    <span className="project-metric-value">{metric.value}</span>
                    <span className="project-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>

              {/* No handler of its own — the click bubbles to the card, which
                  is also what Enter and Space produce. */}
              <button className="project-more" aria-label={`${content.projectLabels.more}: ${project.title}`}>
                {content.projectLabels.more}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-arrow"
          onClick={() => nudge(-1)}
          aria-label={content.projectLabels.prev}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <span className="carousel-counter" aria-live="polite">
          {String(index + 1).padStart(2, '0')}
          <span className="carousel-counter-sep">/</span>
          {String(total).padStart(2, '0')}
        </span>

        <div className="carousel-dots">
          {content.projects.map((project, i) => (
            <button
              key={project.title}
              className={i === index ? 'carousel-dot active' : 'carousel-dot'}
              onClick={() => goTo(i)}
              aria-label={project.title}
              aria-current={i === index}
            />
          ))}
        </div>

        <button
          className="carousel-arrow"
          onClick={() => nudge(1)}
          aria-label={content.projectLabels.next}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence onExitComplete={() => trigger.current?.focus()}>
        {open && <ProjectModal project={open} onClose={close} />}
      </AnimatePresence>
    </Section>
  )
}
