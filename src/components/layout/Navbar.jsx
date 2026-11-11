import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import useReducedMotion from '../../animations/useReducedMotion.js'
import { navbarFadeDown } from '../../animations/variants.js'

function Navbar({ theme, onThemeToggle }) {
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
          <button
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="site-theme-toggle"
            onClick={() => {
              onThemeToggle()
              closeMenu()
            }}
            type="button"
          >
            {theme === 'dark' ? (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
              </svg>
            )}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
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
