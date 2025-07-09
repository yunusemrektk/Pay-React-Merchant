import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  List,
  Layers,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import {
  categories as initialCategories,
  menu_items as initialMenu,
} from "../../../data/exampleData";

import CategoryList from "./CategoryList";
import MenuTable from "./MenuTable";
import AllMenuList from "./AllMenuList";
import CategoryModal from "../../Modals/CategoryModal";
import MenuModal from "../../Modals/MenuModal";
import ConfirmModal from "../../Modals/ConfirmModal";
import SuccessModal from "../../modals/SuccessModal";
import ErrorModal from "../../modals/ErrorModal";

import { uploadMenuItemImage } from "../../../services/menuItemService";

export function uniqId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export default function CategoryMenuSettings() {
  const [categories, setCategories] = useState([...initialCategories]);
  const [menu, setMenu] = useState([...initialMenu]);
  const [activeCatId, setActiveCatId] = useState(categories[0]?.id || null);

  const [catModal, setCatModal] = useState({
    open: false,
    edit: null,
    value: "",
  });
  const [showCatDel, setShowCatDel] = useState(null);

  const [menuModal, setMenuModal] = useState({
    open: false,
    edit: null,
    form: {
      name: "",
      description: "",
      price: "",
      image_file: null,
      image_path: "",
      category_id: "",
    },
  });
  const [showMenuDel, setShowMenuDel] = useState(null);
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: null, // "success" | "error"
    message: "",
    title: "",
  });

  // --- Category handlers ---
  function openCatModal(cat) {
    setCatModal({
      open: true,
      edit: cat || null,
      value: cat ? cat.label : "",
    });
  }

  function handleCatSave(e) {
    e.preventDefault();
    if (!catModal.value.trim()) return;

    if (catModal.edit) {
      setCategories((cats) =>
        cats.map((c) =>
          c.id === catModal.edit.id ? { ...c, label: catModal.value } : c
        )
      );
    } else {
      const newCat = {
        id: uniqId(),
        category_key: catModal.value.trim().toLowerCase().replace(/\s+/g, "-"),
        label: catModal.value.trim(),
        sort_order: categories.length + 1,
      };
      setCategories((cats) => [...cats, newCat]);
      setActiveCatId(newCat.id);
    }

    setCatModal({ open: false, edit: null, value: "" });
  }

  function handleDeleteCategory() {
    setCategories((cats) =>
      cats.filter((c) => c.id !== showCatDel.id)
    );
    setMenu((m) => m.filter((item) => item.category_id !== showCatDel.id));
    setShowCatDel(null);
    setActiveCatId((prev) =>
      categories.filter((c) => c.id !== showCatDel.id)[0]?.id || null
    );
  }

  // --- Menu handlers ---
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
        setModal({
          open: true,
          type: "error",
          message: "Resim yüklenemedi. Lütfen daha sonra tekrar deneyin.",
          title: "Yükleme Hatası",
        });
        setSaving(false);
        return;
      }
    }

    setMenu((items) =>
      menuModal.edit
        ? items.map((m) =>
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
    setMenuModal({
      open: false,
      edit: null,
      form: {
        name: "",
        description: "",
        price: "",
        image_file: null,
        image_path: "",
        category_id: "",
      },
    });

    setModal({
      open: true,
      type: "success",
      message: "Ürün başarıyla kaydedildi!",
      title: "Başarılı",
    });
  }

  function handleDeleteMenu() {
    setMenu((items) => items.filter((m) => m.id !== showMenuDel.id));
    setShowMenuDel(null);
  }

  function handleCategorySort(newCats) {
    setCategories(newCats);
  }

  function handleMenuSort(newMenu) {
    setMenu((old) =>
      old
        .filter((m) => m.category_id !== activeCatId)
        .concat(newMenu)
    );
  }

  const filteredMenu = menu.filter((m) => m.category_id === activeCatId);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {/* Left panel */}
      <div className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
        <div className="flex items-center justify-between mb-2 sticky top-0 z-10 bg-[#F7FAFC] pb-2">
          <h3 className="font-bold text-lg flex items-center">
            <List className="w-5 h-5 text-gray-600 mr-2" />
            Kategoriler
          </h3>
          <button
            onClick={() => openCatModal(null)}
            className="inline-flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
          >
            <Plus className="w-4 h-4 mr-1" /> Yeni
          </button>
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

      {/* Right panel */}
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 bg-[#F7FAFC] pb-2 mb-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center">
              <Layers className="w-5 h-5 text-gray-600 mr-2" />
              {categories.find((c) => c.id === activeCatId)?.label ||
                "Kategori"}{" "}
              Ürünleri
            </h3>
            <button
              onClick={() => openMenuModal({})}
              disabled={!activeCatId}
              className="inline-flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-1" /> Ürün Ekle
            </button>
          </div>

          <div className="hidden md:block mt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCatId}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -32 }}
                transition={{ duration: 0.1 }}
              >
                <MenuTable
                  menu={filteredMenu}
                  openMenuModal={openMenuModal}
                  setShowMenuDel={setShowMenuDel}
                  onSortMenu={handleMenuSort}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:block mt-8">
          <div className="flex items-center mb-4">
            <Eye className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Tüm Ürünler Önizlemesi
            </h2>
          </div>
          <AllMenuList
            categories={categories}
            menu={menu}
            activeCatId={activeCatId}
          />
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
          menuModal={menuModal}
          setMenuModal={setMenuModal}
          handleMenuSave={handleMenuSave}
          saving={saving}
          categories={categories}
          onClose={() =>
            setMenuModal({
              open: false,
              edit: null,
              form: {
                name: "",
                description: "",
                price: "",
                image_file: null,
                image_path: "",
                category_id: "",
              },
            })
          }
        />
      )}

      {showCatDel && (
        <ConfirmModal
          text={`"${showCatDel.label}" kategorisini silmek istiyor musunuz?`}
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
      
      {modal.open && modal.type === "success" && (
        <SuccessModal
          open
          onClose={() => setModal((m) => ({ ...m, open: false }))}
          icon={<CheckCircle className="text-green-500 w-6 h-6 mr-2" />}
          title={modal.title}
          message={modal.message}
        />
      )}
      {modal.open && modal.type === "error" && (
        <ErrorModal
          open
          onClose={() => setModal((m) => ({ ...m, open: false }))}
          icon={<AlertCircle className="text-red-500 w-6 h-6 mr-2" />}
          title={modal.title}
          message={modal.message}
        />
      )}
    </div>
  );
}
