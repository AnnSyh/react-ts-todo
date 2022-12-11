import React from 'react'
import { ITodo } from '../interfaces'

type TodoListProps = {
  todos: ITodo[]
  onToggle(id: number): void
  onRemove: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onRemove, onToggle }) => {

  console.log('TodoListProps = ', { todos, onRemove, onToggle });


  if (todos.length === 0) {
    return <p className="center">Пока дел нет!</p>
  }

  const removeHandler = (id: number) => {
    onRemove(id)
  }

  return (
    <ul>
      {todos.map((todo) => {
        const classes = ['todo']
        if (todo.completed) {
          classes.push('completed')
        }

        return (
          <li className={classes.join(' ')} key={todo.id}>
            <label className='w-full flex justify-between align-center mt-4 mb-4'>
              <span className='flex center'>
                <input
                  className='mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  type="checkbox"
                  checked={todo.completed}
                  onChange={onToggle.bind(null, todo.id)}
                />
                <span>{todo.title}</span>
              </span>
              <i
                className="material-icons red-text"
                onClick={() => removeHandler(todo.id)}
              >
                delete
              </i>
            </label>
          </li>
        )
      })}
    </ul>
  )
}
