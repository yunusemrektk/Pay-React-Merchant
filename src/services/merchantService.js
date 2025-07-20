import axios from "axios";

import { uploadMerchantBannerOnBackend } from "./cloudinaryService";
const API_BASE = import.meta.env.VITE_API_BASE;

export async function uploadMerchantBanner({ file, merchantId }) {
  if (!merchantId) throw new Error("merchantId is required");

  const publicId = 'main';

  await uploadMerchantBannerOnBackend({
    file,
    merchantId,
    publicId
  });

  return `${merchantId}/banner/${publicId}`;
}

/**
 * Fetch merchant info (id, name, address, image_path) from your backend
 * @param {string} merchantId
 * @returns {Promise<MerchantDTO>}
 */
export async function getMerchantInfo(merchantId) {
  if (!merchantId) throw new Error("merchantId is required");

  const res = await axios.get(
    `${API_BASE}/merchant/${merchantId}/data/merchant`
  );
  console.log(res)

  // backend returns: { merchant: { id, name, address, image_path } }
  return res.data.merchant;
}