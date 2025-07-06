import React from "react";
import { EditIcon, DeleteIcon } from "../main/Icons";

export default function CategoryList({ categories, activeCatId, setActiveCatId, openCatModal, setShowCatDel }) {
  return (
    <ul className="space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50" style={{ overscrollBehavior: 'contain' }}>
      {categories.map(cat => (
        <li
          key={cat.id}
          className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer border transition
            ${activeCatId === cat.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
          onClick={() => setActiveCatId(cat.id)}
        >
          <span className="truncate">{cat.label}</span>
          <div className="flex items-center gap-1 ml-2">
            <span onClick={e => { e.stopPropagation(); openCatModal(cat); }}>
              <EditIcon />
            </span>
            <span onClick={e => { e.stopPropagation(); setShowCatDel(cat); }}>
              <DeleteIcon />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
