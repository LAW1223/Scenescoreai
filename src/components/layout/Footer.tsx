import { Link } from 'react-router-dom'
import { Globe, MessageCircle, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Scenescoreai
            </span>
            <p className="mt-4 text-slate-400 max-w-sm">
              {t('footer.desc')}
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">Social</span>
                <MessageCircle className="h-6 w-6" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <span className="sr-only">Website</span>
                <Globe className="h-6 w-6" />
              </a>
              <a href="mailto:Marketing@scenescore.ai" className="text-slate-400 hover:text-white">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">{t('footer.links')}</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/ranking/anime" className="text-base text-slate-400 hover:text-white">{t('nav.anime')}</Link>
              </li>
              <li>
                <Link to="/ranking/short" className="text-base text-slate-400 hover:text-white">{t('nav.short')}</Link>
              </li>
              <li>
                <Link to="/rules" className="text-base text-slate-400 hover:text-white">{t('nav.rules')}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">{t('footer.more')}</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-slate-400 hover:text-white">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-slate-400 hover:text-white">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Scenescoreai. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <span>{t('footer.power')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
