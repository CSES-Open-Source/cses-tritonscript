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
exports.upload = exports.events = exports.test = void 0;
const event_models_1 = __importDefault(require("../models/event.models"));
const r2_1 = __importDefault(require("../utils/r2"));
function test(req, res) {
    res.json({
        message: "API is working!",
    });
}
exports.test = test;
// get all events at the same time and sort by recent on top 
function events(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //sort by updatedAt vs createdAt;
            const events = yield event_models_1.default.find().sort({ dateAndTime: -1 });
            res.status(200).json(events);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.events = events;
// update user
function upload(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rest = yield r2_1.default.url("cses", req.params.id);
            const { title, organizationInfo, description, dateAndTime, isPublic, uploader, currentUser } = req.body;
            const newEvent = new event_models_1.default({
                event_id: req.params.id,
                title,
                organizationInfo,
                description,
                dateAndTime,
                isPublic: true,
                uploader,
            });
            yield newEvent.save();
            res.status(200).json(rest);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.upload = upload;
// export async function searchForEventByName(req, res, next){
//     try {
//       const events = await Event.find().filter((event) => {
//         event.title.includes(req.params.name);
//     });
//         res.status(200).json(events);
//       } catch (error) {
//         next(error);
//       }
// }
