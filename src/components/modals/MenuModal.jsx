import React from "react";
import CloudinaryUpload from "../organism/settings/CloudinaryUpload";
import { CloseButton } from "../atom/CloseButton";

// categories propunu ekledik!
export default function MenuModal({ onClose, menuModal, setMenuModal, handleMenuSave, saving, categories }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 pt-12 w-full max-w-sm relative">
                <CloseButton onClick={onClose} className="absolute top-3 right-3" />
                <h3 className="absolute top-3 left-0 w-full text-center font-semibold text-lg text-gray-700 pointer-events-none">
                    {menuModal.edit ? "Ürünü Düzenle" : "Yeni Ürün"}
                </h3>
                <form onSubmit={handleMenuSave} className="flex flex-col gap-4 mt-2">
                    <select
                        className="border rounded p-2"
                        value={menuModal.form.category_id || ""}
                        onChange={e =>
                            setMenuModal({
                                ...menuModal,
                                form: { ...menuModal.form, category_id: e.target.value }
                            })
                        }
                        required
                    >
                        <option value="" disabled>Kategori Seç</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.label}
                            </option>
                        ))}
                    </select>
                    <input
                        className="border rounded p-2"
                        value={menuModal.form.name}
                        autoFocus
                        onChange={e => setMenuModal({ ...menuModal, form: { ...menuModal.form, name: e.target.value } })}
                        placeholder="Ürün adı"
                        required
                    />
                    <textarea
                        className="border rounded p-2 resize-none"
                        value={menuModal.form.description}
                        onChange={e => setMenuModal({ ...menuModal, form: { ...menuModal.form, description: e.target.value } })}
                        placeholder="Açıklama"
                        rows={3}
                        maxLength={300}
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
