import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import animeData from '../data/anime-ranking.json'
import shortData from '../data/short-ranking.json'
import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'

export const Home = () => {
  useEffect(() => {
    setSeoData('首页 - Scenescoreai', 'Scenescoreai 提供客观、专业、前沿的 AI 视频内容评估榜单框架')
  }, [])

  const topAnime = animeData.slice(0, 3)
  const topShorts = shortData.slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            发现最硬核的
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              AI 创作宇宙
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto mb-10"
          >
            客观、专业、前沿的 AI 视频评估平台，为你呈现最顶尖的漫剧与短剧。
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center space-x-4"
          >
            <Link to="/ranking/anime" className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-900/50">
              探索漫剧榜
            </Link>
            <Link to="/ranking/short" className="px-8 py-3 rounded-full bg-slate-800 text-slate-200 font-semibold hover:bg-slate-700 transition border border-slate-700">
              探索短剧榜
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Previews */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Anime Preview */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-bold">AI漫剧榜 TOP 3</h2>
                <p className="text-slate-400 mt-1">极致视听盛宴</p>
              </div>
              <Link to="/ranking/anime" className="text-blue-400 hover:text-blue-300 text-sm font-medium">查看完整榜单 &rarr;</Link>
            </div>
            <div className="space-y-4">
              {topAnime.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants} className="group flex items-center bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-blue-500/30 hover:bg-slate-800/50 transition">
                  <div className="text-4xl font-extrabold text-slate-700 mr-4 w-12 text-center group-hover:text-blue-500/20 transition">
                    {index + 1}
                  </div>
                  <img src={item.thumbnail} alt={item.title} className="w-20 h-28 object-cover rounded-xl shadow-md" />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-bold text-slate-200">{item.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    <div className="mt-2 text-blue-400 font-semibold">{item.score} <span className="text-xs text-slate-500 font-normal">pts</span></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Shorts Preview */}
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-bold">AI短剧榜 TOP 3</h2>
                <p className="text-slate-400 mt-1">爆点与情绪的艺术</p>
              </div>
              <Link to="/ranking/short" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">查看完整榜单 &rarr;</Link>
            </div>
            <div className="space-y-4">
              {topShorts.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants} className="group flex items-center bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-indigo-500/30 hover:bg-slate-800/50 transition">
                  <div className="text-4xl font-extrabold text-slate-700 mr-4 w-12 text-center group-hover:text-indigo-500/20 transition">
                    {index + 1}
                  </div>
                  <img src={item.thumbnail} alt={item.title} className="w-20 h-28 object-cover rounded-xl shadow-md" />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-bold text-slate-200">{item.title}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                    <div className="mt-2 text-indigo-400 font-semibold">{item.score} <span className="text-xs text-slate-500 font-normal">pts</span></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

export default Home
