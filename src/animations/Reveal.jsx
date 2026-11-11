import { motion } from 'framer-motion'
import { motionConfig } from './motionConfig.js'
import useReducedMotion from './useReducedMotion.js'
import { delayedRevealVariants } from './variants.js'

function Reveal({
  direction = 'up',
  delay = 0,
  as = 'div',
  className,
  children,
}) {
  const prefersReducedMotion = useReducedMotion()
  const MotionElement = motion[as]
  const variants = delayedRevealVariants(direction, delay)

  return (
    <MotionElement
      className={className}
      variants={variants}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={motionConfig.viewport}
    >
      {children}
    </MotionElement>
  )
}

export default Reveal
