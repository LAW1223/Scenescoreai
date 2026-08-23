import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const copy = isTraditional
    ? {
        explore: '流行榜',
        jury: '評審',
        methodology: '評分方法',
        submission: '投稿',
        terms: '使用條款',
      }
    : {
        explore: 'Ranking',
        jury: 'Jury',
        methodology: 'Methodology',
        submission: 'Submission',
        terms: 'Terms of Use',
      }

  return (
    <footer className="site-footer" lang={isTraditional ? 'zh-Hant' : 'en'}>
      <div className="footer-bottom">
        <Link to="/" className="footer-mark">SCENE SCORE</Link>
        <div className="footer-links">
          <Link to="/explore">{copy.explore}</Link>
          <Link to="/judges">{copy.jury}</Link>
          <Link to="/methodology">{copy.methodology}</Link>
          <Link to="/submission">{copy.submission}</Link>
          <Link to="/terms">{copy.terms}</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
