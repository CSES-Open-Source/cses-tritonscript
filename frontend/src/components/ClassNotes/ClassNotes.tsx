import styles from './ClassNotes.module.css';

function NoteBlock({
  classTitle,
  notes,
}: {
  classTitle: string;
  notes: string[];
}) {
  return (
    <div className={styles.noteBlock}>
      <a className={styles.classTitle}>{classTitle}</a>
      <hr className={styles.divider} />
      <div className={styles.note_placeholder}>
        {notes.map((note, index) => (
            <img
            key={index}
            className={styles.note}
            src={note}
            alt={`${classTitle} note ${index + 1}`}
          />
        )
        )}
      </div>
    </div>
  );
}

export default NoteBlock;