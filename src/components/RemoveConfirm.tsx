import React from 'react'
import { ITodo } from '../interfaces'

type RemoveConfirmProps = {
  todos: ITodo[]
  onToggle: (id: number) => void
  onClick: (id: number) => void
  onRemove: (id: number) => void
}

export const RemoveConfirm: any = (props: any) => {

  console.log('props = ', props);
  console.log('props.clickedTodoId = ', props.clickedTodoId);

  const onClickRemove = () => {
    console.log('onClickRemove');
    props.removeHandler()
  }

  const removeHandler = (event: React.MouseEvent, id: number) => {
    event.preventDefault()
    console.log('event.target = ', event.target);
    console.log('id = ', id);

    props.onRemove(id)
  }

  return (
    <>
      <div className='flex m-4'>
        <button
          className='m-auto block justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={event => removeHandler(event, 1670496325454)}
        >
          Yes
        </button>
        <button
          className='m-auto block justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        // onClick={() => close()}
        >
          No
        </button>
      </div>
    </>
  )
}