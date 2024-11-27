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

  // 
  // async function fetchNotes() {
  //   try {
  //     const response = await fetch(`${settings.domain}/api/note`, {
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     setNotes(data); 
  //   } catch (error) {
  //     console.error("Error fetching notes:", error);
  //   }
  // }

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

    useEffect(() => {
      const mockNotes = [
        {
          note_id: 1,
          title: "Sample Note - Physics",
          content: "This is a sample note to simulate functionality.",
        },
        {
          note_id: 2,
          title: "Sample Note 2 - CS",
          content: "Here's another simulated note.",
        },
      ];
      setNotes(mockNotes); 
    }, []);

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
                  <div>
                    {notes.length > 0 ? (
                      notes.map((oneNote) => (
                        <div key={oneNote.note_id} className="note-container">
                          <img 
                            className="placeholder-note-recent" 
                            src={note} 
                            alt={oneNote.title || "placeholder note"} 
                          />
                          <p className="note-title">{oneNote.title || "Untitled Note"}</p> {/* Title below image */}
                        </div>
                      ))
                    ) : (
                      <p>No notes available</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="class-notes">
                <ClassNote classTitle={"CSE 30"} note={note}/>
                <ClassNote classTitle={"PHYS 2C"} note={note}/>
                <ClassNote classTitle={"ECE 65"} note={note}/>
              </div>
          </div>
        </div>
    </div>
  );
}