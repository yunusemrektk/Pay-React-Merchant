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

/**
 * Fetch merchant info (id, name, address, image_path) from your backend
 * @param {string} merchantId
 * @returns {Promise<CategoriesDTO>}
 */
export async function getMerchantCategories(merchantId) {
  if (!merchantId) throw new Error("merchantId is required");

  const res = await axios.get(
    `${API_BASE}/merchant/${merchantId}/data/categories`
  );

  console.log(res.data)
  // backend returns: { merchant: { id, name, address, image_path } }
  return res.data.categories;
}

/**
 * Fetch merchant info (id, name, address, image_path) from your backend
 * @param {string} merchantId
 * @returns {Promise<OrderDTO>}
 */
export async function getMerchantMenuItems(merchantId) {
  if (!merchantId) throw new Error("merchantId is required");
  console.log(merchantId)
  const res = await axios.get(
    `${API_BASE}/merchant/${merchantId}/data/menuItems`
  );

  console.log(res.data)
  // backend returns: { merchant: { id, name, address, image_path } }
  return res.data.menuItems;
}

//TODO SAVE MENU ORDER
/**
 * Fetch merchant info (id, name, address, image_path) from your backend
 * @param {string} merchantId
 * @returns {Promise<OrderDTO>}
 */
export async function saveMenuOrder(merchantId) {
  if (!merchantId) throw new Error("merchantId is required");
  console.log(merchantId)
  const res = await axios.get(
    `${API_BASE}/merchant/${merchantId}/data/menuItems`
  );

  console.log(res.data)
  // backend returns: { merchant: { id, name, address, image_path } }
  return res.data.menuItems;
}