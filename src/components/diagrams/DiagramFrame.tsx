import type { ReactNode } from 'react'

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
  return (
    <figure className="diagram">
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
    <g>
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
