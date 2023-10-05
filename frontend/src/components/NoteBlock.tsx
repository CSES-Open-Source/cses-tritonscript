import settings from "../utils/config";
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
      download note <a href={settings.r2devUrl + props.note.file_id}>download</a>
      {/* Todo: Make a preview of the note */}
    </div>
  );
}
