import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/hero-dashboard-workspace.svg'
import AnimatedEyebrow from '../../animations/AnimatedEyebrow.jsx'
import AnimatedHeading from '../../animations/AnimatedHeading.jsx'
import CountUp from '../../animations/CountUp.jsx'
import Pressable from '../../animations/Pressable.jsx'
import Reveal from '../../animations/Reveal.jsx'
import RevealGroup from '../../animations/RevealGroup.jsx'
import { motionConfig } from '../../animations/motionConfig.js'
import { countMarkedWords } from '../../animations/parseMarkedText.js'
import { fadeUp } from '../../animations/variants.js'
import useReducedMotion from '../../animations/useReducedMotion.js'
import { homeHeadings, stats } from '../../data/homeData.js'

function StatIcon({ statId }) {
  const paths = {
    'core-services': (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    'projects-delivered': (
      <>
        <path d="M4 5.5 12 2l8 3.5v13L12 22l-8-3.5v-13Z" />
        <path d="m4.5 6 7.5 3.5L19.5 6M12 10v11" />
      </>
    ),
    'client-focus': (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    'support-availability': (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      className="nx-stat-icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      >
        {paths[statId]}
      </g>
    </svg>
  )
}

function Hero() {
  const prefersReducedMotion = useReducedMotion()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const backgroundParallax = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 28],
  )
  const paragraphDelay =
    motionConfig.headingWordDuration +
    (countMarkedWords(homeHeadings.hero) - 1) *
      motionConfig.headingWordStagger

  return (
    <section className="nx-hero" ref={heroRef}>
      <motion.div
        aria-hidden="true"
        className="nx-hero-parallax"
        style={{ y: backgroundParallax }}
      />
      <div className="nx-hero-content">
        <Reveal className="nx-hero-copy" direction="left">
          <AnimatedEyebrow>NEXORA TECHNOLOGIES</AnimatedEyebrow>
          <AnimatedHeading
            text={homeHeadings.hero}
            tag="h1"
            underline
          />
          <Reveal as="p" direction="up" delay={paragraphDelay}>
            We help businesses grow with modern websites, mobile applications,
            and custom software built around their goals.
          </Reveal>
        </Reveal>

        <RevealGroup
          className="nx-hero-buttons"
          delayChildren={paragraphDelay + motionConfig.duration}
          stagger={0.14}
          childVariants={fadeUp}
        >
          <Pressable key="services">
            <Link
              className="nx-btn nx-btn-primary"
              to="#nx-services"
              onClick={(event) => {
                event.preventDefault()
                document.getElementById('nx-services')?.scrollIntoView({
                  behavior: prefersReducedMotion ? 'auto' : 'smooth',
                  block: 'start',
                })
              }}
            >
              Our Services <span aria-hidden="true">→</span>
            </Link>
          </Pressable>
          <Pressable key="contact">
            <Link className="nx-btn nx-btn-outline" to="/contact">
              Contact Us
            </Link>
          </Pressable>
        </RevealGroup>

        <RevealGroup className="nx-stats" delayChildren={0.08} stagger={0.1} interactive>
          {stats.map((stat, index) => (
            <div className="nx-stat" key={stat.id}>
              <StatIcon statId={stat.id} />
              <div className="nx-stat-copy">
                <strong>
                  <CountUp
                    value={stat.value}
                    secondaryValue={stat.secondaryValue}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    pad={stat.pad}
                    startOnLoad
                    delay={0.3 + index * 0.12}
                  />
                </strong>
                <span>{stat.label}</span>
              </div>
            </div>
          ))}
        </RevealGroup>
      </div>

      <Reveal className="nx-hero-visual" direction="right">
        <motion.div
          className="nx-hero-image"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -12, 0], rotate: [0, 0.8, 0, -0.6, 0] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }
          }
        >
          <div className="nx-hero-image-inner">
            <img
              className="nx-hero-image-content"
              src={heroImage}
              alt="Silver laptop displaying blue business analytics charts, with a green plant, branded mug, blue notebook, and pen on a light desk"
              width="1200"
              height="800"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </Reveal>
    </section>
  )
}

export default Hero
