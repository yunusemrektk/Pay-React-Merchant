import React from "react";

export default function ConfirmModal({ text, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
                <div className="mb-5 text-center">{text}</div>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onConfirm}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >Evet, Sil</button>
                    <button
                        onClick={onCancel}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                    >Vazgeç</button>
                </div>
            </div>
        </div>
    );
}
