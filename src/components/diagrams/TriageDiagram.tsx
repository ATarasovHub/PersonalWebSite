import { motion, useReducedMotion } from 'framer-motion'
import DiagramFrame, { DiagramNode } from './DiagramFrame'
import { useLanguage } from '../../i18n/useLanguage'

/**
 * Flow of the on-prem ticket triage service. Drawn rather than linked,
 * since that code belongs to the employer and cannot be published.
 */
export default function TriageDiagram() {
  const { content } = useLanguage()
  const d = content.diagrams.triage
  const shouldReduceMotion = useReducedMotion()

  const flow = shouldReduceMotion
    ? {}
    : {
        strokeDashoffset: [12, 0],
        transition: { duration: 1.1, repeat: Infinity, ease: 'linear' as const },
      }

  const nodes = [
    { x: 8, label: d.jira, sub: d.jiraSub, accent: false },
    { x: 210, label: d.api, sub: d.apiSub, accent: true },
    { x: 412, label: d.llm, sub: d.llmSub, accent: true },
    { x: 614, label: d.chat, sub: d.chatSub, accent: true },
  ]

  return (
    <DiagramFrame title={content.projectLabels.diagramTitle} caption={d.caption} minWidth={680} viewBox="0 0 800 232">
      <rect
        x="196" y="18" width="596" height="174"
        rx="14"
        fill="none"
        stroke="var(--color-accent-dim)"
        strokeWidth="1.5"
        strokeDasharray="7 6"
        opacity="0.75"
      />
      <text x="206" y="212" className="diagram-boundary-label">{d.boundary}</text>

      {nodes.map((n, i) => (
        <g key={n.label}>
          <DiagramNode x={n.x} y={52} h={88} label={n.label} sub={n.sub} accent={n.accent} />
          {i < nodes.length - 1 && (
            <motion.line
              x1={n.x + 176} y1={96} x2={n.x + 208} y2={96}
              stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="6 6"
              markerEnd="url(#arrow)" animate={flow}
            />
          )}
        </g>
      ))}

      <path
        d="M500 140 L500 158 L388 158 L388 140"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)"
      />
      <text x="444" y="176" textAnchor="middle" className="diagram-sub">
        {d.validate} · {d.retry}
      </text>
    </DiagramFrame>
  )
}
