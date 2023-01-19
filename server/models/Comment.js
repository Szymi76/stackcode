import mongoose from "mongoose";
import Report from "./Reports.js";
import User from "./User.js";

const CommentScheme = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
    reports: [
      {
        type: mongoose.Types.ObjectId,
        ref: Report,
        required: true,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentScheme);

export default Comment;
