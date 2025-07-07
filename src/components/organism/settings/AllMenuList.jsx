import React from "react";
import ProductThumbnail from "../../molecules/ProductThumbnail";

export default function AllMenuList({ categories, menu }) {
  return (
    <div className="bg-blue-50 rounded-xl shadow-md p-6 max-h-[380px] overflow-y-auto w-full h-full">
      <div className="flex items-center mb-4">
        <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
        <span className="text-blue-700 font-semibold">Tüm Ürünler</span>
        <span className="ml-3 text-xs text-gray-500">Buradaki alan yalnızca görüntüleme içindir, işlem yapılamaz.</span>
      </div>
      <div className="space-y-6 flex-1">
        {categories.map(cat => {
          const catProducts = menu.filter(m => m.category_id === cat.id);
          return (
            <div key={cat.id} className="pb-4 border-b last:border-none">
              <div className="font-bold text-blue-700 mb-2">{cat.label}</div>
              {catProducts.length === 0 ? (
                <div className="text-gray-400 italic mb-2">Bu kategoride ürün yok.</div>
              ) : (
                <ul className="space-y-1">
                  {catProducts.map(prod => (
                    <li
                      key={prod.id}
                      className="grid grid-cols-[40px,1fr,2fr,1fr] gap-3 px-3 py-2 rounded hover:bg-blue-100 items-center"
                    >
                      {/* Thumbnail */}
                      <div className="w-10 h-10 flex items-center justify-center bg-white border rounded shadow-sm overflow-hidden flex-shrink-0">
                        <ProductThumbnail imagePath={prod.image_path} alt={prod.name} />
                      </div>
                      {/* Name */}
                      <span className="font-medium truncate">{prod.name}</span>
                      {/* Description */}
                      <span className="text-gray-500 text-xs truncate">{prod.description}</span>
                      {/* Price */}
                      <span className="text-sm font-mono text-gray-800 text-right">{parseFloat(prod.price).toFixed(2)} ₺</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
