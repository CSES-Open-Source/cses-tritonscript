import styles from './ClassNotes.module.css';

function NoteBlock({
  classTitle,
  note,
}: {
  classTitle: string;
  note: string;
}) {
  return (
    <div className={styles.noteBlock}>
      <a className={styles.classTitle}>{classTitle}</a>
      <hr className={styles.divider} />
      <img className={styles.placeholder} src={note} alt={`${classTitle} note`} />
    </div>
  );
}

export default NoteBlock;