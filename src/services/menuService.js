import axios from "axios";

// Sadece görsel upload fonksiyonu
export async function uploadMenuImage(file, merchantId) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'merchant-items');
  if (merchantId) {
    formData.append('folder', merchantId);
  }

  const res = await axios.post(
    'https://api.cloudinary.com/v1_1/dw5hdpb6v/image/upload',
    formData
  );
  return res.data.secure_url;
}
