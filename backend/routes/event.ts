import express from "express";
import {upload } from "../controllers/event.controller";
import { events } from "../controllers/event.controller";

const router = express.Router();

// get all events in order of dateAndTime
router.get("/events", events);

// get specific event
// router.get("/search/:name",searchForEventByName);
//post new note

router.post("/:id", upload);


router.get("/")
export default router;