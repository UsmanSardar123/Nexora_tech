import { Link } from 'react-router-dom'
import AnimatedEyebrow from '../../animations/AnimatedEyebrow.jsx'
import AnimatedHeading from '../../animations/AnimatedHeading.jsx'
import Reveal from '../../animations/Reveal.jsx'
import RevealGroup from '../../animations/RevealGroup.jsx'
import { scaleIn } from '../../animations/variants.js'
import HomeIcon from './HomeIcon.jsx'
import { homeHeadings, services } from '../../data/homeData.js'

function Services() {
  return (
    <section className="nx-services nx-section" id="nx-services">
      <Reveal className="nx-section-heading">
        <AnimatedEyebrow>WHAT WE DO</AnimatedEyebrow>
        <AnimatedHeading text={homeHeadings.services} tag="h2" />
        <p>Practical digital solutions designed to help your business grow.</p>
      </Reveal>

      <RevealGroup
        className="nx-service-grid"
        delayChildren={0.08}
        stagger={0.14}
        childVariants={scaleIn}
        interactive
      >
        {services.map((service) => (
          <article className="nx-service-card" key={service.id}>
            <div className="nx-service-icon"><HomeIcon name={service.icon} /></div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link to="/contact">
              Learn More <span>→</span>
            </Link>
          </article>
        ))}
      </RevealGroup>
    </section>
  )
}

export default Services
