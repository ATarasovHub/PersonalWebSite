import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Section from './Section'
import ProjectModal from './ProjectModal'
import { useMarquee } from '../hooks/useMarquee'
import { useLanguage } from '../i18n/useLanguage'
import type { Project } from '../data/types'

export default function Projects() {
  const { content } = useLanguage()
  const [open, setOpen] = useState<Project | null>(null)
  const trackRef = useMarquee({ paused: open !== null })
  // Stable, so the dialog's key handler is not re-registered every render.
  const close = useCallback(() => setOpen(null), [])

  // Duplicated once so the track can wrap at the halfway point unnoticed.
  const looped = [...content.projects, ...content.projects]

  return (
    <Section id="projects" index="03" title={content.sections.projects}>
      <div className="carousel" ref={trackRef}>
        <div className="carousel-track">
          {looped.map((project, i) => (
            <article className="project-card" key={`${project.title}-${i}`}>
              <span className="project-index">
                {String((i % content.projects.length) + 1).padStart(2, '0')}
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

              <button className="project-more" onClick={() => setOpen(project)}>
                {content.projectLabels.more}
                <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <ProjectModal project={open} onClose={close} />}
      </AnimatePresence>
    </Section>
  )
}
