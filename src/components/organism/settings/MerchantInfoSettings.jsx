import React, { useState } from "react";
import { Store, MapPin, ImageIcon, Save } from "lucide-react";
import { merchants } from "../../../data/exampleData";
import SuccessModal from "../../modals/SuccessModal";
import ErrorModal from "../../modals/ErrorModal";
import CloudinaryUpload from "../../molecules/CloudinaryUpload";
import { uploadMerchantBanner } from "../../../services/merchantService";

export default function MerchantInfoSettings() {
  const [info, setInfo] = useState(merchants[0]);
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: null, // "success" | "error"
    message: "",
    title: "",
  });

  function handleChange(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    let uploadedUrl = info.image_path;
    const isFile = info.image_file instanceof File;

    if (isFile) {
      try {
        uploadedUrl = await uploadMerchantBanner({
          file: info.image_file,
          merchantId: info.id || "merchant",
        });
      } catch (err) {
        setModal({
          open: true,
          type: "error",
          message: "Banner yüklenemedi. Lütfen daha sonra tekrar deneyin.",
          title: "Yükleme Hatası",
        });
        setSaving(false);
        return;
      }
    }

    setInfo({ ...info, image_path: uploadedUrl });

    setModal({
      open: true,
      type: "success",
      message: "Bilgileriniz başarıyla güncellendi!",
      title: "Başarılı",
    });
    setSaving(false);
  }

  function closeModal() {
    setModal((prev) => ({ ...prev, open: false }));
  }

  return (
    <div className="max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
        <Store className="w-6 h-6 text-blue-600 mr-2" />
        İş Yeri Bilgisi
      </h3>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6"
      >
        {/* Image section */}
        <div className="flex flex-col">
          <label className="flex items-center text-sm font-medium mb-2 text-gray-700">
            <ImageIcon className="w-5 h-5 text-gray-500 mr-2" />
            Logo / Fotoğraf
          </label>
          <CloudinaryUpload
            file={info.image_file}
            initialUrl={info.image_path}
            onFileSelect={(file) =>
              setInfo({ ...info, image_file: file })
            }
          />
        </div>

        {/* İşyeri adı */}
        <div className="flex flex-col">
          <label className="flex items-center text-sm font-medium mb-2 text-gray-700">
            <Store className="w-5 h-5 text-gray-500 mr-2" />
            İşyeri Adı
          </label>
          <input
            name="name"
            value={info.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Örneğin: Cafe Istanbul"
          />
        </div>

        {/* Adres */}
        <div className="flex flex-col">
          <label className="flex items-center text-sm font-medium mb-2 text-gray-700">
            <MapPin className="w-5 h-5 text-gray-500 mr-2" />
            Adres
          </label>
          <input
            name="address"
            value={info.address}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Örneğin: İstiklal Cad. No:100, Beyoğlu"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className={`
            mt-4 flex items-center justify-center
            bg-blue-600 text-white px-4 py-2 rounded-lg
            hover:bg-blue-700 transition
            ${saving ? "opacity-70 cursor-wait" : ""}
          `}
        >
          <Save className="w-5 h-5 mr-2" />
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>

      {/* Modallar */}
      {modal.open && modal.type === "success" && (
        <SuccessModal
          open={modal.open}
          onClose={closeModal}
          message={modal.message}
          title={modal.title}
        />
      )}
      {modal.open && modal.type === "error" && (
        <ErrorModal
          open={modal.open}
          onClose={closeModal}
          message={modal.message}
          title={modal.title}
        />
      )}
    </div>
  );
}
