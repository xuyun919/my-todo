import { Filter } from '../types'

interface Props {
  filter: Filter
  onChange: (f: Filter) => void
}

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '进行中' },
  { value: 'done', label: '已完成' },
]

export default function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="filter-bar">
      {filters.map(f => (
        <button
          key={f.value}
          className={filter === f.value ? 'active' : ''}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
