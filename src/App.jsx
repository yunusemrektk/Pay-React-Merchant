import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/organism/main/Sidebar";
import OrderManagement from "./components/organism/orders/OrderManagement";
import TableManager from "./components/organism/tables/TableManager";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/tables" element={<TableManager />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
