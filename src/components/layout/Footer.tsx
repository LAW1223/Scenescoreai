import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { i18n } = useTranslation()
  const isTraditional = i18n.resolvedLanguage === 'zh-TW'
  const copy = isTraditional
    ? {
        explore: '排行榜',
        jury: '評審',
        methodology: '評分方法',
        submission: '投稿',
      }
    : {
        explore: 'Ranking',
        jury: 'Jury',
        methodology: 'Methodology',
        submission: 'Submission',
      }

  return (
    <footer className="site-footer" lang={isTraditional ? 'zh-Hant' : 'en'}>
      <div className="footer-bottom">
        <Link to="/" className="footer-mark">SCENE SCORE<span>®</span></Link>
        <div className="footer-links">
          <Link to="/explore">{copy.explore}</Link>
          <Link to="/judges">{copy.jury}</Link>
          <Link to="/methodology">{copy.methodology}</Link>
          <Link to="/submission">{copy.submission}</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
