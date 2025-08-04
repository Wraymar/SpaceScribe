import { useState } from "react";
import axios from "axios";

function ImageUpload({
  setSelectedImage,
  setImagePreview,
  caption,
  setCaption,
  error,
}) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Image caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ImageUpload;
