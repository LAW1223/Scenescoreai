import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'

export const About = () => {
  useEffect(() => {
    setSeoData('关于我们 - Scenescoreai', '了解 Scenescoreai 的创建初衷和品牌愿景。')
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">发现 AI 叙事的无限可能</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          我们致力于建立 AI 视频内容的评价共识，让优秀的创作者被看见。
        </p>
      </div>

      <div className="space-y-12 text-slate-300 leading-relaxed text-lg">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <h2 className="text-2xl font-semibold text-white mb-4">品牌定位</h2>
          <p>
            Scenescoreai 是一个专注于 AI 辅助创作影视内容的评分与推荐平台。随着生成式 AI 技术的普及，越来越多的个人创作者和团队开始使用 AI 制作高质量的动画（漫剧）和真人风格短剧。我们希望通过客观的数据和专业的评审，为这一新兴领域确立内容标准。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">我们的使命</h3>
            <p>
              过滤信息噪音，发掘那些不仅在技术上令人惊叹，同时在故事内核上同样打动人心的 AI 影视佳作。我们相信，AI 是工具，核心永远是人性的共鸣。
            </p>
          </div>
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
            <h3 className="text-xl font-semibold text-indigo-400 mb-4">合作场景</h3>
            <p>
              我们为创作者提供曝光渠道，为 AI 工具厂商提供用例参考，为资方及媒体提供内容趋势洞察。欢迎各方建立深度的行业合作。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
