import React, { createContext, useContext, useEffect, useState } from 'react';

export type ModalIdentifier = 'helpout' | 'settings' | 'about' | 'timer'

interface ModalContextProps {
    activeModal: ModalIdentifier | undefined;
    toggleModal: (modal: ModalIdentifier | undefined) => void;

};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [activeModal, setActiveModal] = useState<ModalIdentifier | undefined>();
    
    const toggleModal = (modal : ModalIdentifier | undefined) => {
        // console.log('Active modal is now ', modal)
        setActiveModal(modal)
    }

    return (
        <ModalContext.Provider
          value={{ activeModal, toggleModal  }}
        >
          {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
      throw new Error('useModal must be used within a ModalProvider!');
    }
    return context;
  };