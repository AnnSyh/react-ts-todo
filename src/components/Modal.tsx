import React from "react";

interface ModalProps {
  children: React.ReactNode
  title: string
  onClose: () => void

}

export function Modal({ children, title, onClose }: ModalProps) {
  return (
    <>
      <div
        className="modal-bg"
        onClick={onClose}
      />
      <div
        className="modal-item"
      >
        <i
          className="material-icons hover:cursor-pointer absolute top-3 right-3"
          onClick={onClose}
        >
          clear
        </i>
        <h1 className='text-2xl text-center md-2'>{title}</h1>
        {children}
      </div>
    </>
  )
}