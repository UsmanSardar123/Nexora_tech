import AnimatedEyebrow from '../../animations/AnimatedEyebrow.jsx'
import AnimatedHeading from '../../animations/AnimatedHeading.jsx'
import Reveal from '../../animations/Reveal.jsx'
import RevealGroup from '../../animations/RevealGroup.jsx'
import { fadeUp } from '../../animations/variants.js'
import HomeIcon from './HomeIcon.jsx'
import { benefits, homeHeadings } from '../../data/homeData.js'

function WhyChooseUs() {
  return (
    <section className="nx-why">
      <div className="nx-why-inner">
        <Reveal className="nx-why-intro" direction="left">
          <AnimatedEyebrow>OUR DIFFERENCE</AnimatedEyebrow>
          <AnimatedHeading text={homeHeadings.whyChooseUs} tag="h2" />
          <p>
            We combine technology, creativity, and collaboration to deliver
            solutions that make a real difference.
          </p>
        </Reveal>

        <RevealGroup
          className="nx-benefits"
          delayChildren={0.06}
          stagger={0.11}
          childVariants={fadeUp}
          interactive
        >
          {benefits.map((benefit) => (
            <article className="nx-benefit" key={benefit.id}>
              <div className="nx-benefit-icon"><HomeIcon name={benefit.icon} /></div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

export default WhyChooseUs
