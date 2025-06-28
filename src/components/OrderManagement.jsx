import React, { useState } from "react";
import { orders, tables, menu_items } from "../data/exampleData";

const statusColors = {
  pending: "bg-yellow-200 text-yellow-800",
  ready: "bg-green-200 text-green-800",
  paid: "bg-blue-200 text-blue-800",
  canceled: "bg-gray-200 text-gray-700"
};

function getTableLabel(table_id) {
  const t = tables.find((x) => x.id === table_id);
  return t ? t.label : "";
}

function getItemName(id) {
  const i = menu_items.find((x) => x.id === id);
  return i ? i.name : "";
}

export default function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Siparişler</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow p-5 cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedOrder(order)}
          >
            <div className="flex justify-between mb-2">
              <div className="font-semibold">
                Masa: <span className="text-blue-600">{getTableLabel(order.table_id)}</span>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.order_status]}`}>
                {order.order_status.toUpperCase()}
              </div>
            </div>
            <div className="text-gray-500 text-sm mb-2">
              Sipariş Saati: {order.created_at}
            </div>
            <ul className="text-sm">
              {order.items.map((item, i) => (
                <li key={i}>
                  <span className="font-medium">{getItemName(item.menu_item_id)}</span>{" "}
                  <span className="text-gray-500">x{item.qty}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal Detay */}
      {selectedOrder && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-3 right-3 text-gray-500 text-xl"
              onClick={() => setSelectedOrder(null)}
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-2">
              Masa: {getTableLabel(selectedOrder.table_id)}
            </h3>
            <div className="mb-1 text-gray-500">Sipariş Zamanı: {selectedOrder.created_at}</div>
            <div className={`mb-3 px-2 py-1 inline-block rounded text-xs ${statusColors[selectedOrder.order_status]}`}>
              {selectedOrder.order_status.toUpperCase()}
            </div>
            <ul className="mb-2">
              {selectedOrder.items.map((item, i) => (
                <li key={i} className="flex justify-between">
                  <span>{getItemName(item.menu_item_id)}</span>
                  <span className="text-gray-500">x{item.qty}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
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
