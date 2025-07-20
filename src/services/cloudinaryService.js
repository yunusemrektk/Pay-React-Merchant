import axios from "axios";

/**
 * Cloudinary’ye dosya yükleme
 */
/**
 * file + ek alanları backend'e post’lar, public_id döner
 */
async function uploadViaBackend(endpoint, data) {
  const form = new FormData();
  Object.entries(data).forEach(([key, val]) => {
    if (val != null) form.append(key, val);
  });

  const res = await fetch(endpoint, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    throw new Error("Upload failed: " + res.statusText);
  }

  const json = await res.json();
  return json.public_id;
}

export async function uploadMerchantBannerOnBackend({ file, merchantId }) {
  if (!file) throw new Error("file is required");
  if (!merchantId) throw new Error("merchantId is required");

  return uploadViaBackend(
    "http://localhost:3001/api/cloudinary/banner-upload",
    { file, merchantId }
  );
}

export async function uploadMenuItemImageOnBackend({ file, merchantId, itemId }) {
  if (!file) throw new Error("file is required");
  if (!merchantId) throw new Error("merchantId is required");
  if (!itemId) throw new Error("itemId is required");

  return uploadViaBackend(
    "http://localhost:3001/api/cloudinary/menu-item-upload",
    { file, merchantId, itemId }
  );
}

export function getCloudinaryUrl(publicId) {
 const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!publicId) throw new Error("publicId is required");
  if (!cloudName) throw new Error("CLOUDINARY_CLOUD_NAME tanımlı değil");
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
}