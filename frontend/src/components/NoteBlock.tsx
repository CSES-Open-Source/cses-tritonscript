export default function NoteBlock(props: any) {
  return (
    <div style={{ width: "100%", height: "200px", border: "5px solid #222222" }}>
      Title : <a>{props.note.title}</a>
      <br />
      Class: <a>{props.note.classInfo}</a>
      <br />
      Description: <a>{props.note.description}</a>
      <br />
      uploader: <a>{props.note.uploader}</a>
      <br />
      uploaded at: <a>{props.note.createdAt}</a>
      <br />
      download note <a href={"https://pub-b9b49ff013814531ac1fd761116a6067.r2.dev/" + props.note.file_id}>download</a>
      {/* Todo: Make a preview of the note */}
    </div>
  );
}
