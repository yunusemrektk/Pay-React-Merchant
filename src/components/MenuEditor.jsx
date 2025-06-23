import React, { useState } from 'react';

export default function MenuEditor({ categories, menuItems, onSave }) {
  const [list, setList] = useState(menuItems);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState(categories[0]?.label || '');

  const add = () => {
    if (!name || !price) return;
    setList(prev => [
      ...prev,
      { id: Date.now(), name, price: parseFloat(price), description: desc, category: cat }
    ]);
    setName(''); setPrice(''); setDesc('');
  };
  const remove = id => setList(prev => prev.filter(item => item.id !== id));
  const save = () => onSave(list);

  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded shadow space-y-2">
        <h2 className="text-xl font-semibold">Yeni Ürün</h2>
        <select value={cat} onChange={e => setCat(e.target.value)} className="border p-2 rounded w-full">
          {categories.map((c,i) => <option key={i}>{c.label}</option>)}
        </select>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Ürün adı" className="border p-2 rounded w-full" />
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Fiyat" type="number" className="border p-2 rounded w-full" />
        <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Açıklama" className="border p-2 rounded w-full" />
        <button onClick={add} className="px-4 py-2 bg-green-500 text-white rounded">Ekle</button>
      </div>

      <div className="grid gap-4">
        {list.map(item => (
          <div key={item.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p>{item.category} — {item.price.toFixed(2)} ₺</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <button onClick={() => remove(item.id)} className="text-red-500">Sil</button>
          </div>
        ))}
      </div>

      <button onClick={save} className="px-4 py-2 bg-blue-600 text-white rounded">Menüyü Kaydet</button>
    </div>
  );
}
