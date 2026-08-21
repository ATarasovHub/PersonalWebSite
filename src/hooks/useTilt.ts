import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'

type TiltResult = {
  ref: React.RefObject<HTMLDivElement | null>
  rotateX: MotionValue<number>
  rotateY: MotionValue<number>
  glowX: MotionValue<number>
  glowY: MotionValue<number>
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void
  onPointerLeave: () => void
}

export function useTilt(maxDegrees = 14): TiltResult {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const springConfig = { stiffness: 150, damping: 18, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [0, 1], [maxDegrees, -maxDegrees]), springConfig)
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxDegrees, maxDegrees]), springConfig)
  const glowX = useSpring(useTransform(x, [0, 1], [0, 100]), springConfig)
  const glowY = useSpring(useTransform(y, [0, 1], [0, 100]), springConfig)

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const onPointerLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return { ref, rotateX, rotateY, glowX, glowY, onPointerMove, onPointerLeave }
}
