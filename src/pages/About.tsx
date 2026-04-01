import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Target, Eye } from 'lucide-react'

export const About = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setSeoData(
      `${t('about.title')} - Scenescoreai`,
      t('about.subtitle')
    )
  }, [i18n.language, t])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('about.title')}</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          {t('about.subtitle')}
        </p>
      </div>

      <div className="space-y-12 text-slate-300 leading-relaxed text-lg">

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 p-8 rounded-2xl border border-blue-800/40">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-7 h-7 text-blue-400 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-white">{t('about.missionTitle')}</h2>
            </div>
            <p className="text-slate-300 text-base leading-relaxed">{t('about.missionText')}</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900 p-8 rounded-2xl border border-indigo-800/40">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-7 h-7 text-indigo-400 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-white">{t('about.visionTitle')}</h2>
            </div>
            <p className="text-slate-300 text-base leading-relaxed">{t('about.visionText')}</p>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-2xl font-semibold text-white mb-4">{t('about.companyTitle')}</h2>
          <p>{t('about.companyP1')}</p>
          <p>{t('about.companyP2')}</p>
          <p>{t('about.companyP3')}</p>
          <p>{t('about.companyP4')}</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-2xl font-semibold text-white mb-4">{t('about.coreBusinessTitle')}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-blue-400">{t('about.core1Title')}</strong> {t('about.core1Desc')}</li>
            <li><strong className="text-blue-400">{t('about.core2Title')}</strong> {t('about.core2Desc')}</li>
            <li><strong className="text-blue-400">{t('about.core3Title')}</strong> {t('about.core3Desc')}</li>
          </ul>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="text-2xl font-semibold text-white mb-4">{t('about.featuresTitle')}</h2>
          <ul className="space-y-4">
            <li><strong className="block text-indigo-400 mb-1">{t('about.feature1Title')}</strong> {t('about.feature1Desc')}</li>
            <li><strong className="block text-indigo-400 mb-1">{t('about.feature2Title')}</strong> {t('about.feature2Desc')}</li>
            <li><strong className="block text-indigo-400 mb-1">{t('about.feature3Title')}</strong> {t('about.feature3Desc')}</li>
          </ul>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">{t('about.judgesTitle')}</h2>
          <p className="text-xl text-slate-300 font-medium tracking-wide">
            {t('about.judgesDesc')}
          </p>
          <Link
            to="/judges"
            className="inline-block mt-2 text-blue-400 hover:text-blue-300 font-medium transition"
          >
            {t('about.judgesLink')}
          </Link>
        </div>

        <div className="text-center p-8">
          <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            {t('about.mission')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
