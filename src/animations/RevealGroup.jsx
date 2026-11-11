import { Children } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { motionConfig } from './motionConfig.js'
import useReducedMotion from './useReducedMotion.js'
import { fadeUp } from './variants.js'

function RevealItem({ child, variants, prefersReducedMotion }) {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { damping: 22, stiffness: 220, mass: 0.6 })
  const rotateY = useSpring(rawY, { damping: 22, stiffness: 220, mass: 0.6 })

  function handlePointerMove(event) {
    if (prefersReducedMotion || event.pointerType !== 'mouse') return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    rawX.set((0.5 - y) * 9)
    rawY.set((x - 0.5) * 9)
    event.currentTarget.style.setProperty('--nx-pointer-x', `${x * 100}%`)
    event.currentTarget.style.setProperty('--nx-pointer-y', `${y * 100}%`)
  }

  function handlePointerLeave(event) {
    rawX.set(0)
    rawY.set(0)
    event.currentTarget.style.setProperty('--nx-pointer-x', '50%')
    event.currentTarget.style.setProperty('--nx-pointer-y', '50%')
  }

  return (
    <motion.div
      className="nx-motion-item nx-motion-item--interactive"
      variants={variants}
      style={!prefersReducedMotion
        ? { rotateX, rotateY, transformPerspective: 900 }
        : undefined}
      whileHover={!prefersReducedMotion ? { y: -4, scale: 1.015 } : undefined}
      whileTap={!prefersReducedMotion ? { y: -1, scale: 0.985 } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {child}
    </motion.div>
  )
}

function RevealGroup({
  as = 'div',
  className,
  children,
  delayChildren = 0,
  stagger = motionConfig.stagger,
  childVariants = fadeUp,
  interactive = false,
}) {
  const prefersReducedMotion = useReducedMotion()
  const MotionElement = motion[as]
  const variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren,
        staggerChildren: stagger,
      },
    },
  }

  return (
    <MotionElement
      className={className}
      variants={variants}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={motionConfig.viewport}
    >
      {Children.map(children, (child) => interactive ? (
        <RevealItem
          key={child.key}
          child={child}
          variants={childVariants}
          prefersReducedMotion={prefersReducedMotion}
        />
      ) : (
        <motion.div key={child.key} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </MotionElement>
  )
}

export default RevealGroup
