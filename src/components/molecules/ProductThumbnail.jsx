import React, { useState } from "react";
import { getCloudinaryUrl } from "../../services/cloudinaryService";

export default function ProductThumbnail({ imagePath, alt }) {
  const [imgError, setImgError] = useState(false);

  if (!imagePath || imgError) {
    return (
      <div className="w-8 h-8 text-gray-300 flex items-center justify-center">–</div>
    );
  }

  return (
    <img
      src={getCloudinaryUrl(imagePath)}
      alt={alt}
      className="object-cover w-full h-full"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  );
}
