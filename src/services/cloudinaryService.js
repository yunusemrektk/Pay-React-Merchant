import axios from "axios";

/**
 * Cloudinary’ye dosya yükleme
 */
export async function uploadImage({ file, folder, publicId = null }) {
  if (!file) throw new Error("file is required");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "merchant-items");
  formData.append("folder", folder);

  if (publicId) {
    formData.append("public_id", publicId);
  }

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dw5hdpb6v/image/upload",
    formData
  );

  return res.data.secure_url;
}

export function getCloudinaryUrl(publicId, cloudName = "dw5hdpb6v") {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
}
