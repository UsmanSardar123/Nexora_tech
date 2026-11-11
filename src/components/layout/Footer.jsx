import { Link } from 'react-router-dom'
import RevealGroup from '../../animations/RevealGroup.jsx'
import './Footer.css'

const CURRENT_YEAR = new Date().getFullYear()

const socialLinks = [
  { label: 'LinkedIn', mark: 'in', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', mark: 'GH', href: 'https://github.com/' },
  { label: 'Facebook', mark: 'f', href: 'https://www.facebook.com/' },
  { label: 'Instagram', mark: '◎', href: 'https://www.instagram.com/' },
]

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Our Projects', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Web Development', mark: '⌘' },
  { label: 'Mobile App Development', mark: '▣' },
  { label: 'Cloud Computing', mark: '☁' },
  { label: 'Custom Software Development', mark: '▱' },
]

function Footer() {
  return (
    <footer className="nexora-footer">
      <div className="nexora-footer-container">
        <RevealGroup className="nexora-footer-grid">
          <section className="nexora-footer-company" key="company">
            <Link className="nexora-footer-logo" to="/" aria-label="Nexora Technologies home">
              N <span>Nexora Technologies</span>
            </Link>
            <p>
              Building innovative digital solutions that help businesses grow, scale, and succeed
              in the modern world.
            </p>
            <div className="nexora-footer-social" aria-label="Social media">
              {socialLinks.map(({ label, mark, href }) => (
                <a
                  aria-label={label}
                  href={href}
                  key={label}
                  rel="noreferrer"
                  target="_blank"
                >
                  {mark}
                </a>
              ))}
            </div>
          </section>

          <section className="nexora-footer-links" key="links">
            <h2>Quick Links</h2>
            <ul>
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="nexora-footer-services" key="services">
            <h2>Our Services</h2>
            <ul>
              {serviceLinks.map(({ label, mark }) => (
                <li key={label}>
                  <Link to="/services">
                    <span aria-hidden="true" className="nexora-footer-service-icon">
                      {mark}
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="nexora-footer-contact-section" key="contact">
            <h2>Contact Us</h2>
            <ul className="nexora-footer-contact">
              <li>
                <span aria-hidden="true" className="nexora-footer-contact-icon">✉</span>
                <a href="mailto:info@nexoratechnologies.com">info@nexoratechnologies.com</a>
              </li>
              <li>
                <span aria-hidden="true" className="nexora-footer-contact-icon">☎</span>
                <a href="tel:+923001234567">+92 300 1234567</a>
              </li>
              <li>
                <span aria-hidden="true" className="nexora-footer-contact-icon">⌖</span>
                <span>Islamabad, Pakistan</span>
              </li>
            </ul>
          </section>
        </RevealGroup>

        <div className="nexora-footer-bottom">
          <p>© {CURRENT_YEAR} Nexora Technologies. All Rights Reserved.</p>
          <nav aria-label="Legal information" className="nexora-footer-legal">
            <a href="/privacy-policy/">Privacy Policy</a>
            <a href="/terms-and-conditions/">Terms &amp; Conditions</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
