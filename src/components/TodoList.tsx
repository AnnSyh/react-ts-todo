import React, { useState } from 'react'
import { ITodo } from '../interfaces'


type TodoListProps = {
  todos: ITodo[]
  onToggle: (id: number) => void
  passItemId: (id: number, title: string) => void
  toggleHandler: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, passItemId, toggleHandler }) => {

  // console.log('TodoListProps = ', { todos, onToggle });


  return (

    <ul>
      {todos.map((todo) => {
        const classes = ['todo']
        if (todo.completed) {
          classes.push('completed')
        }

        return (
          <li className={classes.join(' ')} key={todo.id}>
            <label className='todo-label'>
              <span className='flex items-center'>
                <input
                  className='input-primary'
                  type="checkbox"
                  checked={todo.completed}
                  onChange={toggleHandler.bind(null, todo.id)}
                />
                <span className='todo-title'>{todo.title}</span>
              </span>
              <i
                className="material-icons hover:text-red-500"
                onClick={() => passItemId(todo.id, todo.title)}
              >delete
              </i>
            </label>
          </li>
        )
      })}
    </ul>

  )
}
