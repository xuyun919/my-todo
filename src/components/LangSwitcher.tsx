import { Lang } from '../i18n'
import { useLang } from '../LangContext'

const options: { value: Lang; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'zh', label: '中' },
  { value: 'ja', label: '日' },
]

export default function LangSwitcher() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switcher">
      {options.map(o => (
        <button
          key={o.value}
          className={lang === o.value ? 'active' : ''}
          onClick={() => setLang(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
