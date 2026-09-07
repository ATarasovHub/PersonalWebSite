import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP, motionQuery } from '../../animation/gsap'

type DiagramFrameProps = {
  title: string
  caption: string
  /** Minimum width before the diagram starts scrolling inside its own box. */
  minWidth: number
  viewBox: string
  children: ReactNode
}

/** Shared chrome for the architecture diagrams: heading, scroll box, caption. */
export default function DiagramFrame({
  title,
  caption,
  minWidth,
  viewBox,
  children,
}: DiagramFrameProps) {
  const ref = useRef<HTMLElement>(null)

  // The schematic assembles itself: boundary, then boxes, then the arrows
  // between them. Once it stands, the dashed arrows drift to show direction.
  useGSAP(() => {
    const media = gsap.matchMedia()
    media.add(motionQuery, () => {
      const svg = ref.current?.querySelector('svg')
      if (!svg) return
      const flows = svg.querySelectorAll('.diagram-flow')

      const links = svg.querySelectorAll<SVGElement>('.diagram-link')
      const build = gsap.timeline({ delay: 0.35, defaults: { ease: 'power2.out' } })
        .from(svg.querySelectorAll('.diagram-boundary'), { opacity: 0, duration: 0.6 }, 0)
        .from(svg.querySelectorAll('.diagram-node'), {
          opacity: 0, y: 14, scale: 0.94, transformOrigin: '50% 50%',
          stagger: 0.07, duration: 0.5,
        }, 0.08)
        .from(flows, { opacity: 0, duration: 0.35, stagger: 0.07 }, 0.34)
        // Solid feedback paths draw themselves along their route. DrawSVG works
        // through the dash pattern, so hand the stroke back once it is whole.
        .from(links, {
          drawSVG: 0, opacity: 0, duration: 0.65, stagger: 0.12, ease: 'power2.inOut',
          onComplete: () => links.forEach((link) => {
            link.style.removeProperty('stroke-dasharray')
            link.style.removeProperty('stroke-dashoffset')
          }),
        }, 0.46)
        .from(svg.querySelectorAll(':scope > text'), { opacity: 0, duration: 0.4, stagger: 0.05 }, 0.6)

      const drift = gsap.fromTo(flows,
        { strokeDashoffset: 12 },
        { strokeDashoffset: 0, duration: 1.1, ease: 'none', repeat: -1, paused: true },
      )
      build.eventCallback('onComplete', () => drift.play())
      return () => { build.kill(); drift.kill() }
    })
    return () => media.revert()
  }, { scope: ref })

  return (
    <figure className="diagram" ref={ref}>
      <figcaption className="diagram-title">{title}</figcaption>

      <div className="diagram-scroll">
        <svg viewBox={viewBox} role="img" aria-label={title} style={{ minWidth }}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--color-accent)" />
            </marker>
            <marker id="arrow-dim" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="var(--color-border)" />
            </marker>
          </defs>
          {children}
        </svg>
      </div>

      <p className="diagram-caption">{caption}</p>
    </figure>
  )
}

type NodeProps = {
  x: number
  y: number
  w?: number
  h?: number
  label: string
  /** Pass an array to wrap the subtitle over several lines. */
  sub?: string | string[]
  accent?: boolean
}

/** A labelled box in a flow. */
export function DiagramNode({ x, y, w = 176, h = 74, label, sub, accent }: NodeProps) {
  const subLines = sub === undefined ? [] : Array.isArray(sub) ? sub : [sub]

  return (
    <g className="diagram-node">
      <rect
        x={x} y={y} width={w} height={h}
        rx="12"
        fill="var(--color-surface)"
        stroke={accent ? 'var(--color-accent-dim)' : 'var(--color-border)'}
        strokeWidth="1.5"
      />
      <text
        x={x + w / 2}
        y={subLines.length > 0 ? y + 30 : y + h / 2 + 5}
        textAnchor="middle"
        className="diagram-label"
      >
        {label}
      </text>
      {subLines.map((line, i) => (
        <text
          key={line}
          x={x + w / 2}
          y={y + 50 + i * 15}
          textAnchor="middle"
          className="diagram-sub"
        >
          {line}
        </text>
      ))}
    </g>
  )
}
