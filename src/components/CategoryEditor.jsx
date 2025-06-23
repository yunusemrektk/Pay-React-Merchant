import React, { useState } from 'react';

export default function CategoryEditor({ categories, onSave }) {
  const [list, setList] = useState(categories);
  const [label, setLabel] = useState('');

  const add = () => {
    if (label.trim() === '') return;
    setList(prev => [...prev, { label: label.trim() }]);
    setLabel('');
  };
  const remove = idx => setList(prev => prev.filter((_, i) => i !== idx));
  const save = () => onSave(list);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Kategori adı"
          className="flex-1 border p-2 rounded"
        />
        <button onClick={add} className="px-4 py-2 bg-green-500 text-white rounded">Ekle</button>
      </div>
      <ul className="list-disc pl-5">
        {list.map((c, i) => (
          <li key={i} className="flex justify-between items-center">
            {c.label}
            <button onClick={() => remove(i)} className="text-red-500">Sil</button>
          </li>
        ))}
      </ul>
      <button onClick={save} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Kaydet</button>
    </div>
  );
}