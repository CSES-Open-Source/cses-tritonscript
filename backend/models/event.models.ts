import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
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
    dateAndTime:{
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
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
