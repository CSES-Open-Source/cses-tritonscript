"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_controller_1 = require("../controllers/event.controller");
const event_controller_2 = require("../controllers/event.controller");
const router = express_1.default.Router();
// get all events in order of dateAndTime
router.get("/events", event_controller_2.events);
// get specific event
// router.get("/search/:name",searchForEventByName);
//post new note
router.post("/:id", event_controller_1.upload);
router.get("/");
exports.default = router;
