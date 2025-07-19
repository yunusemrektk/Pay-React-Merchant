import axios from "axios";

/**
 * Cloudinary’ye dosya yükleme
 */
export async function uploadImage({ file, folder, publicId }) {
  if (!file) throw new Error("file is required");
  // 1. Signature'ı backend'den al
  const signatureRes = await axios.post("http://localhost:3001/api/cloudinary/signature", {
    public_id: publicId,
    folder,
  });
  const { signature, timestamp, apiKey } = signatureRes.data;

  // 2. Cloudinary'ye yükle
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "merchant-items");
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  if (publicId) formData.append("public_id", publicId);
  if (folder) formData.append("folder", folder);

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dw5hdpb6v/image/upload",
    formData
  );

  return res.data.secure_url;
}

// Görseli göstermek için:
export function getCloudinaryUrl(publicId, cloudName = "dw5hdpb6v") {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
}

export async function uploadMerchantBannerOnBackend({ file, merchantId }) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("merchantId", merchantId);

  console.log(merchantId)
  const res = await fetch("http://localhost:3001/api/cloudinary/banner-upload", {
    method: "POST",
    body: formData,
  });

  console.log(res.data)

  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.public_id;
}