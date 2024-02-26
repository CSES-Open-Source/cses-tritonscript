import express from "express";
import { upload } from "../controllers/event.controller";
import { events } from "../controllers/event.controller";
import { searchForEventByName } from "../controllers/event.controller";

const router = express.Router();

// get all events in order of dateAndTime
router.get("/events", events);

// get all events that contain name
router.get("/search/:name",searchForEventByName);

// upload event with id
router.post("/:id", upload);


router.get("/")
export default router;