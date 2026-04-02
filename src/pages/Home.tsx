import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import animeData from '../data/anime-ranking.json'
import shortData from '../data/short-ranking.json'
import musicData from '../data/music-ranking.json'
import toolsData from '../data/tools-ranking.json'
import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const accentStyles = {
  blue:   { rank: 'group-hover:text-blue-500/20',   score: 'text-blue-400',   card: 'hover:border-blue-500/30',   link: 'text-blue-400 hover:text-blue-300',   fallback: '3b82f6' },
  indigo: { rank: 'group-hover:text-indigo-500/20', score: 'text-indigo-400', card: 'hover:border-indigo-500/30', link: 'text-indigo-400 hover:text-indigo-300', fallback: '6366f1' },
  purple: { rank: 'group-hover:text-purple-500/20', score: 'text-purple-400', card: 'hover:border-purple-500/30', link: 'text-purple-400 hover:text-purple-300', fallback: 'a855f7' },
  amber:  { rank: 'group-hover:text-amber-500/20',  score: 'text-amber-400',  card: 'hover:border-amber-500/30',  link: 'text-amber-400 hover:text-amber-300',  fallback: 'f59e0b' },
} as const

type AccentKey = keyof typeof accentStyles

interface PreviewItem {
  id: string
  title?: string
  name?: string
  score: number
  thumbnail: string
  description: string
}

function PreviewCard({ item, index, accent }: { item: PreviewItem; index: number; accent: AccentKey }) {
  const s = accentStyles[accent]
  const label = item.title ?? item.name ?? ''
  return (
    <motion.div
      variants={itemVariants}
      className={`group flex items-center bg-slate-900/50 border border-slate-800 rounded-2xl p-4 ${s.card} hover:bg-slate-800/50 transition`}
    >
      <div className={`text-4xl font-extrabold text-slate-700 mr-4 w-12 text-center ${s.rank} transition`}>
        {index + 1}
      </div>
      <img
        src={item.thumbnail}
        alt={label}
        className="w-20 h-20 object-cover rounded-xl shadow-md flex-shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://placehold.co/400x300/1e293b/${s.fallback}?text=${encodeURIComponent(label)}`
        }}
      />
      <div className="ml-4 flex-grow min-w-0">
        <h3 className="text-base font-bold text-slate-200 truncate">{label}</h3>
        <p className="text-sm text-slate-400 mt-1 line-clamp-2">{item.description}</p>
        <div className={`mt-2 ${s.score} font-semibold text-sm`}>
          {item.score} <span className="text-xs text-slate-500 font-normal">pts</span>
        </div>
      </div>
    </motion.div>
  )
}

export const Home = () => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setSeoData(
      `Scenescoreai - ${t('home.subtitle')}`.slice(0, 60),
      t('home.subtitle')
    )
  }, [i18n.language, t])

  const sections: { key: string; items: PreviewItem[]; path: string; titleKey: string; subKey: string; accent: AccentKey }[] = [
    { key: 'anime', items: animeData.slice(0, 3), path: '/ranking/anime', titleKey: 'home.animePreviewTitle', subKey: 'home.animePreviewSub', accent: 'blue' },
    { key: 'short', items: shortData.slice(0, 3), path: '/ranking/short', titleKey: 'home.shortPreviewTitle', subKey: 'home.shortPreviewSub', accent: 'indigo' },
    { key: 'music', items: musicData.slice(0, 3), path: '/ranking/music', titleKey: 'home.musicPreviewTitle', subKey: 'home.musicPreviewSub', accent: 'purple' },
    { key: 'tools', items: toolsData.slice(0, 3) as PreviewItem[], path: '/ranking/tools', titleKey: 'home.toolsPreviewTitle', subKey: 'home.toolsPreviewSub', accent: 'amber' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            {t('home.title1')}
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              {t('home.title2')}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto mb-10"
          >
            {t('home.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link to="/ranking/anime" className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-900/50">
              {t('home.btnAnime')}
            </Link>
            <Link to="/ranking/short" className="px-8 py-3 rounded-full bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition border border-slate-700">
              {t('home.btnShort')}
            </Link>
            <Link to="/ranking/music" className="px-8 py-3 rounded-full bg-purple-900/60 text-purple-200 font-semibold hover:bg-purple-800 transition border border-purple-700/50">
              {t('nav.music')}
            </Link>
            <Link to="/ranking/tools" className="px-8 py-3 rounded-full bg-amber-900/60 text-amber-200 font-semibold hover:bg-amber-800 transition border border-amber-700/50">
              {t('nav.tools')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Preview Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12">
          {sections.map((sec) => (
            <motion.div key={sec.key} variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{t(sec.titleKey)}</h2>
                  <p className="text-slate-400 mt-1 text-sm">{t(sec.subKey)}</p>
                </div>
                <Link to={sec.path} className={`${accentStyles[sec.accent].link} text-sm font-medium whitespace-nowrap ml-4`}>
                  {t('home.viewAll')} &rarr;
                </Link>
              </div>
              <div className="space-y-3">
                {sec.items.map((item, index) => (
                  <PreviewCard key={item.id} item={item} index={index} accent={sec.accent} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
