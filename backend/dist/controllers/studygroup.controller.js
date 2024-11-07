"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = exports.searchForGroupByName = exports.studyGroups = exports.test = void 0;
const studygroup_models_1 = __importDefault(require("../models/studygroup.models"));
const r2_1 = __importDefault(require("../utils/r2"));
function test(req, res) {
    res.json({
        message: "API is working!",
    });
}
exports.test = test;
// get all study groups at the same time and sort by recent on top 
function studyGroups(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //sort by updatedAt vs createdAt;
            const studyGroups = yield studygroup_models_1.default.find().sort({ updatedAt: -1 });
            res.status(200).json(studyGroups);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.studyGroups = studyGroups;
// search database for studyGroups that contain name.
function searchForGroupByName(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const regex = new RegExp(req.params.name, "i");
            const events = yield studygroup_models_1.default.find({ group_id: regex });
            res.status(200).json(events);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.searchForGroupByName = searchForGroupByName;
// update user
function createGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rest = yield r2_1.default.url("cses", req.params.id);
            const { creator, className, numberOfMembers, description, isPublic } = req.body;
            const newGroup = new studygroup_models_1.default({
                group_name: req.params.id,
                creator,
                className,
                numberOfMembers,
                description,
                isPublic
            });
            yield newGroup.save();
            res.status(200).json(rest);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createGroup = createGroup;
