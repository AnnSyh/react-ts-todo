import React, { createContext, useState } from "react";

interface IModalContext {
  modalAll: boolean
  openAll: () => void
  closeAll: () => void
}

export const ModalContextAll = createContext<IModalContext>({
  modalAll: false,
  openAll: () => { },
  closeAll: () => { },
})

export const useModal = () => {
  return createContext(ModalContextAll);
};

export const ModalState = ({ children }: { children: React.ReactNode }) => {
  const [modalAll, setModalAll] = useState(false)

  const openAll = () => setModalAll(true)

  const closeAll = () => setModalAll(false)




  return (
    <ModalContextAll.Provider value={{
      modalAll,
      openAll,
      closeAll,
    }}>
      {children}
    </ModalContextAll.Provider>
  )
}