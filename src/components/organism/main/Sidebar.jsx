import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Box,
  Table,
  Settings as SettingsIcon,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { path: "/orders", label: "Siparişler", Icon: Box },
  { path: "/tables", label: "Masalar", Icon: Table },
  { path: "/settings", label: "İşyeri Ayarları", Icon: SettingsIcon },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  function isTouchDevice() {
    return (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    );
  }

  const handleMouseEnter = () => {
    if (!isTouchDevice()) setCollapsed(false);
  };
  const handleMouseLeave = () => {
    if (!isTouchDevice()) setCollapsed(true);
  };
  const handleNavClick = () => setCollapsed(true);

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        bg-white shadow-md flex flex-col
        transition-width duration-200 overflow-hidden
        ${collapsed ? "w-16" : "w-64"}
      `}
      style={{ minHeight: "100vh" }}
    >
      {/* Logo/Header */}
      <div
        className={`
          h-20 flex items-center border-b
          transition-all duration-200
          ${collapsed ? "justify-center" : "justify-between px-4"}
        `}
      >
        <div className="flex items-center">
          <LayoutDashboard
            className={`
              text-blue-600 transition-transform duration-200
              ${collapsed ? "w-6 h-6" : "w-8 h-8 mr-2"}
            `}
          />
          {!collapsed && (
            <span className="font-bold text-xl tracking-tight text-gray-800">
              Merchant
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {navItems.map(({ path, label, Icon }) => (
            <li key={path}>
              <NavLink
                to={path}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `
                    flex items-center transition-colors duration-200
                    rounded-l-full px-2 py-3
                    ${isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"}
                  `
                }
              >
                {/* Sabit genişlikli ikon konteynerı */}
                <div className="flex-shrink-0 w-10 flex justify-center">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Yalnızca expanded halde görünen label */}
                {!collapsed && (
                  <span className="ml-2 whitespace-nowrap">{label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className={`
          mb-6 mx-auto p-2 rounded-full bg-gray-100 hover:bg-gray-200
          transition-transform duration-200
          ${collapsed ? "" : "rotate-180"}
        `}
        title={collapsed ? "Menüyü aç" : "Menüyü daralt"}
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        )}
      </button>
    </aside>
  );
}
