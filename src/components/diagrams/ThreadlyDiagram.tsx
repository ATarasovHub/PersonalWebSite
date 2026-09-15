import DiagramFrame, { DiagramNode } from './DiagramFrame'
import { useLanguage } from '../../i18n/useLanguage'

/**
 * Self-hosted Threadly deployment: one browser-facing API delegates session
 * security and social features to separate modules backed by PostgreSQL.
 */
export default function ThreadlyDiagram() {
  const { content } = useLanguage()
  const d = content.diagrams.threadly

  const arrow = (x1: number, y1: number, x2: number, y2: number) => (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="6 6"
      markerEnd="url(#arrow)" className="diagram-flow"
    />
  )

  return (
    <DiagramFrame title={content.projectLabels.diagramTitle} caption={d.caption} minWidth={720} viewBox="0 0 840 330">
      <rect
        className="diagram-boundary"
        x="14" y="14" width="812" height="278" rx="14"
        fill="none" stroke="var(--color-accent-dim)" strokeWidth="1.5"
        strokeDasharray="7 6" opacity="0.72"
      />
      <text x="28" y="316" className="diagram-boundary-label">{d.boundary}</text>

      <DiagramNode x={28} y={66} w={170} h={88} label={d.client} sub={d.clientSub} />
      {arrow(198, 110, 224, 110)}
      <DiagramNode x={226} y={66} w={178} h={88} label={d.api} sub={d.apiSub} accent />

      <path
        className="diagram-link"
        d="M404 92 L424 92 L424 70 L444 70"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)"
      />
      <path
        className="diagram-link"
        d="M404 128 L424 128 L424 197 L444 197"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)"
      />

      <DiagramNode x={446} y={28} w={196} h={80} label={d.auth} sub={d.authSub} accent />
      <DiagramNode x={446} y={146} w={196} h={94} label={d.domain} sub={d.domainSub} accent />

      {arrow(642, 68, 674, 95)}
      {arrow(642, 193, 674, 183)}
      <DiagramNode x={676} y={74} w={130} h={134} label={d.database} sub={d.databaseSub} />

      <text x="354" y="270" textAnchor="middle" className="diagram-sub">{d.deployment}</text>
    </DiagramFrame>
  )
}
