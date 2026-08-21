import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import TriageDiagram from './diagrams/TriageDiagram'
import StockKeeperDiagram from './diagrams/StockKeeperDiagram'
import GatewayDiagram from './diagrams/GatewayDiagram'
import { useLanguage } from '../i18n/useLanguage'
import type { Project } from '../data/types'

type Props = {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: Props) {
  const { content } = useLanguage()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

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

    // Freeze the page behind the dialog without letting it jump sideways.
    const previousOverflow = document.body.style.overflow
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = ''
    }
  }, [onClose])

  return createPortal(
    <motion.div
      className="modal-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
    >
      <motion.div
        ref={panelRef}
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="modal-head">
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

        <div className="modal-body">
          <p className="project-summary">{project.summary}</p>

          <div className="project-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="project-metric">
                <span className="project-metric-value">{metric.value}</span>
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
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
