import { Filter } from '../types'
import { useLang } from '../LangContext'

interface Props {
  filter: Filter
  onChange: (f: Filter) => void
}

const filterKeys: Filter[] = ['all', 'active', 'done']

export default function FilterBar({ filter, onChange }: Props) {
  const { t } = useLang()
  return (
    <div className="filter-bar">
      {filterKeys.map(f => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => onChange(f)}
        >
          {t.filters[f]}
        </button>
      ))}
    </div>
  )
}
