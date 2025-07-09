// components/Modals/ErrorModal.jsx

import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { CloseButton } from "../atom/CloseButton";

export default function ErrorModal({
  open,
  onClose,
  message,
  title = "Bir hata oluştu!",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-2xl shadow-xl p-6 pt-10 w-full max-w-sm relative"
      >
        {/* Close Button */}
        <CloseButton
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        />

        {/* Icon & Text */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 mb-4">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
          <p className="text-gray-600 mb-6">{message}</p>

          {/* Action */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Tamam
          </button>
        </div>
      </motion.div>
    </div>
  );
}
