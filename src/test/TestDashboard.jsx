// src/components/CategoryMenuDashboard.jsx
import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function CategoryMenuDashboard({
  categories,
  products,
  onAddCategory,
  onAddProduct,
  onEditCategory,
  onDeleteCategory,
  onEditProduct,
  onDeleteProduct,
}) {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Kategoriler</h2>
        <button
          onClick={onAddCategory}
          className="mb-6 py-2 px-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Yeni Kategori
        </button>
        <ul className="space-y-2 overflow-y-auto flex-1">
          {categories.map(cat => (
            <li
              key={cat.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 rounded transition"
            >
              <span className="flex-1">{cat.label}</span>
              <div className="flex space-x-2">
                <button onClick={() => onEditCategory(cat)}>
                  <Edit2 className="w-4 h-4 text-gray-500 hover:text-blue-600 transition" />
                </button>
                <button onClick={() => onDeleteCategory(cat)}>
                  <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600 transition" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Kategori &amp; Menü</h1>
          <button
            onClick={onAddProduct}
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Ürün Ekle
          </button>
        </div>

        {/* Kart Bazlı Liste */}
        <div className="space-y-8">
          {categories.map(cat => (
            <section key={cat.id}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{cat.label}</h2>
                <button
                  onClick={() => onAddProduct(cat)}
                  className="text-sm text-blue-600 hover:underline transition"
                >
                  + Yeni Ürün
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter(p => p.category_id === cat.id)
                  .map(prod => (
                    <div
                      key={prod.id}
                      className="bg-white border rounded-lg p-5 hover:shadow-lg transition"
                    >
                      <h3 className="font-medium text-lg">{prod.name}</h3>
                      <p className="text-sm text-gray-600 mt-1 mb-4">
                        {prod.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">
                          {prod.price.toFixed(2)} ₺
                        </span>
                        <div className="flex space-x-3">
                          <button onClick={() => onEditProduct(prod)}>
                            <Edit2 className="w-5 h-5 text-gray-500 hover:text-blue-600 transition" />
                          </button>
                          <button onClick={() => onDeleteProduct(prod)}>
                            <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600 transition" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
