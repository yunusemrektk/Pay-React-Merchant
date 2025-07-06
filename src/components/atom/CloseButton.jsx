// Bir ikon kütüphanesi kullanıyorsan ör: react-icons, lucide-react veya kendi SVG'n ile kullanabilirsin.
// Burada örnek olarak basit bir SVG “X” kullandım:
import React from "react";

export function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
      aria-label="Kapat"
      tabIndex={0}
    >
      <svg
        className="w-5 h-5 text-gray-500"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
      </svg>
    </button>
  );
}
