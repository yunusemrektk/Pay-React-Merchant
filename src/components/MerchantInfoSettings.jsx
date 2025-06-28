import React, { useState } from "react";
import { merchants } from "../data/exampleData";

export default function MerchantInfoSettings() {
  const [info, setInfo] = useState(merchants[0]);

  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("İşyeri bilgileri güncellendi! (Demo: sadece ekranda değişir)");
  }

  return (
    <div className="max-w-lg">
      <h3 className="text-xl font-semibold mb-4">İşyeri Bilgisi</h3>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">İşyeri Adı</label>
          <input
            className="border rounded p-2 w-full"
            name="name"
            value={info.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Adres</label>
          <input
            className="border rounded p-2 w-full"
            name="address"
            value={info.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2">
          Kaydet
        </button>
      </form>
    </div>
  );
}
