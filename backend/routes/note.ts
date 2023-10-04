import express from "express";
import { upload } from "../controllers/note.controller";

const router = express.Router();

router.post("/:id", upload);

export default router;
