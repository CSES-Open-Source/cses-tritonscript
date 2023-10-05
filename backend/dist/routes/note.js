"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("../controllers/note.controller");
const note_controller_2 = require("../controllers/note.controller");
const router = express_1.default.Router();
router.get("/", note_controller_2.notes);
router.post("/:id", note_controller_1.upload);
exports.default = router;
