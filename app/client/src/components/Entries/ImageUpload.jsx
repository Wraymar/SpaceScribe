import { useState } from "react";
import axios from "axios";

function ImageUpload({ journalEntryId, userId }) {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [filename, setFilename] = useState("");
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!journalEntryId) {
      setError("Please submit the journal entry first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("journal_entry_id", journalEntryId);
    formData.append("user_id", userId);
    formData.append("filename", file?.name); //file?.name
    formData.append("file_type", file?.type); //file?.type
    formData.append("caption", caption); //file?.caption

    try {
      const res = await axios.post("/api/media/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log("Image uploaded:", res.data);
      setError("");
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Upload failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="text"
        placeholder="Image caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button type="submit">Upload Image</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default ImageUpload;
