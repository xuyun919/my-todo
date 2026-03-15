import { useState, useEffect } from 'react'
import { Todo, Filter, Priority } from './types'
import TodoInput from './components/TodoInput'
import FilterBar from './components/FilterBar'
import ProgressBar from './components/ProgressBar'
import TodoItem from './components/TodoItem'

function loadTodos(): Todo[] {
  try {
    return JSON.parse(localStorage.getItem('todos') ?? '[]')
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text: string, priority: Priority) => {
    setTodos(prev => [{ id: Date.now(), text, done: false, priority }, ...prev])
  }

  const toggleDone = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const editTodo = (id: number, text: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t))
  }

  const clearDone = () => {
    setTodos(prev => prev.filter(t => !t.done))
  }

  const visible = todos.filter(t =>
    filter === 'all' ? true : filter === 'done' ? t.done : !t.done
  )

  const dateStr = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
  })

  return (
    <div className="container">
      <h1>待办清单</h1>
      <p className="subtitle">{dateStr}</p>

      <TodoInput onAdd={addTodo} onClearDone={clearDone} />
      <ProgressBar total={todos.length} done={todos.filter(t => t.done).length} />
      <FilterBar filter={filter} onChange={setFilter} />

      <div className="todo-list">
        {visible.length === 0 ? (
          <div className="empty-state">
            <div className="icon">{filter === 'done' ? '🎉' : '📝'}</div>
            {filter === 'done' ? '还没有完成的任务' : '暂无任务，添加一个吧！'}
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
          共 {todos.length} 项，已完成 {todos.filter(t => t.done).length} 项
          （{Math.round(todos.filter(t => t.done).length / todos.length * 100)}%）
        </div>
      )}
    </div>
  )
}
