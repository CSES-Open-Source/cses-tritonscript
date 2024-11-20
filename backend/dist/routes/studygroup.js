"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studygroup_controller_1 = require("../controllers/studygroup.controller");
const studygroup_controller_2 = require("../controllers/studygroup.controller");
const studygroup_controller_3 = require("../controllers/studygroup.controller");
const router = express_1.default.Router();
// get all notes in order of updatedAt
router.get("/all", studygroup_controller_2.studyGroups);
// get all notes containing a given search string
router.get("/search/:name", studygroup_controller_3.searchForGroupByName);
//post new note
router.post("/:id", studygroup_controller_1.createGroup);
exports.default = router;
