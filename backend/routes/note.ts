import express from "express";
import { upload } from "../controllers/note.controller";
import { notes } from "../controllers/note.controller";

const router = express.Router();

router.get("/", notes);
router.post("/:id", upload);

export default router;
