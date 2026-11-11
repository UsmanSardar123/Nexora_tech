import { useEffect, useRef, useState } from 'react'
import Reveal from '../animations/Reveal.jsx'
import RevealGroup from '../animations/RevealGroup.jsx'
import '../styles/contact.css'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  message: '',
}

const requiredFields = [
  ['firstName', 'First name'],
  ['lastName', 'Last name'],
  ['email', 'Email'],
  ['message', 'Message'],
]

function ContactIcon({ name }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    'aria-hidden': true,
  }

  if (name === 'email') {
    return (
      <svg {...commonProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  }

  if (name === 'phone') {
    return (
      <svg {...commonProps}>
        <path d="M22 16.92v2.98a2 2 0 0 1-2.18 1.99A19.8 19.8 0 0 1 11.2 18.8a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.2 2 2 0 0 1 4.1 2h2.98a2 2 0 0 1 1.97 1.7l.48 3.4a2 2 0 0 1-.57 1.73L7.7 10.1a16 16 0 0 0 6.2 6.2l1.27-1.27a2 2 0 0 1 1.73-.57l3.4.48a2 2 0 0 1 1.7 1.98Z" />
      </svg>
    )
  }

  if (name === 'location') {
    return (
      <svg {...commonProps}>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  }

  return null
}

function SocialIcon({ name }) {
  if (name === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
      </svg>
    )
  }

  if (name === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.2L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.84L0 1.15h7.6l5.25 6.94 6.05-6.94ZM17.6 20.65h2.04L6.1 3.3H3.9l13.7 17.35Z" />
    </svg>
  )
}

function EnvelopeIllustration() {
  return (
    <div className="nc-envelope" aria-hidden="true">
      <svg viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ncEnvelopeBlue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0875ff" />
            <stop offset="100%" stopColor="#0046c9" />
          </linearGradient>
          <linearGradient id="ncPaperBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#e8f2ff" />
          </linearGradient>
          <linearGradient id="ncLeafGreen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#56c96b" />
            <stop offset="100%" stopColor="#087e46" />
          </linearGradient>
          <filter id="ncShadow">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#3976c9" floodOpacity=".2" />
          </filter>
        </defs>
        <circle cx="250" cy="170" r="150" fill="#d8eaff" opacity=".55" />
        <circle cx="390" cy="100" r="80" fill="#c9e1ff" opacity=".45" />
        <ellipse cx="250" cy="315" rx="205" ry="20" fill="#b8d8ff" opacity=".45" />
        <g transform="translate(70 170)">
          <path d="M45 110V35" stroke="#247a45" strokeWidth="7" strokeLinecap="round" />
          <path d="M45 65C-5 60-15 10 15 5c30 15 30 60 30 60" fill="url(#ncLeafGreen)" />
          <path d="M45 80c40-45 60-40 50-75-35 0-50 45-50 75" fill="url(#ncLeafGreen)" />
          <path d="M45 45C25-10 50-35 70-15c5 30-25 60-25 60" fill="#36ae5c" />
          <path d="M45 95C-5 80-25 45 0 35c35 10 45 60 45 60" fill="#4bc36b" />
          <path d="M10 110h70l-10 40H20z" fill="#e4f0ff" />
          <path d="M10 110h70" stroke="#a6c7f1" strokeWidth="5" />
        </g>
        <g transform="translate(360 175)">
          <path d="M45 110V30" stroke="#247a45" strokeWidth="7" strokeLinecap="round" />
          <path d="M45 65C5 35-5 0 20 0c30 20 25 65 25 65" fill="#41bd64" />
          <path d="M45 85c50-25 60-65 35-75-30 20-35 75-35 75" fill="url(#ncLeafGreen)" />
          <path d="M45 50C30-5 55-30 75-10c5 25-30 60-30 60" fill="#63d67a" />
          <path d="M45 100C-5 85-20 45 5 40c30 10 40 60 40 60" fill="#38ae5b" />
          <path d="M10 110h70l-10 40H20z" fill="#e4f0ff" />
          <path d="M10 110h70" stroke="#a6c7f1" strokeWidth="5" />
        </g>
        <g>
          <path d="M55 55 180 5l-45 95-20-35Z" fill="#0875ff" />
          <path d="m115 65 65-60-80 70" fill="#004ac7" />
          <path d="m115 65-5 40 25-5" fill="#0a55dc" />
          <path d="M105 95c-75 55-65 110 0 110" stroke="#0875ff" strokeWidth="4" strokeDasharray="9 8" fill="none" strokeLinecap="round" />
        </g>
        <g filter="url(#ncShadow)">
          <rect x="175" y="75" width="200" height="180" rx="18" fill="url(#ncPaperBlue)" stroke="#c8dcff" strokeWidth="2" transform="rotate(-4 275 165)" />
          <text x="275" y="175" textAnchor="middle" fontSize="90" fontFamily="Arial, sans-serif" fontWeight="800" fill="#0755cf">@</text>
          <path d="M205 190h135" stroke="#b9d5ff" strokeWidth="9" strokeLinecap="round" />
          <path d="M220 215h100" stroke="#d1e3ff" strokeWidth="8" strokeLinecap="round" />
        </g>
        <g filter="url(#ncShadow)">
          <rect x="130" y="160" width="280" height="150" rx="22" fill="url(#ncEnvelopeBlue)" />
          <path d="m130 175 140 95 140-95" fill="#0865ed" stroke="#3b91ff" strokeWidth="3" strokeLinejoin="round" />
          <path d="m130 295 105-80m175 80-105-80" stroke="#4b9cff" strokeWidth="3" opacity=".7" />
          <path d="m130 190 140 85 140-85v100q0 20-20 20H150q-20 0-20-20Z" fill="url(#ncEnvelopeBlue)" />
          <path d="m130 190 140 85 140-85" fill="#0758e6" stroke="#2585ff" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}

function ContactHero() {
  return (
    <section className="nc-hero">
      <div className="nc-container">
        <div className="nc-hero-grid">
          <Reveal className="nc-hero-text" direction="left">
            <div className="nc-badge">Contact Us</div>
            <h1>
              Let&apos;s <span>Talk</span>
            </h1>
            <p>
              Have a project in mind or a question about our services? Reach
              out and our team will respond within 24 hours.
            </p>
          </Reveal>
          <Reveal className="nc-hero-art" direction="right">
            <div className="nc-art-circle" />
            <EnvelopeIllustration />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactInformation() {
  const details = [
    { type: 'email', title: 'Email', content: 'info@nexoratechnologies.com', href: 'mailto:info@nexoratechnologies.com' },
    { type: 'phone', title: 'Phone', content: '+92 300 1234567', href: 'tel:+923001234567' },
    { type: 'location', title: 'Location', content: 'Taxila, Pakistan' },
  ]
  const socials = [
    { name: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/' },
    { name: 'GitHub', icon: 'github', href: 'https://github.com/' },
    { name: 'X', icon: 'x', href: 'https://x.com/' },
  ]

  return (
    <Reveal as="section" className="nc-contact-info" direction="left">
      <h2>Get In Touch</h2>
      <p className="nc-info-intro">
        We&apos;d love to hear from you. Reach out through any of these
        channels.
      </p>
      <div className="nc-info-list">
        {details.map((detail) => (
          <div className="nc-info-item" key={detail.type}>
            <div className="nc-info-icon">
              <ContactIcon name={detail.type} />
            </div>
            <div>
              <h3>{detail.title}</h3>
              <p>
                {detail.href ? (
                  <a href={detail.href}>{detail.content}</a>
                ) : (
                  detail.content
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="nc-info-divider" />
      <p className="nc-hours">Mon to Fri, 9am to 6pm PKT</p>
      <nav className="nc-socials" aria-label="Social media">
        {socials.map((social) => (
          <a
            href={social.href}
            key={social.name}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
          >
            <SocialIcon name={social.icon} />
          </a>
        ))}
      </nav>
    </Reveal>
  )
}

function validate(values) {
  const errors = {}
  requiredFields.forEach(([field, label]) => {
    if (!values[field].trim()) errors[field] = `${label} is required.`
  })

  if (
    values.email.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
  ) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}

function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState('')
  const [mailtoHref, setMailtoHref] = useState('')
  const submitLock = useRef(false)
  const launchTimer = useRef(null)
  const unlockTimer = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const fieldRefs = {
    firstName: firstNameRef,
    lastName: lastNameRef,
    email: emailRef,
    message: messageRef,
  }

  useEffect(
    () => () => {
      window.clearTimeout(launchTimer.current)
      window.clearTimeout(unlockTimer.current)
    },
    [],
  )

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
    setStatus('')
    setMailtoHref('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (submitLock.current) return

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalidField = requiredFields.find(([field]) => nextErrors[field])?.[0]
      fieldRefs[firstInvalidField]?.current?.focus()
      setStatus('Please correct the highlighted fields and try again.')
      return
    }

    const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`
    const subject = `Contact enquiry from ${fullName}`
    const body = [
      `Name: ${fullName}`,
      `Email: ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n')
    const href = `mailto:info@nexoratechnologies.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    submitLock.current = true
    setIsSubmitting(true)
    setMailtoHref(href)
    setStatus(
      'Opening your email app. Review and send the message there; it has not been sent yet.',
    )
    launchTimer.current = window.setTimeout(() => {
      window.location.href = href
    }, 120)
    unlockTimer.current = window.setTimeout(() => {
      submitLock.current = false
      setIsSubmitting(false)
    }, 1200)
  }

  return (
    <Reveal as="section" className="nc-form-panel" direction="right">
      <h2>Send Us A Message</h2>
      <p className="nc-form-description">
        Fill out the form below, and our team will get back to you as soon as
        possible.
      </p>
      <form className="nc-form" noValidate onSubmit={handleSubmit}>
        <div className="nc-field">
          <span className="nc-field-label">
            Name <span className="nc-required" aria-hidden="true">*</span>
          </span>
          <div className="nc-name-grid">
            <div>
              <label className="nc-visually-hidden" htmlFor="nc-first-name">
                First name
              </label>
              <input
                autoComplete="given-name"
                id="nc-first-name"
                name="firstName"
                onChange={handleChange}
                placeholder="First name"
                ref={firstNameRef}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={errors.firstName ? 'nc-first-name-error' : 'nc-first-name-caption'}
                value={values.firstName}
              />
              <div className="nc-name-caption" id="nc-first-name-caption">
                First
              </div>
              {errors.firstName && (
                <p className="nc-error" id="nc-first-name-error">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="nc-visually-hidden" htmlFor="nc-last-name">
                Last name
              </label>
              <input
                autoComplete="family-name"
                id="nc-last-name"
                name="lastName"
                onChange={handleChange}
                placeholder="Last name"
                ref={lastNameRef}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={errors.lastName ? 'nc-last-name-error' : 'nc-last-name-caption'}
                value={values.lastName}
              />
              <div className="nc-name-caption" id="nc-last-name-caption">
                Last
              </div>
              {errors.lastName && (
                <p className="nc-error" id="nc-last-name-error">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        <div className="nc-field">
          <label htmlFor="nc-email">
            Email <span className="nc-required" aria-hidden="true">*</span>
          </label>
          <input
            autoComplete="email"
            id="nc-email"
            name="email"
            onChange={handleChange}
            placeholder="Enter your email address"
            ref={emailRef}
            type="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'nc-email-error' : undefined}
            value={values.email}
          />
          {errors.email && <p className="nc-error" id="nc-email-error">{errors.email}</p>}
        </div>

        <div className="nc-field">
          <label htmlFor="nc-message">
            Comment or Message <span className="nc-required" aria-hidden="true">*</span>
          </label>
          <textarea
            id="nc-message"
            name="message"
            onChange={handleChange}
            placeholder="Write your message here..."
            ref={messageRef}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'nc-message-error' : undefined}
            value={values.message}
          />
          {errors.message && <p className="nc-error" id="nc-message-error">{errors.message}</p>}
        </div>

        <button className="nc-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Preparing email…' : 'Submit Message'}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <div className="nc-form-feedback" aria-live="polite">
          {status && <p role={Object.keys(errors).length ? 'alert' : 'status'}>{status}</p>}
          {mailtoHref && (
            <a href={mailtoHref}>If your email app didn&apos;t open, click here.</a>
          )}
        </div>
      </form>
    </Reveal>
  )
}

function ContactBenefits() {
  const benefits = [
    {
      title: 'Quick Response',
      description: 'We typically reply within 24 hours.',
      icon: <path d="M35 4 12 34h17l-4 26 27-34H34Z" />,
    },
    {
      title: 'Secure & Private',
      description: 'Your information is always safe with us.',
      icon: <path d="m32 4 21 8v17c0 14-9 24-21 31-12-7-21-17-21-31V12Z" />,
    },
    {
      title: 'Dedicated Support',
      description: 'Our team is here to help you.',
      icon: (
        <>
          <path d="m22 30-9-9c-3-3-3-7 0-10s7-3 10 0l9 9m10 10 9-9c3-3 3-7 0-10s-7-3-10 0l-9 9" />
          <path d="m20 29 17 17c3 3 7 3 10 0s3-7 0-10L30 19m-6 5 17 17c3 3 7 3 10 0s3-7 0-10L34 14m-20 16 16 16c3 3 7 3 10 0m-19-23 16 16c3 3 7 3 10 0" />
        </>
      ),
    },
  ]

  return (
    <section className="nc-benefits-section">
      <div className="nc-container">
        <RevealGroup className="nc-benefits">
          {benefits.map((benefit) => (
            <article className="nc-benefit" key={benefit.title}>
              <div className="nc-benefit-icon">
                <svg viewBox="0 0 64 64" aria-hidden="true">
                  {benefit.icon}
                </svg>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <main className="nexora-contact-page" id="nexora-contact-page">
      <ContactHero />
      <section className="nc-contact-section">
        <div className="nc-container">
          <div className="nc-contact-card">
            <ContactInformation />
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactBenefits />
    </main>
  )
}

export default Contact
