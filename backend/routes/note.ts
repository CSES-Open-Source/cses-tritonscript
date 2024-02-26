import express from "express";
import { upload } from "../controllers/note.controller";
import { notes } from "../controllers/note.controller";

const router = express.Router();

// get all notes in order of updatedAt
router.get("/", notes);

//post new note
router.post("/:id", upload);

export default router;
