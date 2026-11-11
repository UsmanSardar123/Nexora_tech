import { Link } from 'react-router-dom'
import AnimatedEyebrow from '../animations/AnimatedEyebrow.jsx'
import AnimatedHeading from '../animations/AnimatedHeading.jsx'
import CountUp from '../animations/CountUp.jsx'
import Reveal from '../animations/Reveal.jsx'
import RevealGroup from '../animations/RevealGroup.jsx'
import heroImage from '../assets/image.png'
import approachImage from '../assets/about-approach-workspace.svg'
import '../styles/about.css'

const values = [
  {
    title: 'Innovation',
    description: 'We bring creative ideas and modern technologies to solve real-world challenges.',
    icon: 'idea',
  },
  {
    title: 'Quality',
    description: 'We are committed to delivering high-quality, reliable, and scalable solutions.',
    icon: 'quality',
  },
  {
    title: 'Customer Satisfaction',
    description: "Our clients' success is our priority, and we build long-term relationships on trust.",
    icon: 'people',
  },
  {
    title: 'Integrity',
    description: "We believe in transparency, honesty, and doing what's right in every project.",
    icon: 'shield',
  },
]

const steps = [
  { title: 'Understand', description: 'Understand your goals and requirements.', icon: 'chat' },
  { title: 'Plan', description: 'Design the right solution.', icon: 'plan' },
  { title: 'Build', description: 'Develop with quality and care.', icon: 'code' },
  { title: 'Deliver', description: 'Launch and provide ongoing support.', icon: 'check' },
]

function Icon({ name }) {
  const paths = {
    target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/><path d="m16 8 5-5m-4 0h4v4"/></>,
    eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
    idea: <><path d="M9 18h6m-5 4h4M8 14.5a7 7 0 1 1 8 0c-1.2.9-1.5 2-1.5 3.5h-5C9.5 16.5 9.2 15.4 8 14.5ZM12 3v2M5 6l1.5 1.5M19 6l-1.5 1.5"/></>,
    quality: <><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5"/></>,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    chat: <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>,
    plan: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"/></>,
    code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    check: <><path d="m5 12 4 4L19 6"/><circle cx="12" cy="12" r="10"/></>,
    clients: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></>,
    projects: <><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 4 9 5 9-5"/></>,
    experience: <><path d="M8 21h8m-4-4v4M7 4h10l3 5-8 5-8-5 3-5Z"/><path d="m4 9 2 8h12l2-8"/></>,
    support: <><path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M21 14a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2v2ZM3 14a2 2 0 0 0 2 2h2v-6H5a2 2 0 0 0-2 2v2Zm14 2v2a4 4 0 0 1-4 4h-2"/></>,
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function Stat({ icon, value, suffix = '', secondaryValue, label }) {
  return (
    <div className="nx-stat">
      <div className="nx-stat-icon"><Icon name={icon} /></div>
      <div>
        <div className="nx-stat-number">
          {typeof value === 'number' ? (
            <CountUp value={value} secondaryValue={secondaryValue} suffix={suffix} />
          ) : value}
        </div>
        <div className="nx-stat-label">{label}</div>
      </div>
    </div>
  )
}
function About() {
  return (
    <main className="nx-about">
      <section className="nx-hero">
        <div className="nx-container nx-hero-grid">
          <Reveal className="nx-hero-content" direction="left">
            <AnimatedEyebrow>About Our Company</AnimatedEyebrow>
            <AnimatedHeading text="About Nexora {Technologies}" tag="h1" underline />
            <Reveal as="p" className="nx-hero-description">
              Nexora Technologies is an IT services company dedicated to
              helping businesses succeed in the digital world. We combine
              creativity, technical expertise, and innovation to develop
              reliable and user-friendly digital solutions.
            </Reveal>
            <Reveal as="div" className="nx-hero-buttons">
              <Link to="/contact" className="nx-btn nx-btn-primary">
                Get in Touch <span className="nx-arrow" aria-hidden="true">→</span>
              </Link>
              <Link to="/services" className="nx-btn nx-btn-outline">
                Our Services <span className="nx-arrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </Reveal>

          <Reveal className="nx-hero-visual" direction="right">
            <div className="nx-hero-image-frame">
              <img className="nx-hero-image" src={heroImage} alt="Laptop and plant in a bright modern workspace" />
              <div className="nx-floating-badge nx-badge-top">
                <strong>Innovation</strong><span>Driven by technology</span>
              </div>
              <div className="nx-floating-badge nx-badge-bottom">
                <strong>Digital Growth</strong><span>Built for the future</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="nx-mission-section">
        <RevealGroup className="nx-container nx-mission-grid">
          <article className="nx-info-card" key="mission">
            <div className="nx-icon-box"><Icon name="target" /></div>
            <div><h3>Our Mission</h3><p>Empower businesses with innovative, reliable, and scalable digital solutions that drive real growth.</p></div>
          </article>
          <article className="nx-info-card" key="vision">
            <div className="nx-icon-box"><Icon name="eye" /></div>
            <div><h3>Our Vision</h3><p>To be a trusted global technology partner, known for innovation, quality, and long-term client success.</p></div>
          </article>
        </RevealGroup>
      </section>

      <section className="nx-values-section">
        <div className="nx-container">
          <Reveal className="nx-section-heading">
            <span className="nx-section-tag">What Defines Us</span>
            <AnimatedHeading text="Our {Core Values}" tag="h2" />
            <p>The principles that guide our work, our team, and the solutions we deliver.</p>
          </Reveal>
          <RevealGroup className="nx-values-grid">
            {values.map((value) => (
              <article className="nx-value-card" key={value.title}>
                <div className="nx-value-icon"><Icon name={value.icon} /></div>
                <h3>{value.title}</h3><p>{value.description}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="nx-approach-section">
        <div className="nx-container nx-approach-grid">
          <Reveal className="nx-approach-visual" direction="left">
            <img
              src={approachImage}
              alt="Project delivery dashboard showing planning milestones on a laptop in a bright workspace"
              width="1000"
              height="760"
              loading="eager"
            />
          </Reveal>
          <div className="nx-approach-content">
            <Reveal className="nx-section-heading">
              <span className="nx-section-tag">How We Work</span>
              <AnimatedHeading text="Our {Approach}" tag="h2" />
              <p>We follow a client-centric and transparent approach, focusing on understanding your goals, crafting the right solution, and delivering with quality, on time, and with ongoing support.</p>
            </Reveal>
            <RevealGroup className="nx-steps">
              {steps.map((step, index) => (
                <div className="nx-step" key={step.title}>
                  <div className="nx-step-icon"><Icon name={step.icon} /></div>
                  <h3>{step.title}</h3><p>{step.description}</p>
                  {index < steps.length - 1 && <span className="nx-step-arrow" aria-hidden="true">→</span>}
                </div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <section className="nx-stats-section">
        <div className="nx-container">
          <Reveal as="div" className="nx-stats-bar">
            <Stat icon="clients" value={50} suffix="+" label="Happy Clients" />
            <Stat icon="projects" value={100} suffix="+" label="Projects Delivered" />
            <Stat icon="experience" value={4} suffix="+" label="Years of Experience" />
            <Stat icon="support" value={24} secondaryValue={7} label="Support Availability" />
          </Reveal>
        </div>
      </section>

      <section className="nx-cta-section">
        <div className="nx-container">
          <Reveal className="nx-cta">
            <div className="nx-cta-content">
              <h2>Let's Build Something<br />Amazing Together</h2>
              <p>Have an idea or a project in mind? Get in touch with us today!</p>
            </div>
            <Link to="/contact" className="nx-cta-button">Contact Us <span className="nx-arrow" aria-hidden="true">→</span></Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

export default About
