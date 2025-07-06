// src/components/Modals/MoveMenuModal.jsx
import React from "react";
import { CloseButton } from "../atom/CloseButton";

export default function MoveMenuModal({ menuItem, categories, onClose, onMove }) {
    const [selectedCatId, setSelectedCatId] = React.useState(menuItem.category_id);

    function handleSubmit(e) {
        e.preventDefault();
        if (selectedCatId && selectedCatId !== menuItem.category_id) {
            onMove(selectedCatId);
        }
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
                {/* Close button artık kutunun sağ üst köşesinde! */}
                <CloseButton onClick={onClose} className="absolute top-3 right-3" />

                <h2 className="font-bold mb-4">Kategoriyi Değiştir</h2>
                <select
                    className="border rounded w-full p-2 mb-4"
                    value={selectedCatId}
                    onChange={e => setSelectedCatId(Number(e.target.value))}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                </select>
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="px-3 py-1 bg-gray-200 rounded">İptal</button>
                    <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Kaydet</button>
                </div>
            </form>
        </div>
    );
}
