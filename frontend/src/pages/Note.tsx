import { useState, useEffect } from "react";
import NoteBlock from "../components/NoteBlock";
import settings from "../utils/config";

export default function Note() {
  const [note, setNote] = useState([]);

  async function getNotes() {
    try {
      const response = await fetch(`${settings.domain}/api/note`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setNote(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    function fetchData(): void {
      getNotes();
    }
    fetchData();
  }, []);

  // Get Notes, and display them
  return (
    <>
      {note.map((note: any) => (
        <NoteBlock key={note.file_id} note={note} />
      ))}
    </>
  );
}
