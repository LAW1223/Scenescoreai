import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'

export const Rules = () => {
  useEffect(() => {
    setSeoData('评分规则 - Scenescoreai', 'Scenescoreai 榜单的收录条件及评分逻辑详细说明。')
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold text-white mb-8">榜单规则</h1>
      
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 border-b border-slate-800 pb-2">一、 收录条件</h2>
          <ul className="list-disc list-inside space-y-3 text-slate-300 leading-relaxed">
            <li>包含超过 50% 的 AI 生成画面（Midjourney, Stable Diffusion, Runway, Pika 等）。</li>
            <li>故事主线清晰，人物或逻辑具备连贯性。</li>
            <li>成片发布于公开流媒体或社交平台（B站、YouTube、抖音、TikTok 等）。</li>
            <li>无低俗、侵权或严重违规内容。</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 border-b border-slate-800 pb-2">二、 评分逻辑 (满分 10 分)</h2>
          <p className="text-slate-300 mb-4">最终得分由以下四个维度的加权平均得出：</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">1. 视听质量 (30%)</h3>
              <p className="text-sm text-slate-400">画面的连贯性、人物一致性、光影审美、声音与配乐的契合度。</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">2. 剧本叙事 (30%)</h3>
              <p className="text-sm text-slate-400">故事节奏、悬念设置、逻辑自洽以及台词水准。</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">3. 观众反响 (20%)</h3>
              <p className="text-sm text-slate-400">全网播放量、点赞率、评论互动率及好评比例。</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2">4. 技术突破 (20%)</h3>
              <p className="text-sm text-slate-400">是否运用了新的 AI 流程、突破了常规生成限制或实现了高难度的动态效果。</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 border-b border-slate-800 pb-2">三、 更新频率</h2>
          <ul className="list-disc list-inside space-y-3 text-slate-300">
            <li><span className="text-white font-medium">AI 漫剧榜：</span>每月 1 日更新前一个月的月度综合排名。</li>
            <li><span className="text-white font-medium">AI 短剧榜：</span>每月 1 日、15 日更新，反映高频的榜单更迭。</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Rules
