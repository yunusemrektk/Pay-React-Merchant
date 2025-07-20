import { uploadMenuItemImageOnBackend } from "./cloudinaryService";

export async function uploadMenuItemImage({ file, merchantId, itemId }) {
  if (!file) throw new Error("file is required");
  if (!merchantId) throw new Error("merchantId is required");
  if (!itemId) throw new Error("itemId is required");

  return await uploadMenuItemImageOnBackend({
    file,
    merchantId,
    itemId,
  });
}
