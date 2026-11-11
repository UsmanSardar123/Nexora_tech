import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useReducedMotion from '../animations/useReducedMotion.js'
import '../styles/services.css'

const services = [
  {
    title: 'Web Development',
    description:
      'Build modern, responsive websites that help businesses establish a strong online presence. From company websites to custom web applications, we deliver fast, secure, and scalable solutions.',
    icon: 'code',
  },
  {
    title: 'Mobile App Development',
    description:
      'Turn your ideas into powerful mobile applications for Android and iOS. We develop intuitive, high-performance apps that keep your users engaged and your business connected.',
    icon: 'mobile',
  },
  {
    title: 'Cloud Computing',
    description:
      'Simplify your business with reliable and scalable cloud solutions. We help you manage data, improve collaboration, and maintain secure access to your applications and services.',
    icon: 'cloud',
  },
  {
    title: 'AI Integration',
    description:
      'Enhance your business with intelligent, AI-powered solutions. We integrate automation, smart tools, and AI features into your applications to improve efficiency and support better decisions.',
    icon: 'ai',
  },
]

const benefits = [
  {
    title: 'Modern Technology',
    description: 'Built with the latest tools and best practices.',
    icon: 'technology',
  },
  {
    title: 'Secure & Reliable',
    description: 'Your data and business are always protected.',
    icon: 'security',
  },
  {
    title: 'Scalable Solutions',
    description: 'Grow your business without limitations.',
    icon: 'scalable',
  },
  {
    title: 'Ongoing Support',
    description: "We're with you at every step.",
    icon: 'support',
  },
]

function ServiceIcon({ name }) {
  const commonProps = {
    viewBox: '0 0 48 48',
    'aria-hidden': true,
  }

  if (name === 'code') {
    return (
      <svg {...commonProps}>
        <path d="M17 14 7 24l10 10M31 14l10 10-10 10M27 10l-6 28" />
      </svg>
    )
  }

  if (name === 'mobile') {
    return (
      <svg {...commonProps}>
        <rect x="12" y="4" width="24" height="40" rx="4" />
        <path d="M19 9h10M22 38h4" />
      </svg>
    )
  }

  if (name === 'cloud') {
    return (
      <svg {...commonProps}>
        <path d="M12 36h25c6 0 9-5 9-10 0-6-5-10-11-10-2-8-9-12-16-10-6 1-10 6-11 12-5 2-7 6-6 11 1 4 5 7 10 7Z" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <rect x="10" y="10" width="28" height="28" rx="5" />
      <path d="M18 4v6M30 4v6M18 38v6M30 38v6M4 18h6M4 30h6M38 18h6M38 30h6" />
      <text
        x="24"
        y="29"
        fill="currentColor"
        stroke="none"
        fontSize="15"
        fontWeight="700"
        textAnchor="middle"
      >
        AI
      </text>
    </svg>
  )
}

function BenefitIcon({ name }) {
  const commonProps = {
    viewBox: '0 0 48 48',
    'aria-hidden': true,
  }

  if (name === 'technology') {
    return (
      <svg {...commonProps}>
        <path d="m27 3-15 23h11l-3 19 17-26H25Z" />
      </svg>
    )
  }

  if (name === 'security') {
    return (
      <svg {...commonProps}>
        <path d="m24 3 17 6v13c0 11-7 18-17 23C14 40 7 33 7 22V9Z" />
      </svg>
    )
  }

  if (name === 'scalable') {
    return (
      <svg {...commonProps}>
        <path d="m24 3 19 10-19 10L5 13Zm-19 20 19 10 19-10M5 33l19 10 19-10" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M7 26v-5c0-10 7-17 17-17s17 7 17 17v5" />
      <rect x="4" y="22" width="9" height="15" rx="4" />
      <rect x="35" y="22" width="9" height="15" rx="4" />
      <path d="M40 37c-2 5-8 7-14 7h-4" />
      <rect x="17" y="40" width="10" height="5" rx="2" />
    </svg>
  )
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 560 430"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Digital solutions illustration with laptop, mobile phone, and cloud"
    >
      <defs>
        <linearGradient id="ns-hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#eaf3ff" />
          <stop offset="100%" stopColor="#d6e8ff" />
        </linearGradient>
        <linearGradient id="ns-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#063c8f" />
          <stop offset="100%" stopColor="#031c4c" />
        </linearGradient>
        <linearGradient id="ns-laptop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8f2ff" />
          <stop offset="100%" stopColor="#a9c8ed" />
        </linearGradient>
        <filter id="ns-shadow">
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="12"
            floodColor="#174d9d"
            floodOpacity="0.15"
          />
        </filter>
      </defs>

      <ellipse cx="295" cy="210" rx="245" ry="190" fill="url(#ns-hero-bg)" opacity="0.8" />
      <circle cx="350" cy="180" r="145" fill="#c8e0ff" opacity="0.6" />

      <g>
        <path
          d="M365 85C365 62 385 45 409 45s41 17 41 40c20 3 35 20 35 40 0 23-19 39-42 39h-88c-23 0-40-17-40-39 0-21 18-38 40-40Z"
          fill="#1475f9"
        />
        <path
          d="M400 135V85m-20 20 20-20 20 20"
          fill="none"
          stroke="#fff"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g transform="translate(70 210)">
        <g>
          <path d="M38 80C10 50 5 15 25-15c25 25 35 60 13 95" fill="#20a65a" />
          <path d="M45 75C50 35 75 5 100 0c0 35-25 65-55 75" fill="#39b96b" />
          <path d="M40 75C20 30 20-10 40-40c25 45 25 80 0 115" fill="#16a34a" />
          <path d="M20 70C-10 35-10 5 5-15c30 30 30 60 15 85" fill="#52c878" />
        </g>
        <path d="M20 75h50l-7 55H27Z" fill="#fff" stroke="#d6e5fa" strokeWidth="3" />
        <ellipse cx="45" cy="75" rx="25" ry="7" fill="#e2edff" />
      </g>

      <g filter="url(#ns-shadow)" transform="translate(95 125)">
        <path d="m115 25 240-25q10 0 7 12l-32 233H60l40-205q3-12 15-15Z" fill="#071b43" />
        <path d="m118 35 229-22-29 211H80l30-177q1-9 8-12Z" fill="url(#ns-screen)" />
        <g stroke="#1b83ff" strokeWidth="5" strokeLinecap="round" opacity="0.8">
          <path d="M135 75h80M135 95h120M135 115h60M135 135h105M135 155h75M135 175h135M135 195h90" />
        </g>
        <rect x="220" y="85" width="90" height="90" rx="15" fill="#1475f9" />
        <path
          d="m255 110-20 20 20 20m20-40 20 20-20 20m-8-45-7 50"
          fill="none"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60 245h270l35 30q5 5-10 10H35q-15-5-5-15Z"
          fill="url(#ns-laptop)"
          stroke="#9abce7"
          strokeWidth="2"
        />
        <path d="M150 250h90l-10 10h-70Z" fill="#8daed9" />
        <path d="M30 275h325" stroke="#6b91c7" strokeWidth="3" />
      </g>

      <g transform="translate(395 190)" filter="url(#ns-shadow)">
        <g>
          <rect width="105" height="220" rx="20" fill="#071b43" />
          <rect x="7" y="8" width="91" height="204" rx="15" fill="#f5f9ff" />
          <rect x="35" y="15" width="35" height="5" rx="3" fill="#9db8dd" />
          <g fill="#1475f9">
            <rect x="18" y="45" width="30" height="35" rx="7" />
            <rect x="57" y="45" width="30" height="35" rx="7" />
            <rect x="18" y="90" width="30" height="35" rx="7" />
            <rect x="57" y="90" width="30" height="35" rx="7" />
            <rect x="18" y="135" width="30" height="35" rx="7" />
            <rect x="57" y="135" width="30" height="35" rx="7" />
          </g>
        </g>
      </g>

      <ellipse cx="285" cy="415" rx="220" ry="10" fill="#9fc5f8" opacity="0.25" />
    </svg>
  )
}

function Services() {
  const pageRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const page = pageRef.current
    if (!page) return undefined

    const groups = [
      ['.ns-section-heading', 'ns-reveal', 0],
      ['.ns-service-card', 'ns-reveal', 0.13],
      ['.ns-benefits', 'ns-reveal-zoom', 0],
      ['.ns-benefit', 'ns-reveal', 0.12],
      ['.ns-cta', 'ns-reveal-zoom', 0],
      ['.ns-cta-content', 'ns-reveal-left', 0],
      ['.ns-cta-button', 'ns-reveal-right', 0],
    ]

    groups.forEach(([selector, type, step]) => {
      const indices = new Map()
      page.querySelectorAll(selector).forEach((element) => {
        const index = indices.get(element.parentNode) || 0
        indices.set(element.parentNode, index + 1)
        element.classList.add(type)
        element.style.setProperty('--ns-d', `${index * step}s`)
      })
    })

    page.querySelectorAll('.ns-service-card').forEach((card, index) => {
      if (window.innerWidth > 700) {
        card.classList.remove('ns-reveal')
        card.classList.add(index % 2 === 0 ? 'ns-reveal-left' : 'ns-reveal-right')
      }
    })

    page.classList.add('ns-motion-ready')
    const targets = page.querySelectorAll(
      '.ns-reveal, .ns-reveal-left, .ns-reveal-right, .ns-reveal-zoom',
    )
    const timers = new Set()
    const show = (element) => {
      element.classList.add('ns-in-view')
      const timer = window.setTimeout(() => {
        element.classList.add('ns-done')
        element.style.removeProperty('--ns-d')
        timers.delete(timer)
      }, 1300 + Number.parseFloat(element.style.getPropertyValue('--ns-d') || '0') * 1000)
      timers.add(timer)
    }

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(show)
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              show(entry.target)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
      )

      targets.forEach((element) => observer.observe(element))

      return () => {
        observer.disconnect()
        timers.forEach(window.clearTimeout)
      }
    }

    return () => timers.forEach(window.clearTimeout)
  }, [prefersReducedMotion])

  return (
    <main className="nexora-services-page" ref={pageRef}>
      <section className="ns-hero">
        <div className="ns-container">
          <div className="ns-hero-grid">
            <div className="ns-hero-content">
              <div className="ns-eyebrow">Our Services</div>
              <h1>
                Digital Solutions
                <br />
                for <span>Business Growth</span>
              </h1>
              <p className="ns-hero-description">
                From web and mobile development to cloud and AI integration, we provide end-to-end
                digital solutions that help businesses innovate, scale, and succeed in the digital
                world.
              </p>
              <div className="ns-hero-buttons">
                <Link to="/contact" className="ns-button ns-button-primary">
                  Get a Free Consultation <span aria-hidden="true">→</span>
                </Link>
                <a href="#ns-our-services" className="ns-button ns-button-outline">
                  View All Services
                </a>
              </div>
            </div>

            <div className="ns-hero-visual">
              <HeroIllustration />
            </div>
          </div>
        </div>
      </section>

      <section className="ns-offer-section" id="ns-our-services">
        <div className="ns-container">
          <div className="ns-section-heading">
            <h2>
              What We <span>Offer</span>
            </h2>
            <div className="ns-heading-decoration" aria-hidden="true">
              <span />
              <i />
              <span />
            </div>
            <p>A complete range of digital services to build, optimize, and grow your business.</p>
          </div>

          <div className="ns-service-grid">
            {services.map((service) => (
              <article className="ns-service-card" key={service.title}>
                <div className="ns-service-icon">
                  <ServiceIcon name={service.icon} />
                </div>
                <div className="ns-service-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link to="/contact" className="ns-learn-more">
                    Learn More <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ns-benefits-section">
        <div className="ns-container">
          <div className="ns-benefits">
            {benefits.map((benefit) => (
              <div className="ns-benefit" key={benefit.title}>
                <div className="ns-benefit-icon">
                  <BenefitIcon name={benefit.icon} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ns-cta-section">
        <div className="ns-container">
          <div className="ns-cta">
            <div className="ns-cta-content">
              <h2>Have a Project in Mind?</h2>
              <p>Let&apos;s build a solution that fits your business goals.</p>
            </div>
            <Link to="/contact" className="ns-cta-button">
              Get in Touch <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Services
