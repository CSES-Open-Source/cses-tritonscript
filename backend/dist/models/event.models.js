"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    //make event id serial number and auto incrementing 
    event_id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: false,
        unique: false,
    },
    organizationInfo: {
        type: String,
        required: false,
        unique: false,
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    dateAndTime: {
        type: Number,
        required: false,
        unique: false,
    },
    isPublic: {
        type: Boolean,
        required: false,
        unique: false,
    },
    uploader: {
        type: String,
        required: false,
        unique: false,
    },
    file_id: {
        type: String,
        required: false,
        unique: false,
    },
}, { timestamps: true });
const Event = mongoose_1.default.model("Event", eventSchema);
exports.default = Event;
