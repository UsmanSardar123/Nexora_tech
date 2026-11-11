import CTA from '../components/home/CTA.jsx'
import Hero from '../components/home/Hero.jsx'
import OurWork from '../components/home/OurWork.jsx'
import Services from '../components/home/Services.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import WhyChooseUs from '../components/home/WhyChooseUs.jsx'
import '../styles/home.css'

function Home() {
  return (
    <main className="nx-home">
      <Hero />
      <Services />
      <WhyChooseUs />
      <OurWork />
      <Testimonials />
      <CTA />
    </main>
  )
}

export default Home
