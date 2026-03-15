import { useState, KeyboardEvent } from 'react'
import { Priority } from '../types'
import { useLang } from '../LangContext'

interface Props {
  onAdd: (text: string, priority: Priority) => void
  onClearDone: () => void
}

export default function TodoInput({ onAdd, onClearDone }: Props) {
  const { t } = useLang()
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const submit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed, priority)
    setText('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submit()
  }

  return (
    <>
      <div className="input-area">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t.addPlaceholder}
          maxLength={120}
          autoFocus
        />
        <button onClick={submit} title="Add">＋</button>
      </div>
      <div className="add-options">
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
          <option value="medium">{t.prioritySelect.medium}</option>
          <option value="high">{t.prioritySelect.high}</option>
          <option value="low">{t.prioritySelect.low}</option>
        </select>
        <button className="clear-done" onClick={onClearDone}>{t.clearDone}</button>
      </div>
    </>
  )
}
