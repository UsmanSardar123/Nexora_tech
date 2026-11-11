import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { motionConfig } from './motionConfig.js'
import useReducedMotion from './useReducedMotion.js'

function formatNumber(number, pad) {
  return String(number).padStart(pad, '0')
}

function formatValue(value, secondaryValue, pad, prefix, suffix, separator) {
  const primary = `${prefix}${formatNumber(value, pad)}${suffix}`
  return secondaryValue === undefined
    ? primary
    : `${primary}${separator}${formatNumber(secondaryValue, 0)}`
}

function CountUp({
  value,
  secondaryValue,
  prefix = '',
  suffix = '',
  separator = '/',
  pad = 0,
  delay = 0,
  startOnLoad = false,
}) {
  const ref = useRef(null)
  const animationRef = useRef(null)
  const hasStarted = useRef(false)
  const isInView = useInView(ref, motionConfig.viewport)
  const prefersReducedMotion = useReducedMotion()
  const shouldStart = startOnLoad || isInView
  const finalValue = formatValue(
    value,
    secondaryValue,
    pad,
    prefix,
    suffix,
    separator,
  )
  const [progress, setProgress] = useState(0)
  const displayValue = prefersReducedMotion
    ? finalValue
    : formatValue(
        Math.round(value * progress),
        secondaryValue === undefined
          ? undefined
          : Math.round(secondaryValue * progress),
        pad,
        prefix,
        suffix,
        separator,
      )

  useEffect(() => {
    if (prefersReducedMotion || !shouldStart || hasStarted.current) {
      return undefined
    }

    hasStarted.current = true
    const controls = animate(0, 1, {
      delay,
      duration: startOnLoad ? 1.8 : motionConfig.duration,
      ease: startOnLoad ? 'easeOut' : motionConfig.ease,
      onUpdate: setProgress,
      onComplete: () => setProgress(1),
    })
    animationRef.current = controls

    return () => {
      controls.stop()
      animationRef.current = null
      hasStarted.current = false
    }
  }, [delay, prefersReducedMotion, shouldStart, startOnLoad])

  return (
    <span
      ref={ref}
      className="nx-count-up"
      aria-label={finalValue}
      aria-live="off"
    >
      <span className="nx-count-up__reserve" aria-hidden="true">
        {finalValue}
      </span>
      <span className="nx-count-up__value" aria-hidden="true">
        {displayValue}
      </span>
    </span>
  )
}

export default CountUp
