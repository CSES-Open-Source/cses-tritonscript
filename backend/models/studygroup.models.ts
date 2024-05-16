import mongoose from "mongoose";

const studyGroupSchema = new mongoose.Schema(
  {
    group_name: {
        type: String,
        required: true,
        unique: true,
    },
    creator: {
      type: String,
      required: false, //true
      unique: false,
    },
    className: {
        type: String,
        required: false, //true
        unique: false,
    },
    numberOfMembers: {
      type: Number,
      required: false, //true
      unique: false,
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
  },
  { timestamps: true }
);

const StudyGroup = mongoose.model("Study Group", studyGroupSchema);

export default StudyGroup;
