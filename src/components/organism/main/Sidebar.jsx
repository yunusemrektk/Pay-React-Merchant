import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { path: "/orders", label: "Siparişler", icon: "📦" },
  { path: "/tables", label: "Masalar", icon: "🍽️" },
  { path: "/settings", label: "İşyeri Ayarları", icon: "⚙️" },
];

export default function Sidebar() {
  // Varsayılan olarak collapsed, dokunmatik ekranda da hep collapsed kalacak
  const [collapsed, setCollapsed] = useState(true);

  // Sadece masaüstünde mouse ile açılıp/kapanabilir, touch'ta hiçbir zaman açılmaz
  const handleMouseEnter = () => {
    if (!isTouchDevice()) setCollapsed(false);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice()) setCollapsed(true);
  };

  // NavLink tıklandığında sidebar daralsın
  const handleNavClick = () => setCollapsed(true);

  // Touch device algılama (en basit haliyle)
  function isTouchDevice() {
    return typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }

  return (
    <aside
      className={`bg-white shadow-md flex flex-col transition-all duration-200
        ${collapsed ? "w-16" : "w-64"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ minHeight: "100vh" }}
    >
      <div
        className={`h-20 flex items-center justify-center border-b cursor-pointer select-none
          transition-all duration-200 ${collapsed ? "justify-start px-2" : ""}`}
      >
        <span className={`font-bold text-xl tracking-tight transition-all duration-200 ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`}>
          Merchant Dashboard
        </span>
        <span className={`ml-1 text-lg ${collapsed ? "opacity-100" : "opacity-0 w-0"}`}>🧾</span>
      </div>
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-l-full transition-all duration-200
                    ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}
                    ${collapsed ? "justify-center px-2" : ""}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span
                  className={`transition-all duration-200
                    ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"}`
                  }
                >
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={`my-6 mx-auto border rounded-full w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition ${collapsed ? "" : "rotate-180"}`}
        title={collapsed ? "Menüyü aç" : "Menüyü daralt"}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </aside>
  );
}
