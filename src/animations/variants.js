import { motionConfig } from './motionConfig.js'

const transition = (delay = 0) => ({
  duration: motionConfig.duration,
  ease: motionConfig.ease,
  delay,
})

const revealVariant = (from, delay = 0) => ({
  hidden: { opacity: 0, ...from },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: transition(delay),
  },
})

export const fadeUp = revealVariant({ y: motionConfig.distance })
export const fadeLeft = revealVariant({ x: -motionConfig.distance })
export const fadeRight = revealVariant({ x: motionConfig.distance })
export const fadeIn = revealVariant({})
export const scaleIn = revealVariant({ scale: 0.96 })

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionConfig.stagger,
    },
  },
}

export const delayedRevealVariants = (direction, delay) => {
  const variants = {
    up: fadeUp,
    left: fadeLeft,
    right: fadeRight,
    none: fadeIn,
  }[direction]

  return {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: transition(delay),
    },
  }
}

export const pageTransition = {
  hidden: {
    opacity: 0,
    y: motionConfig.pageTransition.distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionConfig.pageTransition.duration,
      ease: motionConfig.ease,
    },
  },
  exit: {
    opacity: 0,
    y: -motionConfig.pageTransition.distance,
    transition: {
      duration: motionConfig.pageTransition.duration,
      ease: motionConfig.ease,
    },
  },
}

export const navbarFadeDown = {
  hidden: {
    opacity: 0,
    y: -motionConfig.navbar.distance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionConfig.duration,
      ease: motionConfig.ease,
    },
  },
}
