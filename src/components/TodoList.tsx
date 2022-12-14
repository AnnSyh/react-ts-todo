import React, { useState, useContext } from 'react'
import { ITodo } from '../interfaces'

import { Modal } from '../components/Modal'
import { ModalContext } from '../context/ModalContext'

type TodoListProps = {
  todos: ITodo[]
  onToggle(id: number): void
  onRemove: (id: number) => void
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onRemove, onToggle }) => {


  console.log('TodoListProps = ', { todos, onRemove, onToggle });

  const { modal, open, close } = useContext(ModalContext);
  const [clickedId, setClickedId] = useState<number>();



  const removeHandler = (id: number) => {
    // open()
    setClickedId(id)
  }
  console.log(' TodoList: clicked id =', clickedId);

  const clickYesHandler = (id: any) => {
    console.log('clickYesHandler: id =', id);

    let newModel = [...todos]
    newModel.splice(id, 1)
    // setTodos(newModel)

  }

  if (todos.length === 0) {
    return <p className="center">Пока дел нет!</p>
  }

  return (

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
                    onChange={onToggle.bind(null, todo.id)}
                  />
                  <span>{todo.title}</span>
                </span>
                <i
                  className="material-icons red-text"
                  onClick={() => {
                    removeHandler(todo.id)
                    onRemove(todo.id)
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

  )
}
