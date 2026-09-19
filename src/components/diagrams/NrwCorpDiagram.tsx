import DiagramFrame, { DiagramNode } from './DiagramFrame'
import { useLanguage } from '../../i18n/useLanguage'

/** Network and automation layers of the NRW Corp Windows infrastructure lab. */
export default function NrwCorpDiagram() {
  const { content } = useLanguage()
  const d = content.diagrams.nrw

  const flow = (path: string) => (
    <path
      d={path}
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2"
      strokeDasharray="6 6"
      markerEnd="url(#arrow)"
      className="diagram-flow"
    />
  )

  return (
    <DiagramFrame title={content.projectLabels.diagramTitle} caption={d.caption} minWidth={760} viewBox="0 0 900 390">
      <rect
        className="diagram-boundary"
        x="14" y="14" width="872" height="322" rx="14"
        fill="none" stroke="var(--color-accent-dim)" strokeWidth="1.5"
        strokeDasharray="7 6" opacity="0.72"
      />
      <text x="28" y="364" className="diagram-boundary-label">{d.boundary}</text>

      <DiagramNode x={34} y={126} w={180} h={94} label={d.edge} sub={d.edgeSub} accent />

      {flow('M214 156 L244 156 L244 76 L274 76')}
      {flow('M214 173 L274 173')}
      {flow('M214 192 L244 192 L244 282 L274 282')}

      <DiagramNode x={276} y={34} w={204} h={84} label={d.management} sub={d.managementSub} />
      <DiagramNode x={276} y={130} w={204} h={90} label={d.domain} sub={d.domainSub} accent />
      <DiagramNode x={276} y={240} w={204} h={84} label={d.clients} sub={d.clientsSub} />

      {flow('M480 175 L522 175')}
      <DiagramNode x={524} y={130} w={220} h={90} label={d.services} sub={d.servicesSub} />

      <path
        className="diagram-link"
        d="M776 76 L790 76 L790 282 L776 282"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5"
      />
      <path
        className="diagram-link"
        d="M744 175 L790 175"
        fill="none" stroke="var(--color-border)" strokeWidth="1.5"
      />
      <text x="650" y="282" textAnchor="middle" className="diagram-sub">{d.automation}</text>
    </DiagramFrame>
  )
}
