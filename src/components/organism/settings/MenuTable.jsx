import React from "react";
import { EditIcon, DeleteIcon, SwapIcon } from "../main/Icons";

export default function MenuTable({
  menu,
  categories,
  openMenuModal,
  setShowMenuDel,
  setMoveMenuItem,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 min-h-[320px] max-h-[320px] overflow-y-auto">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left w-1/4">Ürün</th>
            <th className="py-2 text-left w-2/5">Açıklama</th>
            <th className="py-2 text-center w-1/6">Fiyat</th>
            <th className="py-2 w-16 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {/* Eğer hiç ürün yoksa sadece uyarı satırı */}
          {menu.length === 0 && (
            <tr>
              <td colSpan={4} className="py-3 text-center text-gray-400">
                Bu kategoride ürün yok.
              </td>
            </tr>
          )}
          {/* Her bir ürün için satır */}
          {menu.map((item) => (
            <tr key={item.id} className="border-b last:border-none group hover:bg-blue-50">
              <td className="py-2 w-1/4">
                <span className="block truncate max-w-[160px] whitespace-nowrap overflow-hidden">
                  {item.name}
                </span>
              </td>
              <td className="py-2 w-2/5">
                <span className="block truncate max-w-[260px] whitespace-nowrap overflow-hidden">
                  {item.description}
                </span>
              </td>
              <td className="py-2 w-1/6 text-center">
                {parseFloat(item.price).toFixed(2)} ₺
              </td>
              <td className="py-2 w-16 text-center">
                <button
                  className="inline-block mr-2 align-middle"
                  title="Düzenle"
                  onClick={() => openMenuModal({ edit: item })}
                  tabIndex={0}
                >
                  <EditIcon />
                </button>
                <button
                  className="inline-block mr-2 align-middle"
                  title="Sil"
                  onClick={() => setShowMenuDel(item)}
                  tabIndex={0}
                >
                  <DeleteIcon />
                </button>
                <button
                  className="inline-block align-middle"
                  title="Kategorisini değiştir"
                  onClick={() => setMoveMenuItem(item)}
                  tabIndex={0}
                >
                  <SwapIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
