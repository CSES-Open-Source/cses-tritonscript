import mongoose from "mongoose";

const studyGroupSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const StudyGroup = mongoose.model("Study Group", studyGroupSchema);

export default StudyGroup;
