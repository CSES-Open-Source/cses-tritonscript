import { runInNewContext } from "vm";
import Event from "../models/event.models";
import Counter from "../models/counter.models";
import r2 from "../utils/r2";

export function test(req, res) {
  res.json({
    message: "API is working!",
  });
}

// get all events at the same time and sort by recent on top 
export async function events(req, res, next) {
  try {
    //sort by updatedAt vs createdAt;
    const events = await Event.find().sort({dateAndTime: -1});
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
}

// update user
export async function upload(req, res, next) {
  try {
    const rest = await r2.url("cses", req.params.id);
    const { organizationInfo, description, dateAndTime, isPublic, uploader, currentUser } = req.body;
    const counter = await Counter.findOne({counter_type: "Events"});
    var id;
    // check if counter element already exists, create one if it doesn't.
    if (counter == null) {
        const newCounter = new Counter({
            counter_type: "Events",
            count: 0,
        });
        await newCounter.save();
        id = 0;
    } else {
        // increment counter element
        id = (counter.count == undefined) ? 9999 : counter.count + 1;
        const update = { count: id};
        const res = await Counter.findOneAndUpdate({counter_type: "Events"}, update, {includeResultMetadata: true});
    }
    const newEvent = new Event({
      event_id: id,
      title: req.params.id,
      organizationInfo,
      description,
      dateAndTime,
      isPublic: true,
      uploader,
    });
    await newEvent.save();
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}

// search events by name
export async function searchForEventByName(req, res, next){
    try {
      const regex = new RegExp(req.params.name, "i")  
      const events = await Event.find({ event_id: regex });
        res.status(200).json(events);
        
      } catch (error) {
        next(error);
      }
}




