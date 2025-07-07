import { Outlet, NavLink } from "react-router-dom";

export default function SettingsLayout() {
  return (
    <div>
      <div className="flex mb-6 border-b">
        <NavLink
          to="categories"
          className={({ isActive }) =>
            `px-6 py-3 font-semibold transition ${
              isActive
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`
          }
        >
          Kategori & Menü
        </NavLink>
        <NavLink
          to="merchant"
          className={({ isActive }) =>
            `px-6 py-3 font-semibold transition ${
              isActive
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`
          }
        >
          İşyeri Bilgisi
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}
