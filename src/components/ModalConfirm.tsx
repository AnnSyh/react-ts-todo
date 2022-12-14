import React, { useContext } from 'react'
import { ModalContext } from '../context/ModalContext'

type ModalConfirmProps = {
  clickedItemId: number,
  clickedItemTitle: string,
  removeHandler: (id: number) => void
  removeHandlerAll?: () => void
}

export const ModalConfirm = (props: ModalConfirmProps) => {
  const { close } = useContext(ModalContext);

  // console.log('ModalConfirm clickedItemId = ', props.clickedItemId);
  // console.log('ModalConfirm clickedItemTitle = ', props.clickedItemTitle);

  const condition = props.clickedItemId
  // console.log('ModalConfirm condition = ', condition);

  if (!condition) {
    return (<>
      <h1 className='text-2xl text-center'>все ?</h1>
      <div className='flex m-4'>
        <button
          className='btn-primary'
          onClick={props.removeHandlerAll}
        > Yes
        </button>
      </div>
    </>)
  }

  return (
    <>
      <p className='flex justify-center py-4'>
        элемент
        <span className='text-blue-600 px-4'>{props.clickedItemTitle}</span>
        c
        <span className='text-blue-600 px-4'>id = {props.clickedItemId}</span> ?</p>
      <div className='flex m-4'>
        <button
          className='btn-primary'
          onClick={() => props.removeHandler(props.clickedItemId)}
        > Yes
        </button>
        <button
          className='btn-primary'
          onClick={() => close()}
        > No
        </button>
      </div>
    </>

  )
}