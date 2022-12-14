import React, { useState, useEffect, useContext, useRef } from 'react'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { RemoveConfirm } from '../components/RemoveConfirm'
import { ITodo } from '../interfaces'

import { Modal } from '../components/Modal'
import { ModalContext } from '../context/ModalContext'

declare var confirm: (question: string) => boolean

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  const [clickedId, setClickedId] = useState(0);

  let deleteFunc = useRef(null)

  const { modal, open, close } = useContext(ModalContext);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
    setTodos(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addHandler = (title: string) => {
    const newTodo: ITodo = {
      title: title,
      id: Date.now(),
      completed: false
    }
    setTodos(prev => [newTodo, ...prev])
  }

  const toggleHandler = (id: number) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed  // если включен StrictMode в index.tsx то работать не будет
        }
        return todo
      })
    )
  }

  const removeHandler = (id: number) => {
    console.log('!!!!')
    open()
    setClickedId(id)

    // const shoudRemove = confirm('Вы уверены, что хотите удалить элемент?')
    // if (shoudRemove) {
    //   setTodos(prev => prev.filter(todo => todo.id !== id))
    // }
  }

  const clickYesHandler = (id: number) => {
    console.log('clickYesHandler: id =', id);
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  console.log(' TodosPage: clicked id =', clickedId);
  console.log(' TodosPage: Todos =', todos);

  return (
    <>
      <TodoForm onAdd={addHandler} />

      <>
        {modal && <Modal
          title='Вы уверены, что хотите удалить элемент?'
          onClose={() => close()}
        >

          <h1>Вы уверены?</h1>
          <div className='flex m-4'>
            <button
              className='m-auto block justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              // onClick={() => clickYesHandler(0)}
              onClick={() => clickYesHandler(clickedId)}
            >
              Yes
            </button>
            <button
              className='m-auto block justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              onClick={() => close()}
            >
              No
            </button>
          </div>

        </Modal>}

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
                      onChange={toggleHandler.bind(null, todo.id)}
                    />
                    <span>{todo.title}</span>
                  </span>
                  <i
                    className="material-icons red-text"
                    onClick={() => {
                      removeHandler(todo.id)
                    }}
                  // onClick={() => onRemove(todo.id)}
                  >
                    delete
                  </i>
                </label>
              </li>
            )
          })}
        </ul>
      </>



    </>
  )
}
