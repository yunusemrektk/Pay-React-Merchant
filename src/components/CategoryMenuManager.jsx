import React, { useState } from "react";
import { categories, menu_items } from "../data/exampleData";

export default function CategoryMenuManager() {
  const [activeCat, setActiveCat] = useState(categories[0]?.id || 1);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kategori & Menü Yönetimi</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat.id)}
            className={`px-4 py-2 rounded ${
              activeCat === cat.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="font-semibold mb-3">
          {categories.find((c) => c.id === activeCat)?.label} Ürünleri
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Ürün</th>
              <th className="py-2 text-left">Açıklama</th>
              <th className="py-2">Fiyat</th>
              <th className="py-2">Beğeni</th>
            </tr>
          </thead>
          <tbody>
            {menu_items
              .filter((m) => m.category_id === activeCat)
              .map((item) => (
                <tr key={item.id} className="border-b last:border-none">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.description}</td>
                  <td className="py-2 text-center">{item.price} ₺</td>
                  <td className="py-2 text-center">{item.like_count}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
