import React, { useState } from "react";
import { categories as initialCategories, menu_items as initialMenu } from "../data/exampleData";

function uniqId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// SVG Icon helpers
const EditIcon = () => (
    <svg className="w-5 h-5 inline text-blue-500 hover:text-blue-700 cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L5 11.828a2 2 0 010-2.828L7.828 5.232a2 2 0 012.828 0z" />
    </svg>
);

const DeleteIcon = () => (
    <svg className="w-5 h-5 inline text-red-500 hover:text-red-700 cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H7V5a2 2 0 012-2zM4 7h16" />
    </svg>
);

const SwapIcon = () => (
    <svg className="w-5 h-5 inline text-gray-500 hover:text-blue-700 cursor-pointer" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

export default function CategoryMenuSettings() {
    const [categories, setCategories] = useState([...initialCategories]);
    const [menu, setMenu] = useState([...initialMenu]);
    const [activeCatId, setActiveCatId] = useState(categories[0]?.id || null);

    // Modal State
    const [catModal, setCatModal] = useState({ open: false, edit: null, value: "" });
    const [showCatDel, setShowCatDel] = useState(null);

    const [menuModal, setMenuModal] = useState({ open: false, tab: 0, edit: null, form: { name: "", description: "", price: "" } });
    const [showMenuDel, setShowMenuDel] = useState(null);

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
                merchant_id: "merc1",
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
    function openMenuModal({ tab = 0, edit = null } = {}) {
        setMenuModal({
            open: true,
            tab,
            edit,
            form: edit
                ? { name: edit.name, description: edit.description, price: edit.price }
                : { name: "", description: "", price: "" }
        });
    }
    function handleMenuSave(e) {
        e.preventDefault();
        if (!menuModal.form.name.trim() || !activeCatId) return;
        if (menuModal.edit) {
            setMenu(menu.map(m =>
                m.id === menuModal.edit.id
                    ? { ...m, ...menuModal.form, price: Number(menuModal.form.price) }
                    : m
            ));
        } else {
            setMenu([
                ...menu,
                {
                    id: uniqId(),
                    merchant_id: "merc1",
                    category_id: activeCatId,
                    name: menuModal.form.name,
                    description: menuModal.form.description,
                    price: Number(menuModal.form.price),
                    image_path: "",
                    like_count: 0,
                    created_at: new Date().toISOString().slice(0, 16).replace("T", " "),
                },
            ]);
        }
        setMenuModal({ open: false, tab: 0, edit: null, form: { name: "", description: "", price: "" } });
    }
    function handleDeleteMenu() {
        setMenu(menu.filter(m => m.id !== showMenuDel.id));
        setShowMenuDel(null);
    }

    // Kategori değiştir modalı için
    const [moveMenuItem, setMoveMenuItem] = useState(null);
    function handleMoveMenuCategory(menuItemId, newCatId) {
        setMenu(menu.map(m => m.id === menuItemId ? { ...m, category_id: newCatId } : m));
        setMoveMenuItem(null);
    }

    // "Var olan ürünü bu kategoriye ata" için
    function handleAssignExistingMenu(menuId) {
        setMenu(menu.map(m =>
            m.id === menuId ? { ...m, category_id: activeCatId } : m
        ));
        setMenuModal({ ...menuModal, open: false, tab: 0, edit: null });
    }

    // Aktif kategorinin menüleri
    const filteredMenu = menu.filter(m => m.category_id === activeCatId);
    // Diğer kategorilere ait ürünler (atama için)
    const unassignedMenu = menu.filter(m => m.category_id !== activeCatId);

    return (
        <div className="flex gap-8">
            {/* Sidebar - Kategoriler */}
            <div className="w-64">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">Kategoriler</h3>
                    <button
                        onClick={() => openCatModal(null)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >+ Yeni</button>
                </div>
                <ul className="space-y-2">
                    {categories.map(cat => (
                        <li
                            key={cat.id}
                            className={`flex items-center justify-between px-3 py-2 rounded cursor-pointer border transition
                ${activeCatId === cat.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
                            onClick={() => setActiveCatId(cat.id)}
                        >
                            <span className="truncate">{cat.label}</span>
                            <div className="flex items-center gap-1 ml-2">
                                <span onClick={e => { e.stopPropagation(); openCatModal(cat); }}>
                                    <EditIcon />
                                </span>
                                <span onClick={e => { e.stopPropagation(); setShowCatDel(cat); }}>
                                    <DeleteIcon />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sağ Panel */}
            <div className="flex-1 flex flex-col">
                {/* Ürün yönetimi ve işlemler */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg">
                            {categories.find(c => c.id === activeCatId)?.label || "Kategori"} Ürünleri
                        </h3>
                        <button
                            className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                            onClick={() => openMenuModal({ tab: 0 })}
                            disabled={!activeCatId}
                        >
                            + Ürün Ekle
                        </button>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 min-h-[240px]">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="py-2 text-left">Ürün</th>
                                    <th className="py-2 text-left">Açıklama</th>
                                    <th className="py-2 text-center">Fiyat</th>
                                    <th className="py-2 text-center">İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMenu.map(item => (
                                    <tr key={item.id} className="border-b last:border-none">
                                        <td className="py-2">{item.name}</td>
                                        <td className="py-2">{item.description}</td>
                                        <td className="py-2 text-center">{parseFloat(item.price).toFixed(2)} ₺</td>
                                        <td className="py-2 text-center flex items-center justify-center gap-2">
                                            <span onClick={() => openMenuModal({ tab: 0, edit: item })}>
                                                <EditIcon />
                                            </span>
                                            <span onClick={() => setShowMenuDel(item)}>
                                                <DeleteIcon />
                                            </span>
                                            <span title="Kategori değiştir" onClick={() => setMoveMenuItem(item)}>
                                                <SwapIcon />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredMenu.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-3 text-center text-gray-400">
                                            Bu kategoride ürün yok.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* "Var olan ürünü ata" */}
                    <div className="mt-4">
                        <button
                            className="bg-gray-100 px-4 py-2 rounded hover:bg-blue-50 text-blue-600"
                            onClick={() => openMenuModal({ tab: 1 })}
                            disabled={unassignedMenu.length === 0}
                        >
                            {unassignedMenu.length > 0 ? "Mevcut Ürünü Ata" : "Atanabilir ürün yok"}
                        </button>
                    </div>
                </div>

                {/* Menü List */}
                <div className="mt-8">
                    <div className="bg-blue-50 rounded-xl shadow-md p-6 max-h-72 overflow-y-auto">
                        <div className="flex items-center mb-4">
                            <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                            </svg>
                            <span className="text-blue-700 font-semibold">Tüm Ürünler</span>
                            <span className="ml-3 text-xs text-gray-500">Buradaki alan yalnızca görüntüleme içindir, işlem yapılamaz.</span>
                        </div>
                        <div className="space-y-6">
                            {categories.map(cat => {
                                const catProducts = menu.filter(m => m.category_id === cat.id);
                                return (
                                    <div key={cat.id} className="pb-4 border-b last:border-none">
                                        <div className="font-bold text-blue-700 mb-2">{cat.label}</div>
                                        {catProducts.length === 0 ? (
                                            <div className="text-gray-400 italic mb-2">Bu kategoride ürün yok.</div>
                                        ) : (
                                            <ul className="space-y-1">
                                                {catProducts.map(prod => (
                                                    <li
                                                        key={prod.id}
                                                        className="grid grid-cols-3 gap-4 items-center px-3 py-1 rounded hover:bg-blue-100"
                                                    >
                                                        <span className="font-medium">{prod.name}</span>
                                                        <span className="text-gray-500 text-xs">{prod.description}</span>
                                                        <span className="text-sm font-mono text-gray-800 justify-self-end">{parseFloat(prod.price).toFixed(2)} ₺</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODALLAR --- */}
            {catModal.open && (
                <Modal onClose={() => setCatModal({ open: false, edit: null, value: "" })}>
                    <form onSubmit={handleCatSave} className="flex flex-col gap-4">
                        <h4 className="font-semibold text-lg">
                            {catModal.edit ? "Kategoriyi Düzenle" : "Yeni Kategori"}
                        </h4>
                        <input
                            className="border rounded p-2"
                            value={catModal.value}
                            autoFocus
                            onChange={e => setCatModal({ ...catModal, value: e.target.value })}
                            placeholder="Kategori adı"
                            required
                        />
                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => setCatModal({ open: false, edit: null, value: "" })} className="px-4 py-2 rounded bg-gray-100">
                                Vazgeç
                            </button>
                            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                                Kaydet
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {menuModal.open && (
                <Modal onClose={() => setMenuModal({ open: false, tab: 0, edit: null, form: { name: "", description: "", price: "" } })}>
                    <div>
                        <div className="flex mb-4 border-b">
                            <button
                                className={`px-4 py-2 ${menuModal.tab === 0 ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                                onClick={() => setMenuModal({ ...menuModal, tab: 0 })}
                            >
                                Yeni Ürün
                            </button>
                            <button
                                className={`px-4 py-2 ${menuModal.tab === 1 ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                                onClick={() => setMenuModal({ ...menuModal, tab: 1 })}
                            >
                                Var Olanı Ata
                            </button>
                        </div>
                        {menuModal.tab === 0 && (
                            <form onSubmit={handleMenuSave} className="flex flex-col gap-4">
                                <input
                                    className="border rounded p-2"
                                    value={menuModal.form.name}
                                    autoFocus
                                    onChange={e => setMenuModal({ ...menuModal, form: { ...menuModal.form, name: e.target.value } })}
                                    placeholder="Ürün adı"
                                    required
                                />
                                <input
                                    className="border rounded p-2"
                                    value={menuModal.form.description}
                                    onChange={e => setMenuModal({ ...menuModal, form: { ...menuModal.form, description: e.target.value } })}
                                    placeholder="Açıklama"
                                />
                                <input
                                    className="border rounded p-2"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    style={{ MozAppearance: "textfield" }}
                                    value={menuModal.form.price}
                                    onWheel={e => e.target.blur()}
                                    onChange={e => setMenuModal({ ...menuModal, form: { ...menuModal.form, price: e.target.value } })}
                                    placeholder="Fiyat (₺)"
                                    required
                                    inputMode="decimal"
                                />
                                <div className="flex gap-2 justify-end">
                                    <button type="button" onClick={() => setMenuModal({ open: false, tab: 0, edit: null, form: { name: "", description: "", price: "" } })} className="px-4 py-2 rounded bg-gray-100">
                                        Vazgeç
                                    </button>
                                    <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                                        Kaydet
                                    </button>
                                </div>
                            </form>
                        )}
                        {menuModal.tab === 1 && (
                            <div>
                                {unassignedMenu.length === 0 && (
                                    <div className="text-gray-400 text-center py-6">
                                        Atanabilecek başka ürün yok.
                                    </div>
                                )}
                                <ul className="space-y-2">
                                    {unassignedMenu.map(item => (
                                        <li key={item.id} className="flex items-center justify-between border rounded px-3 py-2">
                                            <span>{item.name} <span className="text-gray-400 ml-1">({categories.find(c => c.id === item.category_id)?.label})</span></span>
                                            <button
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                                onClick={() => handleAssignExistingMenu(item.id)}
                                            >
                                                Ata
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Modal>
            )}

            {moveMenuItem && (
                <Modal onClose={() => setMoveMenuItem(null)}>
                    <div>
                        <h4 className="font-semibold mb-3">Ürünü Farklı Kategoriye Taşı</h4>
                        <div className="mb-4 text-gray-700">{moveMenuItem.name} ({categories.find(c => c.id === moveMenuItem.category_id)?.label})</div>
                        <select
                            className="border rounded p-2 w-full mb-4"
                            value={moveMenuItem.category_id}
                            onChange={e => handleMoveMenuCategory(moveMenuItem.id, Number(e.target.value))}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                            ))}
                        </select>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 rounded bg-gray-100"
                                onClick={() => setMoveMenuItem(null)}
                            >Vazgeç</button>
                        </div>
                    </div>
                </Modal>
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
        </div>
    );
}

// Temel Modal
function Modal({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                    onClick={onClose}
                >×</button>
                {children}
            </div>
        </div>
    );
}

function ConfirmModal({ text, onCancel, onConfirm }) {
    return (
        <Modal onClose={onCancel}>
            <div className="mb-5 text-center">{text}</div>
            <div className="flex gap-4 justify-center">
                <button
                    onClick={onConfirm}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                >Evet, Sil</button>
                <button
                    onClick={onCancel}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >Vazgeç</button>
            </div>
        </Modal>
    );
}
