import { motion } from 'framer-motion'
import shortData from '../data/short-ranking.json'
import { Flame, TrendingUp, Minus, TrendingDown } from 'lucide-react'
import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const ShortRanking = () => {
  const { t } = useTranslation()

  useEffect(() => {
    setSeoData('AI短剧榜 - Scenescoreai', '探索Scenescoreai最新的AI短剧排名，最快最爽的情绪爆发点。')
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
          <Flame className="text-indigo-500 w-10 h-10" />
          {t('ranking.shortTitle')}
        </h1>
        <p className="mt-4 text-slate-400 max-w-3xl text-lg">
          {t('ranking.shortDesc')}
        </p>
      </div>

      <div className="grid gap-6">
        {shortData.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex flex-col md:flex-row bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition duration-300 shadow-lg"
          >
            {/* Rank & Image */}
            <div className="relative md:w-56 flex-shrink-0 bg-slate-800 flex flex-col justify-center items-center">
              <div className="absolute top-2 left-2 bg-indigo-600 text-white font-bold px-3 py-1 rounded-full text-sm z-10 shadow">
                Top {index + 1}
              </div>
              <img src={item.thumbnail} alt={item.title} className="w-full h-48 md:h-full object-cover opacity-90 transition hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-white tracking-wide">{item.title}</h2>
                  <div className="text-xl font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg">
                    {item.score} <span className="text-xs font-normal text-slate-400">分</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-indigo-900/40 text-indigo-300 text-xs rounded border border-indigo-800/50">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 mb-4 text-slate-300 text-sm">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-slate-500">{t('ranking.trend')}</span>
                    {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400"/>}
                    {item.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500"/>}
                    {item.trend === 'stable' && <Minus className="w-4 h-4 text-slate-400"/>}
                  </div>
                </div>
                <button className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 rounded-lg transition">
                  {t('ranking.watch')}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ShortRanking
