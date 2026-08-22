import { motion, useReducedMotion } from 'framer-motion'
import DiagramFrame, { DiagramNode } from './DiagramFrame'
import { useLanguage } from '../../i18n/useLanguage'

/**
 * Local-first data flow of the warehouse app: writes go down through a
 * validating repository into Room, reads come back up as Flows.
 */
export default function StockKeeperDiagram() {
  const { content } = useLanguage()
  const d = content.diagrams.stock
  const shouldReduceMotion = useReducedMotion()

  const flow = shouldReduceMotion
    ? {}
    : {
        strokeDashoffset: [12, 0],
        transition: { duration: 1.2, repeat: Infinity, ease: 'linear' as const },
      }

  return (
    <DiagramFrame title={content.projectLabels.diagramTitle} caption={d.caption} minWidth={700} viewBox="0 0 820 330">
      {/* device boundary: nothing leaves it unless exported */}
      <rect
        x="14" y="14" width="560" height="302"
        rx="14" fill="none"
        stroke="var(--color-accent-dim)" strokeWidth="1.5" strokeDasharray="7 6" opacity="0.7"
      />
      <text x="26" y="308" className="diagram-boundary-label">{d.boundary}</text>

      <DiagramNode x={40} y={34} w={500} h={62} label={d.ui} sub={d.uiSub} />

      <motion.line
        x1={200} y1={96} x2={200} y2={126}
        stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="6 6"
        markerEnd="url(#arrow)" animate={flow}
      />
      <text x={212} y={116} className="diagram-sub">{d.writes}</text>

      {/* reads travel back up as reactive streams */}
      <path
        d="M420 126 L420 96"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)"
      />
      <text x={430} y={116} className="diagram-sub">{d.reads}</text>

      <DiagramNode x={40} y={126} w={500} h={70} label={d.repo} sub={d.repoSub} accent />

      <motion.line
        x1={200} y1={196} x2={200} y2={226}
        stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="6 6"
        markerEnd="url(#arrow)" animate={flow}
      />
      <path
        d="M420 226 L420 196"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)"
      />

      <DiagramNode x={40} y={226} w={500} h={66} label={d.room} sub={d.roomSub} accent />

      {/* exports are the only way data leaves the device */}
      <line
        x1={574} y1={165} x2={606} y2={165}
        stroke="var(--color-border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)"
      />
      <DiagramNode x={608} y={100} w={196} h={62} label={d.excel} sub={d.excelSub} />
      <DiagramNode x={608} y={176} w={196} h={62} label={d.backup} sub={d.backupSub} />
    </DiagramFrame>
  )
}
