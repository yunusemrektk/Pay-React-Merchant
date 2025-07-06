import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';

export default function CloudinaryUpload({ file, onFileSelect }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Temizlik (memory leak olmasın)
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
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
      {preview ? (
        <img
          src={preview}
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
