import { Link } from 'react-router-dom'
import { Globe, MessageCircle, Mail } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Scenescoreai
            </span>
            <p className="mt-4 text-slate-400 max-w-sm">
              客观、专业、前沿的 AI 视频内容评估榜单，为您发现最新鲜的优质AI漫剧与短剧。
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
              <a href="mailto:contact@scenescoreai.com" className="text-slate-400 hover:text-white">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">快捷链接</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/ranking/anime" className="text-base text-slate-400 hover:text-white">AI漫剧榜</Link>
              </li>
              <li>
                <Link to="/ranking/short" className="text-base text-slate-400 hover:text-white">AI短剧榜</Link>
              </li>
              <li>
                <Link to="/rules" className="text-base text-slate-400 hover:text-white">评分规则</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase">了解更多</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-slate-400 hover:text-white">关于我们</Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-slate-400 hover:text-white">商务合作</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Scenescoreai. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <span>Power by React & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
