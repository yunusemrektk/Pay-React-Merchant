// components/Modals/ConfirmModal.jsx

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Trash2, XCircle } from "lucide-react";

export default function ConfirmModal({ text, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
      >
        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>

        {/* Message */}
        <p className="text-center text-gray-800 mb-6">{text}</p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <Trash2 className="w-5 h-5" />
            Evet, Sil
          </button>
          <button
            onClick={onCancel}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <XCircle className="w-5 h-5" />
            Vazgeç
          </button>
        </div>
      </motion.div>
    </div>
  );
}
