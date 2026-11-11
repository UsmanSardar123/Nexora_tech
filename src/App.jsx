import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import PageTransition from './animations/PageTransition.jsx'
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Blog from './pages/Blog.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import { saveTheme } from './theme.js'

function App() {
  const location = useLocation()
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0b1220' : '#ffffff')
  }, [theme])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    saveTheme(nextTheme)
    setTheme(nextTheme)
  }

  return (
    <div className="site-shell">
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <div className="site-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/services"
              element={
                <PageTransition>
                  <Services />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/blog/:slug"
              element={
                <PageTransition>
                  <Blog />
                </PageTransition>
              }
            />
            <Route
              path="/blog"
              element={
                <PageTransition>
                  <Blog />
                </PageTransition>
              }
            />
            <Route path="/portfolio" element={<Navigate to="/about" replace />} />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  )
}

export default App
