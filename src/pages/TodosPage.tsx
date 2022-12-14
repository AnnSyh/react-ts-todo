import React, { useState, useEffect, useContext } from 'react'
import { TodoForm } from '../components/TodoForm'
// import { TodoList } from '../components/TodoList'
// import { RemoveConfirm } from '../components/RemoveConfirm'
import { ITodo } from '../interfaces'

import { Modal } from '../components/Modal'
import { ModalContext } from '../context/ModalContext'

export const TodosPage: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  const [clickedItemId, setclickedItemId] = useState(0);
  const [clickedItemTitle, setclickedItemTitle] = useState('');

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

  const passItemId = (id: number, title: string) => {
    open()
    setclickedItemId(id)
    setclickedItemTitle(title)

  }

  const removeHandler = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
    close()
  }

  console.log(' TodosPage: clickedItem id =', clickedItemId);
  console.log(' TodosPage: clickedItem title =', clickedItemTitle);
  console.log(' TodosPage: Todos =', todos);

  return (
    <>
      <TodoForm onAdd={addHandler} />

      <>
        {modal && <Modal
          title='Вы уверены, что хотите удалить'
          onClose={() => close()}
        >
          <p className='flex justify-center py-4'>элемент {clickedItemTitle} c id = {clickedItemId} ?</p>
          <div className='flex m-4'>
            <button
              className='btn-primary'
              onClick={() => removeHandler(clickedItemId)}
            > Yes
            </button>
            <button
              className='btn-primary'
              onClick={() => close()}
            > No
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
                <label className='todo-label'>
                  <span className='flex items-center'>
                    <input
                      className='input-primary'
                      type="checkbox"
                      checked={todo.completed}
                      onChange={toggleHandler.bind(null, todo.id)}
                    />
                    <span>{todo.title}</span>
                  </span>
                  <i
                    className="material-icons red-text"
                    onClick={() => passItemId(todo.id, todo.title)}
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
