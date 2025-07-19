import React, { useState } from "react";
import { Plus, List, Layers, Save as SaveIcon, CheckCircle, AlertCircle } from "lucide-react";
import {
  categories as initialCategories,
  menu_items as initialMenu,
} from "../../../data/exampleData";

import CategoryList from "./CategoryList";
import MenuTable from "./MenuTable";
import AllMenuList from "./AllMenuList";
import CategoryModal from "../../Modals/CategoryModal";
import ConfirmModal from "../../Modals/ConfirmModal";
import SuccessModal from "../../modals/SuccessModal";
import ErrorModal from "../../modals/ErrorModal";

import { uploadMenuItemImage } from "../../../services/menuItemService";
import { uniqId } from "../../../util/MenuItemUtil";
import { useCategories } from "../../../hooks/useCategories";
import MenuTableMobile from "./MenuTableMobile";
import MenuModal from "../../modals/MenuModal";

export default function CategoryMenuSettings() {

  const {
    categories,
    addCategory,
    editCategory,
    deleteCategory,
    sortCategories,
  } = useCategories(initialCategories);

  // --- State ---
  const [menu, setMenu] = useState([...initialMenu]);
  const [activeCatId, setActiveCatId] = useState(categories[0]?.id || null);

  // “Dirty” flags
  const [isCatOrderDirty, setIsCatOrderDirty] = useState(false);
  const [isMenuOrderDirty, setIsMenuOrderDirty] = useState(false);

  // Modals & others
  const [catModal, setCatModal] = useState({ open: false, edit: null, value: "" });
  const [showCatDel, setShowCatDel] = useState(null);
  const [menuModal, setMenuModal] = useState({
    open: false,
    edit: null,
    form: { name: "", description: "", price: "", image_file: null, image_path: "", category_id: "" },
  });
  const [showMenuDel, setShowMenuDel] = useState(null);
  const [saving, setSaving] = useState(false);
  const [modal, setModal] = useState({ open: false, type: null, title: "", message: "" });

  // --- Category Handlers ---
  function openCatModal(cat) {
    setCatModal({
      open: true,
      edit: cat || null,
      value: cat ? cat.label : "",
    });
  }


  function handleDeleteCategory() {
    deleteCategory(showCatDel.id);
    setShowCatDel(null);
    setActiveCatId(categories[0]?.id || null);
  }

  function handleCategorySort(newCats) {
    sortCategories(newCats);
    setIsCatOrderDirty(true);
  }

  function handleCatSave(e) {
    e.preventDefault();
      console.log("handleCatSave")
    if (!catModal.value.trim()) return;
    if (catModal.edit) {
      editCategory(catModal.edit.id, catModal.value);
    } else {
      console.log("handleCatSave new cat",)
      const newId = addCategory(catModal.value);
      setActiveCatId(newId);
    }
    setCatModal({ open: false, edit: null, value: "" });
  }

  function openMenuModal({ edit = null } = {}) {
    setMenuModal({
      open: true,
      edit,
      form: edit
        ? {
          name: edit.name,
          description: edit.description,
          price: edit.price,
          image_file: null,
          image_path: edit.image_path || "",
          category_id: edit.category_id,
        }
        : {
          name: "",
          description: "",
          price: "",
          image_file: null,
          image_path: "",
          category_id: activeCatId,
        },
    });
  }

  async function handleMenuSave(e) {
    e.preventDefault();
    if (!menuModal.form.name.trim() || !menuModal.form.category_id) return;
    setSaving(true);

    let imageUrl = menuModal.form.image_path;
    const newItemId = menuModal.edit ? menuModal.edit.id : uniqId();
    if (menuModal.form.image_file) {
      try {
        imageUrl = await uploadMenuItemImage({
          file: menuModal.form.image_file,
          merchantId: "merc1",
          type: "menu_item",
          itemId: newItemId,
        });
      } catch {
        setModal({ open: true, type: "error", title: "Yükleme Hatası", message: "Resim yüklenemedi." });
        setSaving(false);
        return;
      }
    }

    setMenu(items =>
      menuModal.edit
        ? items.map(m =>
          m.id === menuModal.edit.id
            ? {
              ...m,
              ...menuModal.form,
              price: Number(menuModal.form.price),
              image: imageUrl,
              category_id: Number(menuModal.form.category_id),
            }
            : m
        )
        : [
          ...items,
          {
            id: newItemId,
            category_id: Number(menuModal.form.category_id),
            name: menuModal.form.name,
            description: menuModal.form.description,
            price: Number(menuModal.form.price),
            image: imageUrl,
            like_count: 0,
            created_at: new Date().toISOString().slice(0, 16).replace("T", " "),
          },
        ]
    );
    if (menuModal.form.category_id !== activeCatId) {
      setActiveCatId(Number(menuModal.form.category_id));
    }
    setSaving(false);
    setMenuModal({ open: false, edit: null, form: { name: "", description: "", price: "", image_file: null, image_path: "", category_id: "" } });
    setModal({ open: true, type: "success", title: "Başarılı", message: "Ürün kaydedildi!" });
  }

  function handleDeleteMenu() {
    setMenu(items => items.filter(m => m.id !== showMenuDel.id));
    setShowMenuDel(null);
  }

  function handleMenuSort(newMenu) {
    setMenu(old => [...old.filter(x => x.category_id !== activeCatId), ...newMenu]);
    setIsMenuOrderDirty(true);
  }

  async function handleSaveCatOrder() {
    try {
      await fetch("/api/category/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categories.map(c => c.id)),
      });
      setIsCatOrderDirty(false);
      setModal({ open: true, type: "success", title: "Kaydedildi", message: "Kategori sıralaması kaydedildi." });
    } catch {
      setModal({ open: true, type: "error", title: "Hata", message: "Kategori sıralaması kaydedilemedi." });
    }
  }

  async function handleSaveMenuOrder() {
    try {
      await fetch("/api/menu/save-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menu.map(m => m.id)),
      });
      setIsMenuOrderDirty(false);
      setModal({ open: true, type: "success", title: "Kaydedildi", message: "Ürün sıralaması kaydedildi." });
    } catch {
      setModal({ open: true, type: "error", title: "Hata", message: "Ürün sıralaması kaydedilemedi." });
    }
  }

  const filteredMenu = menu.filter(m => m.category_id === activeCatId);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Left: Kategori */}
      <div className="w-full md:w-64 mb-4 md:mb-0">
        <div className="bg-[#F7FAFC] z-10 p-2 flex items-center justify-between mb-2">
          <h3 className="flex items-center font-bold"><List className="w-5 h-5 mr-2" /> Kategoriler</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => openCatModal()}
              disabled={!activeCatId}
              className="inline-flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
            {isCatOrderDirty && <button
              onClick={handleSaveCatOrder}
              className="inline-flex items-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
            >
              <SaveIcon className="w-4 h-4" />
            </button>}
          </div>
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

      {/* Right: Ürün */}
      <div className="flex-1 flex flex-col">
        <div className="bg-[#F7FAFC] z-10 p-2 flex items-center justify-between mb-2">
          <h3 className="flex items-center font-bold"><Layers className="w-5 h-5 mr-2" /> {categories.find(c => c.id === activeCatId)?.label || "Kategori"} Ürünleri</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => openMenuModal({})}
              disabled={!activeCatId}
              className="inline-flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
            {isMenuOrderDirty && <button
              onClick={handleSaveMenuOrder}
              className="inline-flex items-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
            >
              <SaveIcon className="w-4 h-4" />
            </button>}

          </div>
        </div>

        {/* Masaüstü tablo */}
        <div className="hidden md:block mt-2">
          <MenuTable
            menu={filteredMenu}
            openMenuModal={openMenuModal}
            setShowMenuDel={setShowMenuDel}
            onSortMenu={handleMenuSort}
          />
        </div>
        
        <div className="block md:hidden mt-2">
          <MenuTableMobile
            menu={filteredMenu}
            openMenuModal={openMenuModal}
            setShowMenuDel={setShowMenuDel}
            onSortMenu={handleMenuSort}
          />
        </div>

        <div className="mt-8">
          <AllMenuList categories={categories} menu={menu} activeCatId={activeCatId} />
        </div>
      </div>

      {/* Modals & Notifications */}
      {catModal.open && <CategoryModal onClose={() => setCatModal({ open: false, edit: null, value: "" })} catModal={catModal} setCatModal={setCatModal} handleCatSave={handleCatSave} />}
      {showCatDel && <ConfirmModal text={`"${showCatDel.label}" silinsin mi?`} onCancel={() => setShowCatDel(null)} onConfirm={handleDeleteCategory} />}
      {menuModal.open && <MenuModal menuModal={menuModal} setMenuModal={setMenuModal} handleMenuSave={handleMenuSave} saving={saving} categories={categories} onClose={() => setMenuModal({ open: false, edit: null, form: { name: "", description: "", price: "", image_file: null, image_path: "", category_id: "" } })} />}
      {showMenuDel && <ConfirmModal text={`"${showMenuDel.name}" silinsin mi?`} onCancel={() => setShowMenuDel(null)} onConfirm={handleDeleteMenu} />}
      {modal.open && modal.type === "success" && <SuccessModal open onClose={() => setModal(m => ({ ...m, open: false }))} title={modal.title} message={modal.message} icon={<CheckCircle className="text-green-500 w-6 h-6 mr-2" />} />}
      {modal.open && modal.type === "error" && <ErrorModal open onClose={() => setModal(m => ({ ...m, open: false }))} title={modal.title} message={modal.message} icon={<AlertCircle className="text-red-500 w-6 h-6 mr-2" />} />}
    </div>
  );
}
