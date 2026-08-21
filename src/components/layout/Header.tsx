import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const uiCopy = isTraditional
    ? {
        home: '首頁',
        explore: '探索',
        judges: '特邀評審',
        methodology: '評分方法',
        about: '關於我們',
        primaryNavigation: '主要導航',
        language: '語言',
        status: '狀態',
        allTime: '全時段 / 公開索引',
        close: '關閉導航',
        open: '開啟導航',
        mobileStatus: '公開索引 / 2026',
      }
    : {
        home: 'Home',
        explore: 'Explore',
        judges: 'Jury Spotlight',
        methodology: 'Behind the Score',
        about: 'About Us',
        primaryNavigation: 'Primary navigation',
        language: 'Language',
        status: 'Status',
        allTime: 'ALL-TIME / PUBLIC INDEX',
        close: 'Close navigation',
        open: 'Open navigation',
        mobileStatus: 'PUBLIC INDEX / 2026',
      }

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMobileMenuOpen])

  const navLinks = isTraditional
    ? [
        { name: uiCopy.home, path: '/' },
        { name: uiCopy.explore, path: '/explore' },
        { name: uiCopy.judges, path: '/judges' },
        { name: uiCopy.methodology, path: '/methodology' },
        { name: uiCopy.about, path: '/about' },
      ]
    : [
        { name: uiCopy.home, path: '/' },
        { name: uiCopy.explore, path: '/explore' },
        { name: uiCopy.judges, path: '/judges' },
        { name: uiCopy.methodology, path: '/methodology' },
        { name: uiCopy.about, path: '/about' },
      ]

  const changeLanguage = (language: 'en' | 'zh-TW') => {
    window.localStorage.setItem('app-language', language)
    void i18n.changeLanguage(language)
  }

  const isDarkSurface = pathname.startsWith('/series/') || pathname.startsWith('/judges/') || pathname === '/'

  return (
    <header className={`site-header ${isDarkSurface ? 'site-header--on-dark' : ''}`}>
      <Link to="/" className="site-logo" aria-label="Scene Score home">
        <img className="site-logo__mark site-logo__mark--dark" src="/images/logo/scenescore-logo-long-black.png" alt="" />
        <img className="site-logo__mark site-logo__mark--light" src="/images/logo/scenescore-logo-long-white.png" alt="" />
        <i aria-hidden="true" />
      </Link>

      <nav
        className={`desktop-nav${hoveredPath ? ' has-hovered-item' : ''}`}
        aria-label={uiCopy.primaryNavigation}
        onMouseLeave={() => setHoveredPath(null)}
      >
        {navLinks.map((link, index) => (
          <span className="nav-item" key={link.path}>
            {index > 0 && <em aria-hidden="true">/</em>}
            <NavLink
              to={link.path}
              end={link.path === '/'}
              onMouseEnter={() => setHoveredPath(link.path)}
              onFocus={() => setHoveredPath(link.path)}
              onBlur={() => setHoveredPath(null)}
              className={({ isActive }) => [
                isActive ? 'is-active' : '',
                hoveredPath === link.path ? 'is-hovered' : '',
              ].filter(Boolean).join(' ') || undefined}
            >
              {link.name}
            </NavLink>
          </span>
        ))}
      </nav>

      <div className="header-language-switch" aria-label={uiCopy.language}>
        <button type="button" className={!isTraditional ? 'is-active' : ''} aria-pressed={!isTraditional} onClick={() => changeLanguage('en')}>EN</button>
        <span aria-hidden="true">/</span>
        <button type="button" className={isTraditional ? 'is-active' : ''} aria-pressed={isTraditional} onClick={() => changeLanguage('zh-TW')}>繁中</button>
      </div>

      <div className="header-meta" aria-label={uiCopy.status}>
        <span className="status-dot" />
        <span>{uiCopy.allTime}</span>
      </div>

      <button
        className="menu-trigger"
        type="button"
        aria-label={isMobileMenuOpen ? uiCopy.close : uiCopy.open}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((open) => !open)}
      >
        {isMobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-nav"
          >
            <div className="mobile-nav__inner">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  end={link.path === '/'}
                  className={({ isActive }) => isActive ? 'is-active' : undefined}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="mobile-nav__language" aria-label={uiCopy.language}>
                <button type="button" className={!isTraditional ? 'is-active' : ''} aria-pressed={!isTraditional} onClick={() => changeLanguage('en')}>EN</button>
                <span aria-hidden="true">/</span>
                <button type="button" className={isTraditional ? 'is-active' : ''} aria-pressed={isTraditional} onClick={() => changeLanguage('zh-TW')}>繁中</button>
              </div>
              <div className="mobile-nav__status"><span className="status-dot" /> {uiCopy.mobileStatus}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
