import { CloseButton } from "../atom/CloseButton";

export default function SuccessModal({ open, onClose, message, title = "İşlem başarılı!" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 pt-10 w-full max-w-sm relative">
        <CloseButton onClick={onClose} className="absolute top-3 right-3" />

        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <div className="text-gray-600 mb-4">{message}</div>
          <button
            onClick={onClose}
            className="mt-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
}
