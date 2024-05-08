"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const studyGroupSchema = new mongoose_1.default.Schema({
    group_id: {
        type: String,
        required: true,
        unique: true,
    },
    group_name: {
        type: String,
        required: true,
        unique: true,
    },
    creator: {
        type: String,
        required: true,
        unique: true,
    },
    className: {
        type: String,
        required: true,
        unique: false,
    },
    numberOfMembers: {
        type: Number,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    isPublic: {
        type: Boolean,
        required: false,
        unique: false,
    },
}, { timestamps: true });
const StudyGroup = mongoose_1.default.model("Study Group", studyGroupSchema);
exports.default = StudyGroup;
