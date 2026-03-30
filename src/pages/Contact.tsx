import { Mail, MessageSquare, Briefcase } from 'lucide-react'
import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'

export const Contact = () => {
  useEffect(() => {
    setSeoData('联系合作 - Scenescoreai', '欢迎联系 Scenescoreai，我们期待与行业伙伴合作共赢。')
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">与我们取得联系</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          无论是寻求投融资、商务合作还是技术交流，请随时通过以下方式联系我们。
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center transition hover:border-blue-500/50">
          <div className="bg-blue-600/10 p-4 rounded-full mb-6">
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">邮件合作</h3>
          <p className="text-slate-400 mb-4">商业及推广合作需求</p>
          <a href="mailto:contact@scenescoreai.com" className="text-blue-400 font-medium hover:underline">
            contact@scenescoreai.com
          </a>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center transition hover:border-indigo-500/50">
          <div className="bg-indigo-500/10 p-4 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">作品自荐</h3>
          <p className="text-slate-400 mb-4">创作者提交作品打榜</p>
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
            提交表单
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center transition hover:border-slate-500/50">
          <div className="bg-slate-800 p-4 rounded-full mb-6">
            <MessageSquare className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">社交媒体</h3>
          <p className="text-slate-400 mb-4">关注我们的最新动态</p>
          <div className="flex gap-4 text-slate-300">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Discord</a>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">在线留言</h2>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">称呼</label>
              <input type="text" id="name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="您的姓名或公司名称" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">邮箱</label>
              <input type="email" id="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="your@email.com" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">留言内容</label>
            <textarea id="message" rows={5} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="请简述您的合作意向或作品链接..."></textarea>
          </div>
          <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
            发送消息
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
