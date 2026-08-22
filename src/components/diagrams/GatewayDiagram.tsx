import { motion, useReducedMotion } from 'framer-motion'
import DiagramFrame, { DiagramNode } from './DiagramFrame'
import { useLanguage } from '../../i18n/useLanguage'

/**
 * Messaging gateway: the request returns as soon as the message is
 * persisted, and delivery happens asynchronously once that transaction
 * commits, so a slow provider never blocks the caller.
 */
export default function GatewayDiagram() {
  const { content } = useLanguage()
  const d = content.diagrams.gateway
  const shouldReduceMotion = useReducedMotion()

  const flow = shouldReduceMotion
    ? {}
    : {
        strokeDashoffset: [12, 0],
        transition: { duration: 1.1, repeat: Infinity, ease: 'linear' as const },
      }

  const arrow = (x1: number, y1: number, x2: number, y2: number) => (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="6 6"
      markerEnd="url(#arrow)" animate={flow}
    />
  )

  return (
    <DiagramFrame title={content.projectLabels.diagramTitle} caption={d.caption} minWidth={720} viewBox="0 0 840 320">
      {/* synchronous leg: returns 202 without waiting for a provider */}
      <DiagramNode x={10} y={40} label={d.request} sub={d.requestSub} />
      {arrow(186, 77, 218, 77)}
      <DiagramNode x={220} y={40} label={d.rateLimit} sub={d.rateLimitSub} accent />
      {arrow(396, 77, 428, 77)}
      <DiagramNode x={430} y={40} label={d.store} sub={d.storeSub} accent />

      <text x={518} y={132} textAnchor="middle" className="diagram-sub">{d.accepted}</text>

      {/* the commit boundary is what starts async delivery */}
      <line
        x1={518} y1={114} x2={518} y2={150}
        stroke="var(--color-accent-dim)" strokeWidth="1.5" strokeDasharray="5 5" markerEnd="url(#arrow-dim)"
      />

      <DiagramNode x={430} y={152} w={176} h={84} label={d.event} sub={d.eventSub} accent />
      {arrow(430, 194, 398, 194)}
      <DiagramNode x={220} y={152} w={176} h={84} label={d.router} sub={d.routerSub} accent />
      {arrow(220, 194, 188, 194)}
      <DiagramNode x={10} y={152} w={176} h={84} label={d.providers} sub={d.providersSub} />

      {/* provider callback closes the loop */}
      <path
        d="M98 236 L98 282 L700 282 L700 112"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5" markerEnd="url(#arrow-dim)"
      />
      <text x={400} y={300} textAnchor="middle" className="diagram-sub">{d.webhook}</text>

      <DiagramNode x={620} y={40} w={200} h={72} label={d.states} sub={d.statesSub} />
    </DiagramFrame>
  )
}
