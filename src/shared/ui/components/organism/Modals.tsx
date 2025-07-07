"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModalContext } from "../../context/ModalContext";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const showModal = (content: React.ReactNode) => setModalContent(content);
  const hideModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      <AnimatePresence>
        {modalContent && (
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            onClick={hideModal} // Klik di luar konten modal
          >
            {/* Modal content */}
            <div
              className="relative bg-white rounded-lg p-6 shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()} // Hindari close saat klik di dalam
            >
              {modalContent}
              <button
                onClick={hideModal}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
