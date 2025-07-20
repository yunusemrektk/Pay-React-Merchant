import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  XCircle,
  Tag,
  Edit3,
  FileText,
  CreditCard,
  Image as ImageIcon,
  Save,
} from "lucide-react";
import CloudinaryUpload from "../molecules/CloudinaryUpload";
import { CloseButton } from "../atom/CloseButton";
import CategorySelect from "../atom/CategorySelect";
import LoadingModal from "./LoadingModal";

export default function MenuModal({
  onClose,
  menuModal,
  setMenuModal,
  handleMenuSave,
  saving,
  categories,
}) {
  const nameRef = useRef(null);

  // prevent background scroll without layout shift
  useEffect(() => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (menuModal.open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuModal.open]);

  const baseInputClass =
    "w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2";
  const editBg = menuModal.edit
    ? "bg-blue-50 border-blue-300 ring-blue-300"
    : "bg-white border-gray-300 ring-blue-200";

  const onChange = (field) => (e) => {
    const value = field === "image_file" ? e : e.target.value;
    setMenuModal({
      ...menuModal,
      form: { ...menuModal.form, [field]: value },
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start sm:items-center justify-center bg-black/50 p-4">
      {saving && <LoadingModal open={true} description="Banner upload ediliyor..." />}

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="
          relative
          bg-white rounded-2xl shadow-xl overflow-hidden
          w-full max-w-sm
          sm:max-w-md
        "
      >
        {/* Scrollable içerik */}
        <div className="p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          {/* Close */}
          <CloseButton
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          />

          {/* Header */}
          <h3 className="flex items-center justify-center text-xl font-semibold text-gray-800 mb-6 gap-2">
            {menuModal.edit ? (
              <>
                <Edit3 className="w-5 h-5 text-blue-600" /> Ürünü Düzenle
              </>
            ) : (
              <>
                <Tag className="w-5 h-5 text-green-600" /> Yeni Ürün
              </>
            )}
          </h3>

          <form onSubmit={handleMenuSave} className="space-y-5">
            {/* Category */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-1 ${menuModal.edit ? "text-blue-700" : "text-gray-700"
                  }`}
              >
                <Tag className="w-4 h-4 mr-1 text-gray-600" /> Kategori
              </label>
              <CategorySelect
                categories={categories}
                value={menuModal.form.category_id}
                onChange={(val) =>
                  setMenuModal({
                    ...menuModal,
                    form: { ...menuModal.form, category_id: val },
                  })
                }
                className={`border rounded-lg ${menuModal.edit
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-300"
                  }`}
              />
            </div>

            {/* Name */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-1 ${menuModal.edit ? "text-blue-700" : "text-gray-700"
                  }`}
              >
                <Edit3 className="w-4 h-4 mr-1 text-gray-600" /> Ürün Adı
              </label>
              <input
                ref={nameRef}
                type="text"
                className={`${baseInputClass} border ${editBg}`}
                placeholder="Ürün adı"
                value={menuModal.form.name}
                onChange={onChange("name")}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-1 ${menuModal.edit ? "text-blue-700" : "text-gray-700"
                  }`}
              >
                <FileText className="w-4 h-4 mr-1 text-gray-600" /> Açıklama
              </label>
              <textarea
                className={`${baseInputClass} border ${editBg} resize-none`}
                rows={3}
                maxLength={300}
                placeholder="Açıklama"
                value={menuModal.form.description}
                onChange={onChange("description")}
              />
              <p className="text-xs text-gray-400 mt-1">
                {menuModal.form.description.length}/300
              </p>
            </div>

            {/* Price */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-1 ${menuModal.edit ? "text-blue-700" : "text-gray-700"
                  }`}
              >
                <CreditCard className="w-4 h-4 mr-1 text-gray-600" /> Fiyat (₺)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  className={`${baseInputClass} border ${editBg} pr-10`}
                  placeholder="0.00"
                  value={menuModal.form.price}
                  onWheel={(e) => e.target.blur()}
                  onChange={onChange("price")}
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">
                  ₺
                </span>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label
                className={`flex items-center text-sm font-medium mb-1 ${menuModal.edit ? "text-blue-700" : "text-gray-700"
                  }`}
              >
                <ImageIcon className="w-4 h-4 mr-1 text-gray-600" /> Ürün
                Resmi
              </label>
              <CloudinaryUpload
                file={menuModal.form.image_file}
                initialUrl={menuModal.form.image_path}
                onFileSelect={(file) => onChange("image_file")(file)}
                className={`w-full border-dashed border-2 rounded-lg p-4 ${menuModal.edit
                    ? "bg-blue-50 border-blue-300"
                    : "bg-white border-gray-300"
                  }`}
              />
              <p className="text-xs text-gray-400 mt-1">
                PNG/JPG, maks. 2 MB
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                <XCircle className="w-5 h-5" /> Vazgeç
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />{" "}
                {saving ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
