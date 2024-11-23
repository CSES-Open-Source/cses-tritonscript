
import { useState, useEffect } from "react";
import NoteBlock from "../components/NoteBlock";
import settings from "../utils/config";
import filter from '../assets/filter-icon.png';
import "../../src/pages/Dashboard.css";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);

  // Function to fetch notes
  async function fetchNotes() {
    try {
      const response = await fetch(`${settings.domain}/api/note`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNotes(data); 
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // useEffect to fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Render dashboard with notes
  return (
    <div>
        <div>
        <div>dashboard</div>
        <div className="search-features">
        <input className="search-input"
          type="text"
          placeholder="Search..."
        />
        <div className="filter">
          <img className="logo" src={filter} alt="search filter icon" />
        </div>
        </div>
        </div>
      <h1>Dashboard</h1>
      <div>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteBlock key={note.note_id} note={note} />
          ))
        ) : (
          <p>No notes available</p>
        )}
      </div>
    </div>
  );
}
