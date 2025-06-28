import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/orders", label: "Siparişler" },
  { path: "/tables", label: "Masalar" },
  { path: "/menu", label: "Kategori & Menü" },
  { path: "/settings", label: "İşyeri Ayarları" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="h-20 flex items-center justify-center border-b">
        <span className="font-bold text-xl tracking-tight">Merchant Dashboard</span>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-6 py-3 rounded-l-full ${
                    isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
