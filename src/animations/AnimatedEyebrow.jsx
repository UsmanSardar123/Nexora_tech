import { motion } from 'framer-motion'
import { motionConfig } from './motionConfig.js'
import useReducedMotion from './useReducedMotion.js'

function AnimatedEyebrow({ children }) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span className="nx-eyebrow">{children}</span>
  }


  return (
    <motion.span
      className="nx-eyebrow"
      initial={{ opacity: 0, letterSpacing: `${motionConfig.eyebrowLetterSpacing}px` }}
      whileInView={{ opacity: 1, letterSpacing: '1.6px' }}
      viewport={motionConfig.viewport}
      transition={{
        duration: motionConfig.duration,
        ease: motionConfig.ease,
      }}
    >
      {children}
    </motion.span>
  )
}


export default AnimatedEyebrow



