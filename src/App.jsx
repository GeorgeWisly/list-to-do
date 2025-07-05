import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { Trash2, Edit2, Save, X, Plus } from 'lucide-react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Master Tailwind CSS', completed: true }
  ])
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newId = Math.max(...todos.map(t => t.id), 0) + 1
      setTodos([...todos, { id: newId, text: newTodo.trim(), completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const startEditing = (id, text) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEdit = () => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ))
    }
    setEditingId(null)
    setEditingText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingText('')
  }

  const activeTodos = todos.filter(todo => !todo.completed)
  const completedTodos = todos.filter(todo => todo.completed)

  const TodoItem = ({ todo }) => (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
        className="flex-shrink-0"
      />
      
      {editingId === todo.id ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
            autoFocus
          />
          <Button size="sm" onClick={saveEdit} variant="outline">
            <Save className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={cancelEdit} variant="outline">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-between">
          <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
            {todo.text}
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => startEditing(todo.id, todo.text)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => deleteTodo(todo.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Simple Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Todo List</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Add New Todo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                className="flex-1"
              />
              <Button onClick={addTodo}>Add Task</Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Todos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-600">
              My Todo List ({activeTodos.length} tasks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeTodos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No active tasks. Add one above!
              </p>
            ) : (
              <div className="space-y-3">
                {activeTodos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Todos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">
              All I Finished ({completedTodos.length} tasks)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {completedTodos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No completed tasks yet. Keep working!
              </p>
            ) : (
              <div className="space-y-3">
                {completedTodos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

