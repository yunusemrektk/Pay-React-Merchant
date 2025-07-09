// components/Modals/CategoryModal.jsx

import React from "react";
import { motion } from "framer-motion";
import { Tag, Edit3, Check, XCircle } from "lucide-react";
import { CloseButton } from "../atom/CloseButton";

export default function CategoryModal({
  onClose,
  catModal,
  setCatModal,
  handleCatSave,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm relative"
      >
        {/* Close Button */}
        <CloseButton
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        />

        <form onSubmit={handleCatSave} className="space-y-4">
          {/* Header */}
          <h3 className="text-center text-xl font-semibold text-gray-800 flex items-center justify-center gap-2">
            {catModal.edit ? (
              <>
                <Edit3 className="w-5 h-5 text-blue-600" />
                Kategoriyi Düzenle
              </>
            ) : (
              <>
                <Tag className="w-5 h-5 text-green-600" />
                Yeni Kategori
              </>
            )}
          </h3>

          {/* Input */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Kategori adı"
              value={catModal.value}
              autoFocus
              onChange={(e) =>
                setCatModal({ ...catModal, value: e.target.value })
              }
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              <XCircle className="w-5 h-5" />
              Vazgeç
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <Check className="w-5 h-5" />
              Kaydet
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
