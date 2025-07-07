// context/ModalContext.tsx
import { createContext, useContext } from "react";

interface ModalContextType {
  showModal: (children: React.ReactNode) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  showModal: () => {},
  hideModal: () => {},
});

export const useModal = () => useContext(ModalContext);
