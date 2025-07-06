import React from "react";
import CloudinaryUpload from "../organism/settings/CloudinaryUpload";

export default function MenuModal({ onClose, menuModal, setMenuModal, handleMenuSave, saving }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>×</button>
        <form onSubmit={handleMenuSave} className="flex flex-col gap-4">
          <input
            className="border rounded p-2"
            value={menuModal.form.name}
            autoFocus
            onChange={e => setMenuModal({ ...menuModal, form: { ...menuModal.form, name: e.target.value } })}
            placeholder="Ürün adı"
            required
          />
          <input
            className="border rounded p-2"
            value={menuModal.form.description}
            onChange={e => setMenuModal({ ...menuModal, form: { ...menuModal.form, description: e.target.value } })}
            placeholder="Açıklama"
          />
          <input
            className="border rounded p-2"
            type="number"
            min="0"
            step="0.01"
            style={{ MozAppearance: "textfield" }}
            value={menuModal.form.price}
            onWheel={e => e.target.blur()}
            onChange={e => setMenuModal({ ...menuModal, form: { ...menuModal.form, price: e.target.value } })}
            placeholder="Fiyat (₺)"
            required
            inputMode="decimal"
          />
          <CloudinaryUpload
            file={menuModal.form.image_file}
            onFileSelect={file =>
              setMenuModal({
                ...menuModal,
                form: { ...menuModal.form, image_file: file }
              })
            }
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-100">Vazgeç</button>
            <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-blue-600 text-white">
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
