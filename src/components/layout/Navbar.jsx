import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useReducedMotion from '../../animations/useReducedMotion.js'
import { navbarFadeDown } from '../../animations/variants.js'

function Navbar() {
  const location = useLocation()
  const prefersReducedMotion = useReducedMotion()
  const [menuOpenPath, setMenuOpenPath] = useState(null)
  const isMenuOpen = menuOpenPath === location.pathname

  useEffect(() => {
    if (!isMenuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') setMenuOpenPath(null)
    }

    function handlePopState() {
      setMenuOpenPath(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isMenuOpen])

  function closeMenu() {
    setMenuOpenPath(null)
  }

  return (
    <motion.header
      className="site-header"
      variants={navbarFadeDown}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="visible"
    >
      <div className="site-header-inner">
        <Link
          className="site-brand"
          to="/"
          aria-label="Nexora Technologies home"
          onClick={closeMenu}
        >
          <span className="site-brand-mark" aria-hidden="true">
            N
          </span>
          <span className="site-brand-name">
            Nexora Technologies
          </span>
        </Link>

        <button
          aria-controls="site-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`site-menu-toggle${isMenuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpenPath(isMenuOpen ? null : location.pathname)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          className={`site-nav${isMenuOpen ? ' is-open' : ''}`}
          id="site-navigation"
          aria-label="Main navigation"
        >
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/services" onClick={closeMenu}>
            Services
          </NavLink>
          <NavLink to="/blog" onClick={closeMenu}>
            Blog
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
          <Link className="site-nav-cta" to="/contact" onClick={closeMenu}>
            Get in Touch <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <Link className="site-header-cta" to="/contact">
          Get in Touch <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.header>
  )
}

export default Navbar
