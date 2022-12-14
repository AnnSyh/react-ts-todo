import React from 'react'

type ModalConfirmAllProps = {
  clickedItemId: number,
  clickedItemTitle: string,
  removeHandler: (id: number) => void
}

export const ModalConfirmAll = (props: ModalConfirmAllProps) => {

  console.log('ModalConfirmAll clickedItemId = ', props.clickedItemId);
  // console.log('ModalConfirm clickedItemTitle = ', props.clickedItemTitle);

  return (
    <>
      <div className='flex m-4'>
        <button
          className='btn-primary'
          onClick={() => props.removeHandler(props.clickedItemId)}
        > Yes
        </button>
      </div>
    </>
  )
}