import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

function App() {
  const { i18n } = useTranslation()
  const documentLanguage = i18n.resolvedLanguage === 'zh-TW' ? 'zh-Hant' : 'en'

  useEffect(() => {
    document.documentElement.lang = documentLanguage
  }, [documentLanguage])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
