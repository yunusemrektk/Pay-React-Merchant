import React, { useState } from "react";
import CategoryMenuSettings from "./CategoryMenuSettings";
import MerchantInfoSettings from "./MerchantInfoSettings";

const tabs = [
  { key: "categories", label: "Kategori & Menü" },
  { key: "merchant", label: "İşyeri Bilgisi" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div>
      <div className="flex mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "categories" && <CategoryMenuSettings />}
        {activeTab === "merchant" && <MerchantInfoSettings />}
      </div>
    </div>
  );
}
