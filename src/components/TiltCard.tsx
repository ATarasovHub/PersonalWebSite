import { motion, useMotionTemplate } from 'framer-motion'
import { useTilt } from '../hooks/useTilt'
import photo from '../assets/photo.jpg'

export default function TiltCard() {
  const { ref, rotateX, rotateY, glowX, glowY, onPointerMove, onPointerLeave } = useTilt(12)
  const glowBackground = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, var(--color-accent-glow), transparent 60%)`

  return (
    <motion.div
      ref={ref}
      className="tilt-card"
      style={{ rotateX, rotateY }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      initial={{ opacity: 0, scale: 0.92, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
    >
      <motion.div className="tilt-card-glow" style={{ background: glowBackground }} />
      <div className="tilt-card-photo">
        <img src={photo} alt="Andrii Tarasov" />
      </div>
      <div className="tilt-card-shine" />
    </motion.div>
  )
}
