import { motion } from 'framer-motion'
import { pageTransition } from './variants.js'
import useReducedMotion from './useReducedMotion.js'

function PageTransition({ children }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      inherit={false}
      initial={prefersReducedMotion ? false : pageTransition.hidden}
      animate={pageTransition.visible}
      exit={prefersReducedMotion ? undefined : pageTransition.exit}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
