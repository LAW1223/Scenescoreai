import { motion } from 'framer-motion'
import animeData from '../data/anime-ranking.json'
import { Trophy, TrendingUp, Minus, TrendingDown } from 'lucide-react'
import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'

export const AnimeRanking = () => {
  useEffect(() => {
    setSeoData('AI漫剧榜 - Scenescoreai', '探索Scenescoreai最新的AI漫剧排名，发现最优质的视听盛宴。')
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
          <Trophy className="text-blue-500 w-10 h-10" />
          AI 漫剧风云榜
        </h1>
        <p className="mt-4 text-slate-400 max-w-3xl text-lg">
          结合视听质量、剧情叙事与观众反响，为您筛选出本月最具影响力的 AI 漫剧作品。榜单每月1号更新。
        </p>
      </div>

      <div className="grid gap-6">
        {animeData.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex flex-col md:flex-row bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition duration-300"
          >
            {/* Left Image & Rank */}
            <div className="relative md:w-64 flex-shrink-0">
              <img src={item.thumbnail} alt={item.title} className="w-full h-48 md:h-full object-cover" />
              <div className="absolute top-0 left-0 bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold w-12 h-12 flex items-center justify-center rounded-br-2xl shadow-lg">
                #{index + 1}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-white">{item.title}</h2>
                  <div className="flex items-center gap-2 text-2xl font-black text-blue-400">
                    {item.score} <span className="text-sm font-normal text-slate-500">PT</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 text-blue-300 text-xs rounded-full border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-4 text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="font-medium text-slate-500">走势:</span>
                  {item.trend === 'up' && <span className="flex items-center text-green-400"><TrendingUp className="w-4 h-4 mr-1"/> 上升</span>}
                  {item.trend === 'down' && <span className="flex items-center text-red-400"><TrendingDown className="w-4 h-4 mr-1"/> 下降</span>}
                  {item.trend === 'stable' && <span className="flex items-center text-slate-400"><Minus className="w-4 h-4 mr-1"/> 稳定</span>}
                </div>
                <button className="px-6 py-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-colors">
                  查看详情
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AnimeRanking
