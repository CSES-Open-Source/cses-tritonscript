
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Event = mongoose.model("Counter", counterSchema);

export default Event;
