import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import OrderManagement from "./components/OrderManagement";
import CategoryMenuManager from "./components/CategoryMenuManager";
import TableManager from "./components/TableManager";
import MerchantSettings from "./components/MerhcantSettings";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/orders" element={<OrderManagement />} />
          <Route path="/tables" element={<TableManager />} />
          <Route path="/menu" element={<CategoryMenuManager />} />
          <Route path="/settings" element={<MerchantSettings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
