import React, { useState } from "react";
import { tables, orders } from "../../../data/exampleData";

export default function TableManager() {
  const [selectedTable, setSelectedTable] = useState(null);

  function getTableOrders(tableId) {
    return orders.filter((o) => o.table_id === tableId);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Masalar</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div
            key={table.id}
            className="bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-lg transition flex flex-col items-center"
            onClick={() => setSelectedTable(table)}
          >
            <div className="text-3xl font-bold mb-2">{table.label}</div>
            <div className="text-gray-500 text-sm mb-2">
              Oluşturulma: {table.created_at.split(" ")[0]}
            </div>
            <div className="text-sm text-blue-600">
              Sipariş Sayısı: {getTableOrders(table.id).length}
            </div>
          </div>
        ))}
      </div>

      {/* Masa Detay Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 text-xl"
              onClick={() => setSelectedTable(null)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-3">{selectedTable.label} Masası</h3>
            <div className="mb-2 text-gray-500">
              Oluşturulma: {selectedTable.created_at}
            </div>
            <h4 className="font-semibold mb-2">Siparişler:</h4>
            <ul>
              {getTableOrders(selectedTable.id).map((order) => (
                <li key={order.id} className="mb-2 border-b pb-1">
                  #{order.id} — {order.created_at.split(" ")[1]} — <span className="capitalize">{order.order_status}</span>
                </li>
              ))}
              {getTableOrders(selectedTable.id).length === 0 && (
                <li>Bu masada henüz sipariş yok.</li>
              )}
            </ul>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedTable(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
