import { useState, useEffect } from "react";
import NoteBlock from "../components/NoteBlock";
import ClassNote from "../components/ClassNotes/ClassNotes.tsx";

import settings from "../utils/config";
import filter from '../assets/filter-icon.png';
import edit from '../assets/edit.png';
import note from '../assets/placeholder-notes.png';
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
        <div className="dashboard-features">
          <div className="search-features">
            <input className="search-input"
              type="text"
              placeholder="Search..."
            />
            <div className="filter">
              <img className="filter-logo" src={filter} alt="search filter icon" />
            </div>
            <div className="edit">
              <img className="edit-logo" src={edit} alt="edit icon" />
            </div>
          </div>
          <div className="notes-grid">
              <div className="recent-notes">
                <div className="recent-notes-text">
                  <p><b>RECENT NOTES</b></p>
                  <img className="placeholder-note" src={note} alt="placeholder note"/>
                  <img className="placeholder-note" src={note} alt="placeholder note"/>
                </div>
              </div>
              <div className="class-notes">
                <ClassNote classTitle={"CSE 30"} note={note}/>
                <ClassNote classTitle={"PHYS 2C"} note={note}/>
                <ClassNote classTitle={"ECE 65"} note={note}/>
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