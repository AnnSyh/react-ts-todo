import React, { createContext, useState } from "react";

interface IModalContext {
  modal: boolean
  open: () => void
  close: () => void
  clickedTodoId: number
}

export const ModalContext = createContext<IModalContext>({
  modal: false,
  open: () => { },
  close: () => { },
  clickedTodoId: 0,
})

export const useModal = () => {
  return createContext(ModalContext);
};

export const ModalState = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(false)

  const open = () => setModal(true)

  const close = () => setModal(false)

  const clickedTodoId = 1670496325454



  return (
    <ModalContext.Provider value={{
      modal,
      open,
      close,
      clickedTodoId
    }}>
      {children}
    </ModalContext.Provider>
  )
}