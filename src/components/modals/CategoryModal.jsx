import React from "react";

export default function CategoryModal({ onClose, catModal, setCatModal, handleCatSave }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>×</button>
        <form onSubmit={handleCatSave} className="flex flex-col gap-4">
          <h4 className="font-semibold text-lg">
            {catModal.edit ? "Kategoriyi Düzenle" : "Yeni Kategori"}
          </h4>
          <input
            className="border rounded p-2"
            value={catModal.value}
            autoFocus
            onChange={e => setCatModal({ ...catModal, value: e.target.value })}
            placeholder="Kategori adı"
            required
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100">Vazgeç</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
}
