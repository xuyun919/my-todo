import { useState, useEffect } from 'react'
import { Todo, Filter, Priority } from './types'
import { LangProvider, useLang } from './LangContext'
import TodoInput from './components/TodoInput'
import FilterBar from './components/FilterBar'
import ProgressBar from './components/ProgressBar'
import TodoItem from './components/TodoItem'
import LangSwitcher from './components/LangSwitcher'

function loadTodos(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem('todos') ?? '[]')
  } catch {
    return []
  }
}

function TodoApp() {
  const { t } = useLang()
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string, priority: Priority) => {
    setTodos(prev => [{ id: Date.now(), text, done: false, priority }, ...prev])
  }

  const toggleDone = (id: number) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo))
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const editTodo = (id: number, text: string) => {
    setTodos(prev => prev.map(todo => todo.id === id ? { ...todo, text } : todo))
  }

  const clearDone = () => {
    setTodos(prev => prev.filter(todo => !todo.done))
  }

  const visible = todos.filter(todo =>
    filter === 'all' ? true : filter === 'done' ? todo.done : !todo.done
  )

  const doneCount = todos.filter(todo => todo.done).length
  const dateStr = new Date().toLocaleDateString(t.dateLocale, {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  })

  return (
    <div className="container">
      <LangSwitcher />
      <h1>{t.title}</h1>
      <p className="subtitle">{dateStr}</p>

      <TodoInput onAdd={addTodo} onClearDone={clearDone} />
      <ProgressBar total={todos.length} done={doneCount} />
      <FilterBar filter={filter} onChange={setFilter} />

      <div className="todo-list">
        {visible.length === 0 ? (
          <div className="empty-state">
            <div className="icon">{filter === 'done' ? '🎉' : '📝'}</div>
            {filter === 'done' ? t.emptyDone : t.emptyAll}
          </div>
        ) : (
          visible.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleDone}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="stats">
          {t.stats(todos.length, doneCount, Math.round(doneCount / todos.length * 100))}
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <TodoApp />
    </LangProvider>
  )
}
