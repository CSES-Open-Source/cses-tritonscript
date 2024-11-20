import express from "express";
import { createGroup } from "../controllers/studygroup.controller";
import { studyGroups } from "../controllers/studygroup.controller";
import { searchForGroupByName } from "../controllers/studygroup.controller";

const router = express.Router();

// get all notes in order of updatedAt
router.get("/all", studyGroups);

// get all notes containing a given search string
router.get("/search/:name", searchForGroupByName);

//post new note
router.post("/:id", createGroup);


export default router;
