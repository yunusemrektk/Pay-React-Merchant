import { uploadImage } from "./cloudinaryService";

export async function uploadMenuItemImage({ file, merchantId, itemId }) {
  if (!merchantId) throw new Error("merchantId is required");
  if (!itemId) throw new Error("itemId is required");

  const folder = `${merchantId}/menu_items`;
  const publicId = `item_${itemId}`;

  return await uploadImage({
    file,
    folder,
    publicId,
  });
}
