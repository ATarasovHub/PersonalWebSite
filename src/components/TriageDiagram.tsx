import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '../i18n/useLanguage'

/**
 * Flow of the on-prem ticket triage service. Drawn rather than linked,
 * since the code itself is the employer's and cannot be published.
 */
export default function TriageDiagram() {
  const { content } = useLanguage()
  const d = content.diagram
  const shouldReduceMotion = useReducedMotion()

  const boxes = [
    { x: 8, label: d.jira, sub: d.jiraSub, inside: false },
    { x: 210, label: d.api, sub: d.apiSub, inside: true },
    { x: 412, label: d.llm, sub: d.llmSub, inside: true },
    { x: 614, label: d.chat, sub: d.chatSub, inside: true },
  ]

  const flow = shouldReduceMotion
    ? {}
    : { strokeDashoffset: [12, 0], transition: { duration: 1.1, repeat: Infinity, ease: 'linear' as const } }

  return (
    <figure className="diagram">
      <figcaption className="diagram-title">{content.projectLabels.diagramTitle}</figcaption>

      <div className="diagram-scroll">
        <svg viewBox="0 0 800 250" role="img" aria-label={content.projectLabels.diagramTitle}>
          {/* on-prem boundary */}
          <rect
            x="196" y="18" width="596" height="150"
            rx="14"
            fill="none"
            stroke="var(--color-accent-dim)"
            strokeWidth="1.5"
            strokeDasharray="7 6"
            opacity="0.75"
          />
          <text x="206" y="186" className="diagram-boundary-label">
            {d.boundary}
          </text>

          {boxes.map((box, i) => (
            <g key={box.label}>
              <rect
                x={box.x} y={54} width={178} height={78}
                rx="12"
                fill="var(--color-surface)"
                stroke={box.inside ? 'var(--color-accent-dim)' : 'var(--color-border)'}
                strokeWidth="1.5"
              />
              <text x={box.x + 89} y={88} textAnchor="middle" className="diagram-label">
                {box.label}
              </text>
              <text x={box.x + 89} y={110} textAnchor="middle" className="diagram-sub">
                {box.sub}
              </text>

              {i < boxes.length - 1 && (
                <motion.line
                  x1={box.x + 178} y1={93}
                  x2={box.x + 210} y2={93}
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  markerEnd="url(#arrow)"
                  animate={flow}
                />
              )}
            </g>
          ))}

          {/* validation loop under the LLM step */}
          <path
            d="M501 132 L501 152 L390 152 L390 132"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1.5"
            markerEnd="url(#arrow-dim)"
          />
          <text x="446" y="170" textAnchor="middle" className="diagram-sub">
            {d.validate} · {d.retry}
          </text>

          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--color-accent)" />
            </marker>
            <marker id="arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--color-border)" />
            </marker>
          </defs>
        </svg>
      </div>

      <p className="diagram-caption">{content.projectLabels.diagramCaption}</p>
    </figure>
  )
}
