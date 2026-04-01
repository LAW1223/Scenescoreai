import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Film } from 'lucide-react'

export const Judges = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setSeoData(
      `${t('judges.title')} - Scenescoreai`,
      t('judges.subtitle')
    )
  }, [i18n.language, t])

  const judges = [
    {
      photo: '/images/baigao_huang.png',
      name: t('judges.judge1Name'),
      nameEn: t('judges.judge1NameEn'),
      title: t('judges.judge1Title'),
      works: t('judges.judge1WorksList'),
      worksLabel: t('judges.judge1Works'),
      paragraphs: [t('judges.judge1P1'), t('judges.judge1P2')],
      accentColor: 'blue',
    },
    {
      photo: '/images/jianxin_PENG.png',
      name: t('judges.judge2Name'),
      nameEn: t('judges.judge2NameEn'),
      title: t('judges.judge2Title'),
      works: t('judges.judge2WorksList'),
      worksLabel: t('judges.judge2Works'),
      paragraphs: [t('judges.judge2P1'), t('judges.judge2P2')],
      accentColor: 'indigo',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('judges.title')}</h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t('judges.subtitle')}</p>
      </div>

      <div className="space-y-16">
        {judges.map((judge, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              {/* Photo */}
              <div className="md:w-72 flex-shrink-0">
                <img
                  src={judge.photo}
                  alt={judge.nameEn}
                  className="w-full h-80 md:h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/400x500/1e293b/3b82f6?text=${encodeURIComponent(judge.nameEn)}`;
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-grow p-8 md:p-10">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-white">
                    {judge.name}
                    <span className={`ml-3 text-xl font-normal ${judge.accentColor === 'blue' ? 'text-blue-400' : 'text-indigo-400'}`}>
                      {judge.nameEn}
                    </span>
                  </h2>
                  <p className={`mt-1 text-lg font-medium ${judge.accentColor === 'blue' ? 'text-blue-300' : 'text-indigo-300'}`}>
                    {judge.title}
                  </p>
                </div>

                {/* Works badge */}
                <div className="flex items-start gap-3 mb-6 bg-slate-800/60 rounded-xl px-4 py-3">
                  <Film className={`w-5 h-5 mt-0.5 flex-shrink-0 ${judge.accentColor === 'blue' ? 'text-blue-400' : 'text-indigo-400'}`} />
                  <div>
                    <span className="text-sm font-semibold text-slate-300">{judge.worksLabel}：</span>
                    <span className="text-sm text-slate-400">{judge.works}</span>
                  </div>
                </div>

                {/* Bio paragraphs */}
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  {judge.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Judges
