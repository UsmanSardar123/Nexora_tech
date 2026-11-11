import AnimatedEyebrow from '../../animations/AnimatedEyebrow.jsx'
import AnimatedHeading from '../../animations/AnimatedHeading.jsx'
import Reveal from '../../animations/Reveal.jsx'
import RevealGroup from '../../animations/RevealGroup.jsx'
import { fadeUp } from '../../animations/variants.js'
import { homeHeadings, testimonials } from '../../data/homeData.js'

function Testimonials() {
  return (
    <section className="nx-testimonials nx-section">
      <Reveal className="nx-section-heading">
        <AnimatedEyebrow>TESTIMONIALS</AnimatedEyebrow>
        <AnimatedHeading text={homeHeadings.testimonials} tag="h2" />
        <p>Real feedback from businesses and individuals we have worked with.</p>
      </Reveal>

      <RevealGroup
        className="nx-testimonial-grid"
        delayChildren={0.08}
        stagger={0.13}
        childVariants={fadeUp}
        interactive
      >
        {testimonials.map((testimonial) => (
          <article className="nx-testimonial" key={testimonial.id}>
            <div className="nx-client">
              <div className="nx-avatar">
                {testimonial.name
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <div>
                <h3>{testimonial.name}</h3>
                <span>{testimonial.role}</span>
              </div>
            </div>
            <div
              aria-label={`${testimonial.stars.length} out of 5 stars`}
              className="nx-stars"
              role="img"
            >
              {testimonial.stars}
            </div>
            <p>{testimonial.quote}</p>
          </article>
        ))}
      </RevealGroup>
    </section>
  )
}

export default Testimonials
