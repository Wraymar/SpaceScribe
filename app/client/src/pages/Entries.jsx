import { useContext, useState } from "react";
import axios from "axios";
import NavBar from "../components/homepage/NavBar";
import EntryForm from "../components/Entries/EntryForm";
import MoodEntry from "../components/Entries/MoodEntry";
import EntryControls from "../components/Entries/EntryControls";
import currentUserContext from "../context/current-user-context";
import ImageUpload from "../components/Entries/ImageUpload";

import "../styles/entries.css";

export default function Entries() {
  //image preview
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  //entry state
  const [mood, setMood] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { currentUser } = useContext(currentUserContext);

  //state for the image upload, tracking user id
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");

  if (!currentUser || !currentUser.id) return null;

  const emojis = [
    ["🙏", "greatful"],
    ["😊", "happy"],
    ["😡", "angry"],
    ["😢", "sad"],
    ["😰", "anxious"],
    ["🤢", "disgusted"],
    ["🫩", "tired"],
    ["🤩", "motivated"],
  ];

  const handleReset = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setMood("");
    setTitle("");
    setContent("");
    setSelectedImage(null);
    setImagePreview(null);
    setCaption("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //
      const user_id = currentUser?.id;
      if (!user_id) {
        console.error("User not logged in");
        return;
      }
      const endpoint = "/api/journal/entries/new";
      const data = { user_id, mood, title, content };
      const response = await axios.post(endpoint, data);
      console.log("New Entry Created", response.data);

      const entryId = response.data.newEntry.id; // local variable
      //

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("journal_entry_id", entryId);
        formData.append("user_id", user_id);
        formData.append("filename", selectedImage.name);
        formData.append("file_type", selectedImage.type);
        formData.append("caption", caption);

        await axios.post("/api/media/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
      }

      console.log("Entry + image uploaded successfully");
      handleReset();
    } catch (err) {
      setError("error uploading");
      console.error("Entry submission failed", err);
    }

    //reset the form

    //WAIT FOR THE IMAGE TO BE UPLOADED THEN CLEAR
    setTitle("");
    setContent("");
    setMood("");
  };

  return (
    <>
      <NavBar />

      <div className="entries-content">
        <div className="entry-controls">
          {/* if there is an entry id then we replace the mood entry with the upload form */}
          <div className="glass-card mood-selection">
            <MoodEntry
              emojis={emojis}
              username={currentUser.username}
              mood={mood}
              setMood={setMood}
            />
          </div>

          <div className="glass-card action-div">
            <div className="image-upload-form">
              <ImageUpload
                setSelectedImage={setSelectedImage}
                setImagePreview={setImagePreview}
                caption={caption}
                setCaption={setCaption}
                error={error}
                setError={setError}
              />
            </div>
            <br />
            <EntryControls
              handleSubmit={handleSubmit}
              handleReset={handleReset}
            />
          </div>
        </div>

        <div className="glass-card entry-form">
          <EntryForm
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
            imagePreview={imagePreview}
          />
        </div>
      </div>
    </>
  );
}
