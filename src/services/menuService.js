import axios from "axios";

/**
 * Cloudinary’ye dosya yükleme
 * 
 * @param {Object} options
 * @param {File} options.file - Yüklenecek dosya
 * @param {string} options.merchantId - Merchant id (zorunlu)
 * @param {string} [options.type] - "banner" | "menu_item"
 * @param {string|number} [options.itemId] - Menu item için id
 * 
 * @returns {Promise<string>} - Cloudinary secure_url
 */
export async function uploadMenuImage({ file, merchantId, type = "banner", itemId }) {
  if (!merchantId) throw new Error("merchantId is required");
  if (!file) throw new Error("file is required");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "merchant-items");

  // Ana folder
  const folder = `${merchantId}/${type === "menu_item" ? "menu_items" : "banner"}`;
  formData.append("folder", folder);

  // public_id sadece menu_item için id varsa eklenir
  if (itemId) {
    formData.append("public_id", `${folder}/item_${itemId}`);
  }

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dw5hdpb6v/image/upload",
    formData
  );

  return res.data.secure_url;
}

/**
 * Cloudinary URL’yi publicId’den üretir
 * 
 * @param {string} publicId
 * @param {string} [cloudName="dw5hdpb6v"]
 * @returns {string}
 */
export function getCloudinaryUrl(publicId, cloudName = "dw5hdpb6v") {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
}
