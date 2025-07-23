import { useContext, useState } from "react";
import axios from "axios";
import NavBar from "../components/homepage/NavBar";
import EntryForm from "../components/Entries/EntryForm";
import MoodEntry from "../components/Entries/MoodEntry";
import EntryControls from "../components/Entries/EntryControls";
import currentUserContext from "../context/current-user-context";

import "../styles/entries.css";

export default function Entries() {
  const [mood, setMood] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { currentUser } = useContext(currentUserContext);

  const emojis = [
    ["🙏", "greatful"],
    ["😊", "happy"],
    ["😡", "angry"],
    ["😢", "sad"],
    ["😰", "anxious"],
  ];

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
      //
    } catch (err) {
      console.error("Entry submission failed", err);
    }

    //reset the form
    setTitle("");
    setContent("");
    setMood("");
  };

  return (
    <>
      <NavBar />

      <div className="entries-content">
        <div className="entry-controls">
          <MoodEntry
            emojis={emojis}
            username={currentUser.username}
            setMood={setMood}
          />

          <EntryControls handleSubmit={handleSubmit} />
        </div>

        <div className="glass-card entry-form">
          <EntryForm
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
}
