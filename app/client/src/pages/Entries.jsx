import { useContext, useState } from "react";
import axios from "axios";
import NavBar from "../components/homepage/NavBar";
import EntryForm from "../components/Entries/EntryForm";
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
          <div className="glass-card mood-selection">
            <h3>Hi {currentUser.username}!</h3>
            <p>Which emoji suits how you feel today?</p>
            <div className="emoji-grid">
              {emojis.map(([icon, label]) => (
                <button
                  key={label}
                  className="emoji-btn"
                  onClick={() => setMood(label)}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card action-div">
            <div className="action-buttons">
              <span>Start Over:</span>
              <button className="btn btn-secondary btn-sm">Reset</button>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-lg submit-entry"
              onClick={handleSubmit}
            >
              Submit Entry
            </button>
          </div>
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
