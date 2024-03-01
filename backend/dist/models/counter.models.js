"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const counterSchema = new mongoose_1.default.Schema({
    counter_type: {
        type: String,
        required: true,
        unique: true,
    },
    count: {
        type: Number,
        required: false,
        unique: false,
    },
}, { timestamps: true });
const Event = mongoose_1.default.model("Counter", counterSchema);
exports.default = Event;
