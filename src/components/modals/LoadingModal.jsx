// src/components/modals/LoadingModal.jsx
import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { CloseButton } from "../atom/CloseButton";

export default function LoadingModal({
  open,
  onClose,
  title = "Lütfen Bekleyin",
  description = "",
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
        {/* Close Button (if you want the user to be able to cancel loading) */}
        {onClose && (
          <CloseButton
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          />
        )}

        <div className="flex flex-col items-center text-center">
          {/* Spinner */}
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 mb-4">
            <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          </div>

          {/* Title & Description */}
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{title}</h2>
          {description && (
            <p className="text-gray-600 mb-4">
              {description}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
