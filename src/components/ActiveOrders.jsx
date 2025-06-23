import React from 'react';

export default function ActiveOrders({ orders, onUpdateStatus }) {
  return (
    <div className="grid gap-6">
      {orders.map(order => (
        <div key={order.tableId} className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Table {order.tableId}</h2>
          <p>Items: {order.items.join(', ')}</p>
          <p>Total: {order.total.toFixed(2)} ₺</p>
          <p>Status: {order.status}</p>
          <div className="mt-4 space-x-2">
            <button onClick={() => onUpdateStatus(order.tableId, 'Ready')} className="px-3 py-1 bg-green-500 text-white rounded">Ready</button>
            <button onClick={() => onUpdateStatus(order.tableId, 'Completed')} className="px-3 py-1 bg-blue-500 text-white rounded">Completed</button>
          </div>
        </div>
      ))}
    </div>
);
}