import { Mail, MessageSquare, Briefcase } from 'lucide-react'
import { setSeoData } from '../utils/seo'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const Contact = () => {
  const { t } = useTranslation()

  useEffect(() => {
    setSeoData('联系合作 - Scenescoreai', '欢迎联系 Scenescoreai，我们期待与行业伙伴合作共赢。')
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t('contact.title')}</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center transition hover:border-blue-500/50">
          <div className="bg-blue-600/10 p-4 rounded-full mb-6">
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t('contact.emailCol')}</h3>
          <p className="text-slate-400 mb-4">{t('contact.emailDesc')}</p>
          <a href="mailto:Marketing@scenescore.ai" className="text-blue-400 font-medium hover:underline">
            Marketing@scenescore.ai
          </a>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center transition hover:border-indigo-500/50">
          <div className="bg-indigo-500/10 p-4 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t('contact.submitCol')}</h3>
          <p className="text-slate-400 mb-4">{t('contact.submitDesc')}</p>
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
            {t('contact.submitBtn')}
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center transition hover:border-slate-500/50">
          <div className="bg-slate-800 p-4 rounded-full mb-6">
            <MessageSquare className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{t('contact.socialCol')}</h3>
          <p className="text-slate-400 mb-4">{t('contact.socialDesc')}</p>
          <div className="flex gap-4 text-slate-300">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Discord</a>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">{t('contact.formTitle')}</h2>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">{t('contact.fName')}</label>
              <input type="text" id="name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder={t('contact.fNamePh')} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">{t('contact.fEmail')}</label>
              <input type="email" id="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder={t('contact.fEmailPh')} />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">{t('contact.fMsg')}</label>
            <textarea id="message" rows={5} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder={t('contact.fMsgPh')}></textarea>
          </div>
          <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200">
            {t('contact.fSend')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
