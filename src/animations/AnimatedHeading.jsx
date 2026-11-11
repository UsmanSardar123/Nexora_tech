import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { motionConfig } from './motionConfig.js'
import { parseMarkedText } from './parseMarkedText.js'
import useReducedMotion from './useReducedMotion.js'

const wordVariants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: {
      duration: motionConfig.headingWordDuration,
      ease: motionConfig.ease,
    },
  },
}

const headingVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionConfig.headingWordStagger,
    },
  },
}

function renderStaticSegments(segments, lightGradient, underline) {
  const firstBluePhraseIndex = segments.findIndex((segment) => segment.blue)

  return segments.map((segment, segmentIndex) => {
    const words = segment.text.split(/(\s+)/)
    if (!segment.blue) {
      return <span key={`plain-${segmentIndex}`}>{segment.text}</span>
    }

    const phraseClassName = [
      'animated-heading__phrase',
      lightGradient && 'animated-heading__phrase--light',
      underline &&
        segmentIndex === firstBluePhraseIndex &&
        'animated-heading__phrase--underline',
    ]
      .filter(Boolean)
      .join(' ')
    return (
      <span className={phraseClassName} key={`blue-${segmentIndex}`}>
        {words.map((word, wordIndex) => (
          <span
            className={/\s/.test(word) ? undefined : 'animated-heading__word'}
            key={`word-${wordIndex}`}
          >
            {word}
          </span>
        ))}
      </span>
    )
  })
}

function renderMotionWords(text, blue) {
  return text.split(/(\s+)/).map((word, wordIndex) =>
    /\s/.test(word) ? (
      <Fragment key={`space-${wordIndex}`}>{word}</Fragment>
    ) : (
      <span className="animated-heading__mask" key={`word-${wordIndex}`}>
        <motion.span
          className={`animated-heading__word${blue ? ' animated-heading__word--blue' : ''}`}
          variants={wordVariants}
        >
          {word}
        </motion.span>
      </span>
    ),
  )
}

function AnimatedHeading({
  text,
  tag = 'h2',
  className = '',
  underline = false,
  lightGradient = false,
}) {
  const prefersReducedMotion = useReducedMotion()
  const [hasRevealed, setHasRevealed] = useState(prefersReducedMotion)
  const Tag = ['h1', 'h2', 'h3'].includes(tag) ? tag : 'h2'
  const MotionTag = motion[Tag]
  const segments = parseMarkedText(text)
  const firstBluePhraseIndex = segments.findIndex((segment) => segment.blue)
  const animatedHeadingStyle = {
    '--animated-heading-underline-duration': `${motionConfig.headingUnderlineDuration}s`,
  }

  if (prefersReducedMotion) {
    return (
      <Tag
        aria-label={text.replace(/[{}]/g, '')}
        className={`animated-heading ${className} is-visible`}
        style={animatedHeadingStyle}
      >
        {renderStaticSegments(segments, lightGradient, underline)}
      </Tag>
    )
  }

  return (
    <MotionTag
      aria-label={text.replace(/[{}]/g, '')}
      className={`animated-heading ${className}${hasRevealed ? ' is-visible' : ''}`}
      style={animatedHeadingStyle}
      initial="hidden"
      whileInView="visible"
      viewport={motionConfig.viewport}
      variants={headingVariants}
      onAnimationComplete={(definition) => {
        if (definition === 'visible') setHasRevealed(true)
      }}
    >
      {segments.map((segment, segmentIndex) => {
        if (!segment.blue) {
          return (
            <span key={`plain-${segmentIndex}`}>
              {renderMotionWords(segment.text, false)}
            </span>
          )
        }

        const phraseClassName = [
          'animated-heading__phrase',
          lightGradient && 'animated-heading__phrase--light',
          underline &&
            segmentIndex === firstBluePhraseIndex &&
            'animated-heading__phrase--underline',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <span className={phraseClassName} key={`blue-${segmentIndex}`}>
            {renderMotionWords(segment.text, true)}
          </span>
        )
      })}
    </MotionTag>
  )
}

export default AnimatedHeading