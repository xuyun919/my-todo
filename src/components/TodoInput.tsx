import { useState, KeyboardEvent } from 'react'
import { Priority } from '../types'

interface Props {
  onAdd: (text: string, priority: Priority) => void
  onClearDone: () => void
}

export default function TodoInput({ onAdd, onClearDone }: Props) {
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
          placeholder="添加新任务..."
          maxLength={120}
          autoFocus
        />
        <button onClick={submit} title="添加">＋</button>
      </div>
      <div className="add-options">
        <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
          <option value="medium">优先级：中</option>
          <option value="high">优先级：高</option>
          <option value="low">优先级：低</option>
        </select>
        <button className="clear-done" onClick={onClearDone}>清除已完成</button>
      </div>
    </>
  )
}
