import React, { useState } from 'react';
import ActiveOrders from './components/ActiveOrders';
import CategoryEditor from './components/CategoryEditor';
import MenuEditor from './components/MenuEditor';

// Örnek başlangıç verisi
const initialData = {
  categories: [
    { label: 'Pizza' },
    { label: 'Salata' }
  ],
  menuItems: [
    { id: 3, name: 'Pizza Margherita', price: 190, description: 'Mozzarella, domates sos, fesleğen yaprakları' },
    { id: 4, name: 'Sezar Salata', price: 85, description: 'Marul, kruton, parmesan, sezar sos' }
  ],
  merchant: { id: 'm2', name: 'Cafe B', address: 'Kahve Sk. No:5, İzmir' },
  orders: []
};

export default function App() {
  const [view, setView] = useState('orders');
  const [categories, setCategories] = useState(initialData.categories);
  const [menuItems, setMenuItems] = useState(initialData.menuItems);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{initialData.merchant.name}</h1>
          <p className="text-sm text-gray-600">{initialData.merchant.address}</p>
        </div>
        <nav className="space-x-4">
          <button
            onClick={() => setView('orders')}
            className={`px-4 py-2 rounded ${view==='orders'? 'bg-blue-600 text-white':'bg-white border'}`}
          >Aktif Siparişler</button>
          <button
            onClick={() => setView('categories')}
            className={`px-4 py-2 rounded ${view==='categories'? 'bg-blue-600 text-white':'bg-white border'}`}
          >Kategoriler</button>
          <button
            onClick={() => setView('menu')}
            className={`px-4 py-2 rounded ${view==='menu'? 'bg-blue-600 text-white':'bg-white border'}`}
          >Ürünler</button>
        </nav>
      </header>

      {/* Content */}
      {view === 'orders' && <ActiveOrders orders={initialData.orders} />}
      {view === 'categories' && (
        <CategoryEditor categories={categories} onSave={setCategories} />
      )}
      {view === 'menu' && (
        <MenuEditor
          categories={categories}
          menuItems={menuItems}
          onSave={setMenuItems}
        />
      )}
    </div>
  );
}