import { useCallback, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, GitFork, LockKeyhole } from 'lucide-react'
import Section from './Section'
import ProjectModal from './ProjectModal'
import AnimatedStat from './AnimatedStat'
import { useMarquee } from '../hooks/useMarquee'
import { useLanguage } from '../i18n/useLanguage'
import type { Project } from '../data/types'

export default function Projects() {
  const { content } = useLanguage()
  const [open, setOpen] = useState<Project | null>(null)
  // The dialog stays mounted until its own closing animation has finished.
  const [closing, setClosing] = useState(false)
  // The card the dialog grew out of, so it can shrink back into it.
  const [origin, setOrigin] = useState<HTMLElement | null>(null)
  const { ref, progress, seek, nudge } = useMarquee({ paused: open !== null })
  // Stable, so the dialog's key handler is not re-registered every render.
  const close = useCallback(() => setClosing(true), [])
  const closed = useCallback(() => { setOpen(null); setClosing(false) }, [])

  // Duplicated once so the track can wrap at the halfway point unnoticed.
  const looped = [...content.projects, ...content.projects]

  return (
    <Section id="projects" index="03" title={content.sections.projects}>
      <div className="carousel" ref={ref}>
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
                    <AnimatedStat className="project-metric-value" value={metric.value} />
                    <span className="project-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="project-actions">
                <button
                  className="project-more"
                  onClick={(event) => {
                    event.currentTarget.focus({ preventScroll: true })
                    setOrigin(event.currentTarget.closest('.project-card'))
                    setOpen(project)
                  }}
                >
                  {content.projectLabels.more}
                  <ArrowRight size={16} />
                </button>

                {project.repoUrl ? (
                  <a
                    className="project-github"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    draggable={false}
                  >
                    <GitFork size={16} />
                    {content.projectLabels.github}
                  </a>
                ) : (
                  <span className="project-private">
                    <LockKeyhole size={15} />
                    {content.projectLabels.privateRepo}
                  </span>
                )}
              </div>
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
          <ChevronLeft size={18} />
        </button>

        <label className="carousel-slider">
          <span className="sr-only">{content.projectLabels.slider}</span>
          <span className="carousel-rail" aria-hidden="true">
            <span className="carousel-fill" style={{ transform: `scaleX(${progress})` }} />
          </span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            aria-label={content.projectLabels.slider}
          />
        </label>

        <button
          className="carousel-arrow"
          onClick={() => nudge(1)}
          aria-label={content.projectLabels.next}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {open && (
        <ProjectModal project={open} origin={origin} closing={closing} onClose={close} onClosed={closed} />
      )}
    </Section>
  )
}
