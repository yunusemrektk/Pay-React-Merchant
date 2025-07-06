import React from "react";

export default function AllMenuList({ categories, menu }) {
  return (
    <div className="bg-blue-50 rounded-xl shadow-md p-6 max-h-72 overflow-y-auto">
      <div className="flex items-center mb-4">
        <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
        <span className="text-blue-700 font-semibold">Tüm Ürünler</span>
        <span className="ml-3 text-xs text-gray-500">Buradaki alan yalnızca görüntüleme içindir, işlem yapılamaz.</span>
      </div>
      <div className="space-y-6">
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
                      className="grid grid-cols-3 gap-4 items-center px-3 py-1 rounded hover:bg-blue-100"
                    >
                      <span className="font-medium">{prod.name}</span>
                      <span className="text-gray-500 text-xs">{prod.description}</span>
                      <span className="text-sm font-mono text-gray-800 justify-self-end">{parseFloat(prod.price).toFixed(2)} ₺</span>
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
