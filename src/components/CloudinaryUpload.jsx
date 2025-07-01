import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useState } from 'react';

export default function CloudinaryUpload({ value, onChange, folderName }) {
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    const file = acceptedFiles[0];
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    console.log("foldername:",folderName)
      if (folderName) {
      formData.append('folder', folderName);
    }

    formData.append('upload_preset', 'merchant-items');
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dw5hdpb6v/image/upload',
        formData
      );
      onChange(res.data.secure_url);
    } catch {
      alert('Upload başarısız!');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
        }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div className="text-blue-600 animate-pulse">Yükleniyor...</div>
      ) : value ? (
        <img
          src={value}
          alt="Ürün görseli"
          className="mx-auto mb-2 max-h-32 rounded shadow"
        />
      ) : (
        <span className="text-gray-500">
          Resmi buraya sürükle bırak veya tıkla
        </span>
      )}
    </div>
  );
}
