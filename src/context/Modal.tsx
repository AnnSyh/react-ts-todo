import React from "react";
import { useModal } from "./ModalContext";

export default function Modal() {
  const alert = useModal();

  // if (!alert.visible) return null;

  return (
    <div className={"alert alert-danger"} >
      Это очень и очень важное сообщение!
    </div>
  );
}