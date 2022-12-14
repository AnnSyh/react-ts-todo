import React, { useState, useEffect, useContext } from 'react'

import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { Modal } from '../components/Modal'
import { ModalConfirm } from '../components/ModalConfirm'

import { ModalContext } from '../context/ModalContext'

import { ITodo } from '../interfaces'


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

  // console.log(' TodosPage: clickedItem id =', clickedItemId);
  // console.log(' TodosPage: clickedItem title =', clickedItemTitle);
  // console.log(' TodosPage: Todos =', todos);


  //когда дел нет
  if (todos.length === 0) {
    return (
      <>
        <TodoForm onAdd={addHandler} />
        <p className="center">Пока дел нет!</p>
      </>
    )
  }
  //когда дела есть
  return (
    <>
      <TodoForm onAdd={addHandler} />

      {modal && <Modal
        title='Вы уверены, что хотите удалить'
        onClose={() => close()}
      >
        <ModalConfirm
          clickedItemId={clickedItemId}
          clickedItemTitle={clickedItemTitle}
          removeHandler={removeHandler}
        />
      </Modal>}

      <TodoList
        todos={todos}
        onToggle={toggleHandler}
        passItemId={passItemId}
        toggleHandler={toggleHandler}
      />

    </>
  )
}
