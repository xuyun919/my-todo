import { useState, KeyboardEvent } from 'react'
import { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, text: string) => void
}

const priorityLabel = { high: '高', medium: '中', low: '低' }
const priorityClass = { high: 'p-high', medium: 'p-medium', low: 'p-low' }

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  const commitEdit = () => {
    const trimmed = draft.trim()
    if (!trimmed) {
      setDraft(todo.text)
    } else if (trimmed !== todo.text) {
      onEdit(todo.id, trimmed)
    }
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') { setDraft(todo.text); setEditing(false) }
  }

  return (
    <div className={`todo-item${todo.done ? ' done' : ''}`}>
      <div className="todo-check" onClick={() => onToggle(todo.id)} />
      {editing ? (
        <input
          className="todo-text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="todo-text" onDoubleClick={() => { setDraft(todo.text); setEditing(true) }}>
          {todo.text}
        </span>
      )}
      <span className={`priority-badge ${priorityClass[todo.priority]}`}>
        {priorityLabel[todo.priority]}
      </span>
      <div className="todo-actions">
        <button className="btn-icon" onClick={() => onDelete(todo.id)} title="删除">🗑</button>
      </div>
    </div>
  )
}
