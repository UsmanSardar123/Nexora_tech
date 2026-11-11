import { motion, useMotionValue, useSpring } from 'framer-motion'
import { motionConfig } from './motionConfig.js'
import useReducedMotion from './useReducedMotion.js'

function Pressable({ children, className }) {
  const prefersReducedMotion = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { damping: 18, stiffness: 180, mass: 0.5 })
  const y = useSpring(rawY, { damping: 18, stiffness: 180, mass: 0.5 })

  function handlePointerMove(event) {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    rawX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 7)
    rawY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 6)
  }

  function handlePointerLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      className={className ? `nx-magnetic ${className}` : 'nx-magnetic'}
      style={prefersReducedMotion ? undefined : { x, y }}
      whileTap={prefersReducedMotion ? undefined : { scale: motionConfig.tapScale }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  )
}

export default Pressable
