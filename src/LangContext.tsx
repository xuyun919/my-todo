import { createContext, useContext, useState, ReactNode } from 'react'
import { Lang, translations } from './i18n'

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: typeof translations['en']
}

const LangContext = createContext<LangContextValue>(null!)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) ?? 'en'
  })

  const setLang = (l: Lang) => {
    localStorage.setItem('lang', l)
    setLangState(l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
