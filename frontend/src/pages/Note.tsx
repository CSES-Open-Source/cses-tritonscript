import { useState } from "react";
import NoteBlock from "../components/NoteBlock";

export default function Note() {
  const [note, setNote] = useState({});
  // Get Notes, and display them
  return (
    <div>
      <NoteBlock note={note} />
    </div>
  );
}
