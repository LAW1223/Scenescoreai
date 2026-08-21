import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const copy = isTraditional
    ? {
        contact: '/ 聯絡合作',
        project: '下一個項目',
        start: '由此開始',
        explore: '探索',
        jury: '評審',
        methodology: '評分方法',
        about: '關於我們',
        local: '© 2026 / 公開索引',
      }
    : {
        contact: '/ CONTACT',
        project: 'THE NEXT PROJECT',
        start: 'STARTS HERE',
        explore: 'Explore',
        jury: 'Jury',
        methodology: 'Methodology',
        about: 'About',
        local: '© 2026 / PUBLIC INDEX',
      }

  return (
    <footer className="site-footer" lang={isTraditional ? 'zh-Hant' : 'en'}>
      <div className="footer-cta">
        <span className="section-kicker">{copy.contact}</span>
        <Link to="/about#contact" className="footer-cta__link">
          <span>{copy.project}<br />{copy.start}</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
      <div className="footer-bottom">
        <Link to="/" className="footer-mark">SCENE SCORE<span>®</span></Link>
        <div className="footer-links">
          <Link to="/explore">{copy.explore}</Link>
          <Link to="/judges">{copy.jury}</Link>
          <Link to="/methodology">{copy.methodology}</Link>
          <Link to="/about">{copy.about}</Link>
        </div>
        <span>{copy.local}</span>
      </div>
    </footer>
  )
}

export default Footer
