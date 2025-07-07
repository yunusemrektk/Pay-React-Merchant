import React, { useState } from "react";
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

    const updatedInfo = {
      ...info,
      image_path: uploadedUrl,
    };

    setInfo(updatedInfo);

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
    <div className="max-w-lg">
      <h3 className="text-xl font-semibold mb-4">İşyeri Bilgisi</h3>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 flex flex-col gap-4"
      >
        {/* Image section */}
        <div>
          <label className="block text-sm font-medium mb-1">Logo/Fotoğraf</label>
          <CloudinaryUpload
            file={info.image_file}
            initialUrl={info.image_path}
            onFileSelect={(file) =>
              setInfo({
                ...info,
                image_file: file,
              })
            }
          />
        </div>

        {/* İşyeri adı */}
        <div>
          <label className="block text-sm font-medium mb-1">İşyeri Adı</label>
          <input
            className="border rounded p-2 w-full"
            name="name"
            value={info.name}
            onChange={handleChange}
          />
        </div>

        {/* Adres */}
        <div>
          <label className="block text-sm font-medium mb-1">Adres</label>
          <input
            className="border rounded p-2 w-full"
            name="address"
            value={info.address}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </form>

      {/* Modal */}
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
