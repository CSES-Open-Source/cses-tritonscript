"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("../controllers/note.controller");
const note_controller_2 = require("../controllers/note.controller");
const note_controller_3 = require("../controllers/note.controller");
const router = express_1.default.Router();
// get all notes in order of updatedAt
router.get("/", note_controller_2.notes);
// get all notes containing a given search string
router.get("/search/:name", note_controller_3.searchForNoteByName);
//post new note
router.post("/:id", note_controller_1.upload);
exports.default = router;
