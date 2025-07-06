import React, { useState } from "react";
import axios from "axios";

import { categories as initialCategories, menu_items as initialMenu } from "../../../data/exampleData";

import CategoryList from "./CategoryList";
import MenuTable from "./MenuTable";
import AllMenuList from "./AllMenuList";
import MenuModal from "../../Modals/MenuModal";
import CategoryModal from "../../Modals/CategoryModal";
import ConfirmModal from "../../Modals/ConfirmModal";

function uniqId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export default function CategoryMenuSettings() {
  const [categories, setCategories] = useState([...initialCategories]);
  const [menu, setMenu] = useState([...initialMenu]);
  const [activeCatId, setActiveCatId] = useState(categories[0]?.id || null);
  const activeMerchantId = "merc1"; // Dinamik yapabilirsin
  const [catModal, setCatModal] = useState({ open: false, edit: null, value: "" });
  const [showCatDel, setShowCatDel] = useState(null);
  const [menuModal, setMenuModal] = useState({
    open: false, edit: null,
    form: { name: "", description: "", price: "", image_file: null, image_path: "" }
  });
  const [showMenuDel, setShowMenuDel] = useState(null);
  const [saving, setSaving] = useState(false);
  const [moveMenuItem, setMoveMenuItem] = useState(null);

  // Kategori işlemleri
  function openCatModal(cat) {
    setCatModal({
      open: true,
      edit: cat || null,
      value: cat ? cat.label : ""
    });
  }
  function handleCatSave(e) {
    e.preventDefault();
    if (!catModal.value.trim()) return;
    if (catModal.edit) {
      setCategories(categories.map(cat =>
        cat.id === catModal.edit.id ? { ...cat, label: catModal.value } : cat
      ));
    } else {
      const newCat = {
        id: uniqId(),
        category_key: catModal.value.trim().toLowerCase().replace(/\s+/g, "-"),
        label: catModal.value.trim(),
        sort_order: categories.length + 1,
      };
      setCategories([...categories, newCat]);
      setActiveCatId(newCat.id);
    }
    setCatModal({ open: false, edit: null, value: "" });
  }
  function handleDeleteCategory() {
    setCategories(categories.filter(cat => cat.id !== showCatDel.id));
    setMenu(menu.filter(m => m.category_id !== showCatDel.id));
    setShowCatDel(null);
    setActiveCatId(categories.filter(cat => cat.id !== showCatDel.id)[0]?.id || null);
  }

  // Menü işlemleri
  function openMenuModal({ edit = null } = {}) {
    setMenuModal({
      open: true,
      edit,
      form: edit
        ? { name: edit.name, description: edit.description, price: edit.price, image_file: null, image_path: edit.image_path || "" }
        : { name: "", description: "", price: "", image_file: null, image_path: "" }
    });
  }

  async function handleMenuSave(e) {
    e.preventDefault();
    if (!menuModal.form.name.trim() || !activeCatId) return;
    setSaving(true);

    let imageUrl = menuModal.form.image_path;

    if (menuModal.form.image_file) {
      try {
        const formData = new FormData();
        formData.append('file', menuModal.form.image_file);
        formData.append('upload_preset', 'merchant-items');
        if (activeMerchantId) {
          formData.append('folder', activeMerchantId);
        }

        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dw5hdpb6v/image/upload',
          formData
        );
        imageUrl = res.data.secure_url;
      } catch (err) {
        alert("Resim yüklenemedi!");
        setSaving(false);
        return;
      }
    }

    if (menuModal.edit) {
      setMenu(menu.map(m =>
        m.id === menuModal.edit.id
          ? { ...m, ...menuModal.form, price: Number(menuModal.form.price), image_path: imageUrl }
          : m
      ));
    } else {
      setMenu([
        ...menu,
        {
          id: uniqId(),
          category_id: activeCatId,
          name: menuModal.form.name,
          description: menuModal.form.description,
          price: Number(menuModal.form.price),
          image_path: imageUrl,
          like_count: 0,
          created_at: new Date().toISOString().slice(0, 16).replace("T", " "),
        },
      ]);
    }

    setSaving(false);
    setMenuModal({ open: false, edit: null, form: { name: "", description: "", price: "", image_file: null, image_path: "" } });
  }

  function handleDeleteMenu() {
    setMenu(menu.filter(m => m.id !== showMenuDel.id));
    setShowMenuDel(null);
  }

  function handleCategorySort(newCategories) {
    setCategories(newCategories);
  }

  // Aktif kategorinin menüleri
  const filteredMenu = menu.filter(m => m.category_id === activeCatId);

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-8 w-full">
      {/* Sol Panel */}
      <div className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
        <div className="flex items-center justify-between mb-2 sticky top-0 z-10 bg-[#F7FAFC] pb-2">
          <h3 className="font-bold text-lg">Kategoriler</h3>
          <button onClick={() => openCatModal(null)} className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm">+ Yeni</button>
        </div>
        <CategoryList
          categories={categories}
          activeCatId={activeCatId}
          setActiveCatId={setActiveCatId}
          openCatModal={openCatModal}
          setShowCatDel={setShowCatDel}
          onSort={handleCategorySort}
        />
      </div>

      {/* Sağ Panel */}
      <div className="flex-1 flex flex-col">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
            <h3 className="font-bold text-lg">
              {categories.find(c => c.id === activeCatId)?.label || "Kategori"} Ürünleri
            </h3>
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
              onClick={() => openMenuModal({})}
              disabled={!activeCatId}
            >
              + Ürün Ekle
            </button>
          </div>

          {/* --- Responsive MenuTable --- */}
          <div className="block md:hidden">
            {/* Mobil görünüm için kartlar */}
            {filteredMenu.length === 0 ? (
              <div className="text-center text-gray-400 p-4">Bu kategoride ürün yok.</div>
            ) : (
              <div className="space-y-2">
                {filteredMenu.map(item => (
                  <div key={item.id} className="border rounded-lg p-3 flex flex-col bg-white">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{item.name}</span>
                      <div className="flex gap-2">
                        <button onClick={() => openMenuModal({ edit: item })} title="Düzenle">✏️</button>
                        <button onClick={() => setShowMenuDel(item)} title="Sil">🗑️</button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">{item.description}</div>
                    <div className="text-sm mt-1 font-mono">{parseFloat(item.price).toFixed(2)} ₺</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="hidden md:block">
            {/* Masaüstü için tablo görünümü */}
            <MenuTable
              menu={filteredMenu}
              categories={categories}
              openMenuModal={openMenuModal}
              setShowMenuDel={setShowMenuDel}
              setMoveMenuItem={setMoveMenuItem}
            />
          </div>
        </div>

        {/* AllMenuList mobilde gizli, masaüstünde göster */}
        <div className="hidden md:block mt-8">
          <AllMenuList categories={categories} menu={menu} />
        </div>
      </div>

      {/* Modals */}
      {catModal.open && (
        <CategoryModal
          onClose={() => setCatModal({ open: false, edit: null, value: "" })}
          catModal={catModal}
          setCatModal={setCatModal}
          handleCatSave={handleCatSave}
        />
      )}
      {menuModal.open && (
        <MenuModal
          onClose={() => setMenuModal({ open: false, edit: null, form: { name: "", description: "", price: "", image_file: null, image_path: "" } })}
          menuModal={menuModal}
          setMenuModal={setMenuModal}
          handleMenuSave={handleMenuSave}
          saving={saving}
        />
      )}
      {showCatDel && (
        <ConfirmModal
          text={`"${showCatDel.label}" kategorisini ve bağlı ürünleri silmek istiyor musunuz?`}
          onCancel={() => setShowCatDel(null)}
          onConfirm={handleDeleteCategory}
        />
      )}
      {showMenuDel && (
        <ConfirmModal
          text={`"${showMenuDel.name}" ürününü silmek istiyor musunuz?`}
          onCancel={() => setShowMenuDel(null)}
          onConfirm={handleDeleteMenu}
        />
      )}
      {moveMenuItem && (
        <Modal onClose={() => setMoveMenuItem(null)}>
          {/* ... Modal içeriği burada */}
        </Modal>
      )}
    </div>
  );
}
