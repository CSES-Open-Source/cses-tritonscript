export default function NoteBlock(props: any) {
  return (
    <div>
      Note FIle : <a>{props.note.title}</a>
      <br />
      <a>{props.note.classInfo}</a>
      <br />
      <a>{props.note.description}</a>
      <br />
      <a>{props.note.username}</a>
      <a>
        https://pub-b9b49ff013814531ac1fd761116a6067.r2.dev/ <a>{props.note.file_id}</a>
      </a>
    </div>
  );
}
