import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import TriageDiagram from './TriageDiagram'
import { useLanguage } from '../i18n/useLanguage'

export default function Projects() {
  const { content } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section id="projects" index="03" title={content.sections.projects}>
      <div className="projects">
        {content.projects.map((project, i) => {
          const isOpen = openIndex === i
          return (
            <Reveal key={project.title} from={i % 2 === 0 ? 'left' : 'right'} amount={0.15}>
              <article className={isOpen ? 'project-card is-open' : 'project-card'}>
                <span className="project-index">{String(i + 1).padStart(2, '0')}</span>

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

                <button
                  className="project-more"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {isOpen ? content.projectLabels.less : content.projectLabels.more}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'inline-flex' }}
                  >
                    <ChevronDown size={16} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="project-detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
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

                      {project.diagram && <TriageDiagram />}

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
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
