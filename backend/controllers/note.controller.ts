import Note from "../models/note.models";
import r2 from "../utils/r2";

export function test(req, res) {
  res.json({
    message: "API is working!",
  });
}

// update user

export async function upload(req, res, next) {
  try {
    // const rest = req.params.id + "aaa";
    const rest = await r2.url("attachment", req.params.id);
    const { title, classInfo, description, isPublic, username } = req.body;
    const newNote = new Note({
      note_id: req.params.id,
      title,
      classInfo,
      description,
      isPublic: true,
      username,
      file_id: req.params.id,
    });
    await newNote.save();
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
