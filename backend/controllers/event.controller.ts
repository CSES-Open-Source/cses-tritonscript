import { runInNewContext } from "vm";
import Event from "../models/event.models";
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
    const { title, organizationInfo, description, dateAndTime, isPublic, uploader, currentUser } = req.body;
    const newEvent = new Event({
      event_id: req.params.id,
      title,
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




