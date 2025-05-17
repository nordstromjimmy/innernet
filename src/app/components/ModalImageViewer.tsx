"use client";
import { useState, createContext, useContext } from "react";

type ModalContextType = {
  openModal: (src: string) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (src: string) => {
    setModalImage(src);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
          />
          <button
            onClick={() => setModalImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold"
          >
            ×
          </button>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export const useModalImage = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModalImage must be used within ModalProvider");
  return context.openModal;
};
