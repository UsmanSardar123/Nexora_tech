import Pressable from '../../animations/Pressable.jsx'
import AnimatedEyebrow from '../../animations/AnimatedEyebrow.jsx'
import AnimatedHeading from '../../animations/AnimatedHeading.jsx'
import Reveal from '../../animations/Reveal.jsx'
import { homeHeadings } from '../../data/homeData.js'

function CTA() {
  return (
    <section className="nx-cta" id="nx-contact">
      <Reveal className="nx-cta-content" direction="left">
        <AnimatedEyebrow>LET'S WORK TOGETHER</AnimatedEyebrow>
        <AnimatedHeading
          text={homeHeadings.cta}
          tag="h2"
          lightGradient
        />
        <p>Have an idea or a project in mind? Let's bring it to life.</p>
      </Reveal>
      <Reveal direction="right" delay={0.16}>
        <Pressable>
          <a className="nx-cta-button" href="mailto:info@nexoratechnologies.com">
            Contact Us <span aria-hidden="true">→</span>
          </a>
        </Pressable>
      </Reveal>
    </section>
  )
}

export default CTA
