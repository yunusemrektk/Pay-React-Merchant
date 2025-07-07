import { uploadImage } from "./cloudinaryService";

export async function uploadMerchantBanner({ file, merchantId }) {
  if (!merchantId) throw new Error("merchantId is required");

  const folder = `${merchantId}/banner`;

  return await uploadImage({
    file,
    folder,
  });
}