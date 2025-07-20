import React, { useState, useRef, useEffect } from "react";
import { Store, MapPin, ImageIcon, Save, Edit2 } from "lucide-react";
import SuccessModal from "../../modals/SuccessModal";
import ErrorModal from "../../modals/ErrorModal";
import CloudinaryUpload from "../../molecules/CloudinaryUpload";
import LoadingModal from "../../modals/LoadingModal";

import { getCloudinaryUrl } from "../../../services/cloudinaryService";
import { getMerchantInfo, uploadMerchantBanner } from "../../../services/merchantService";

export default function MerchantInfoSettings() {
  // fixed merchantId for now
  const merchantId = "merc1";

  // ─── Hooks (always in same order) ────────────────────────────────────────────
  const [info, setInfo]                       = useState(null);
  const [saving, setSaving]                   = useState(false);
  const [editingImage, setEditingImage]       = useState(false);
  const [imageError, setImageError]           = useState(false);
  const [optimisticPreview, setOptimisticPreview] = useState(null);
  const [imgCacheBust, setImgCacheBust]       = useState(null);
  const [modal, setModal]                     = useState({
    open: false,
    type: null,
    title: "",
    message: "",
  });
  const previewBlobUrlRef = useRef(null);

  // ─── 1) Fetch merchant on mount ─────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    getMerchantInfo(merchantId)
      .then(data => {
        if (mounted) setInfo(data);
      })
      .catch(err => console.error("Merchant load error:", err));
    return () => { mounted = false; };
  }, [merchantId]);

  // ─── 2) Cache-bust effect (guarded) ─────────────────────────────────────────
  useEffect(() => {
    if (!info) return;
    const key    = `bannerBust_${info.id}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const bust = Number(stored);
      setImgCacheBust(bust);
      setOptimisticPreview(`${getCloudinaryUrl(info.image_path)}?cb=${bust}`);
    } else {
      setOptimisticPreview(getCloudinaryUrl(info.image_path));
    }
  }, [info]);

  // ─── Handlers ────────────────────────────────────────────────────────────────
  function handleFileSelect(file) {
    if (previewBlobUrlRef.current) {
      URL.revokeObjectURL(previewBlobUrlRef.current);
    }
    const url = URL.createObjectURL(file);
    previewBlobUrlRef.current = url;
    setOptimisticPreview(url);
    setInfo(prev => ({ ...prev, image_file: file }));
    setImageError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    if (info.image_file instanceof File) {
      try {
        const newPublicId = await uploadMerchantBanner({
          file: info.image_file,
          merchantId: info.id,
        });
        const url  = getCloudinaryUrl(newPublicId);
        const bust = Date.now();
        localStorage.setItem(`bannerBust_${info.id}`, String(bust));
        setInfo(prev => ({
          ...prev,
          image:      newPublicId,
          image_file: null,
        }));
        setImgCacheBust(bust);
        setOptimisticPreview(`${url}?cb=${bust}`);
        setEditingImage(false);
        setModal({
          open:   true,
          type:   "success",
          title:  "Başarılı",
          message:"Bilgileriniz başarıyla güncellendi!",
        });
      } catch {
        setModal({
          open:   true,
          type:   "error",
          title:  "Yükleme Hatası",
          message:"Banner yüklenemedi. Lütfen tekrar deneyin.",
        });
      }
    } else {
      setModal({
        open:   true,
        type:   "success",
        title:  "Başarılı",
        message:"Bilgileriniz başarıyla güncellendi!",
      });
    }

    setSaving(false);
  }

  function cancelEdit() {
    setEditingImage(false);
    setInfo(prev => ({ ...prev, image_file: null }));
    setImageError(false);
    if (previewBlobUrlRef.current) {
      URL.revokeObjectURL(previewBlobUrlRef.current);
      previewBlobUrlRef.current = null;
    }
    setOptimisticPreview(null);
  }

  function closeModal() {
    setModal(prev => ({ ...prev, open: false }));
  }

  // ─── 3) Loading guard ─────────────────────────────────────────────────────────
  if (!info) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingModal open description="İşyeri bilgileri yükleniyor..." />
      </div>
    );
  }

  // ─── 4) Render form ──────────────────────────────────────────────────────────
  const baseCloudUrl = info.image ? getCloudinaryUrl(info.image) : null;
  let shownImageUrl  = optimisticPreview || (imgCacheBust
    ? `${baseCloudUrl}?cb=${imgCacheBust}`
    : baseCloudUrl);

  return (
    <div className="max-w-lg mx-auto">
      {saving && <LoadingModal open description="Banner upload ediliyor..." />}

      <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
        <Store className="w-6 h-6 text-blue-600 mr-2" />
        İş Yeri Bilgisi
      </h3>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        {/* Banner */}
        <div className="flex flex-col">
          <label className="flex items-center text-sm font-medium mb-2 text-gray-700">
            <ImageIcon className="w-5 h-5 text-gray-500 mr-2" />
            Logo / Fotoğraf
          </label>
          <div className="relative">
            {editingImage ? (
              <CloudinaryUpload file={info.image_file} onFileSelect={handleFileSelect} />
            ) : imageError || !shownImageUrl ? (
              <div className="w-full h-48 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            ) : (
              <img
                src={shownImageUrl}
                alt="İşyeri resmi"
                className="w-full h-48 object-contain rounded-lg bg-gray-50"
                onError={() => setImageError(true)}
                style={{ transition: "opacity 0.2s" }}
              />
            )}
            {!editingImage && (
              <button
                type="button"
                onClick={() => setEditingImage(true)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100"
                title="Düzenle"
              >
                <Edit2 className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* İşyeri Adı */}
        <div className="flex flex-col">
          <label className="flex items-center text-sm font-medium mb-2 text-gray-700">
            <Store className="w-5 h-5 text-gray-500 mr-2" />
            İşyeri Adı
          </label>
          <input
            name="name"
            value={info.name}
            onChange={e => setInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))}
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
            onChange={e => setInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Örneğin: İstiklal Cad. No:100, Beyoğlu"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-2 mt-4">
          <button
            type="submit"
            disabled={saving}
            className={`flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition ${saving ? "opacity-70 cursor-wait" : ""}`}
          >
            <Save className="w-5 h-5 mr-2" />
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </button>
          {editingImage && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              İptal
            </button>
          )}
        </div>
      </form>

      {modal.open && modal.type === "success" && (
        <SuccessModal open={modal.open} onClose={closeModal} title={modal.title} message={modal.message} />
      )}
      {modal.open && modal.type === "error" && (
        <ErrorModal   open={modal.open} onClose={closeModal} title={modal.title} message={modal.message} />
      )}
    </div>
  );
}
