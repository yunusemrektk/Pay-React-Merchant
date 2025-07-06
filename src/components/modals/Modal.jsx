// src/components/Modals/Modal.jsx
import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm sm:max-w-md relative mx-2"
        onClick={e => e.stopPropagation()} // Modal dışında tıklayınca kapat
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Kapat"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
