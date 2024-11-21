import StudyGroup from "../models/studygroup.models";
import r2 from "../utils/r2";

export function test(req, res) {
  res.json({
    message: "API is working!",
  });
}

// get all study groups at the same time and sort by recent on top 
export async function studyGroups(req, res, next) {
  try {
    //sort by updatedAt vs createdAt;
    const studyGroups = await StudyGroup.find().sort({updatedAt: -1});
    res.status(200).json(studyGroups);
  } catch (error) {
    next(error);
  }
}

// search database for studyGroups that contain name.
export async function searchForGroupByName(req, res, next){
    try {
      const regex = new RegExp(req.params.name, "i")  
      const events = await StudyGroup.find({ group_name: regex });
        res.status(200).json(events);
        
      } catch (error) {
        next(error);
      }
}

// update user
export async function createGroup(req, res, next) {
  try {
    const rest = await r2.url("cses", req.params.id);
    const { group_name, creator, className, numberOfMembers, description, isPublic} = req.body;
    const newGroup = new StudyGroup({
      group_id: req.params.id,
      group_name,
      creator,
      className,
      numberOfMembers,
      description,
      isPublic
    });
    await newGroup.save();
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}




