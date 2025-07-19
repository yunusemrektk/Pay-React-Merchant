import { uniqId } from "../util/MenuItemUtil";
import { uploadMerchantBannerOnBackend } from "./cloudinaryService";

export async function uploadMerchantBanner({ file, merchantId }) {
  if (!merchantId) throw new Error("merchantId is required");

  const folder = `${merchantId}/banner`;
  const publicId = 'main';

  console.log(merchantId)
    console.log(folder)
  await uploadMerchantBannerOnBackend({
    file,
    merchantId,
    publicId
  });

  return `${merchantId}/banner/${publicId}`;
}