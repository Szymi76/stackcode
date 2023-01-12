import mongoose from "mongoose";
import User from "./User.js";
import Comment from "./Comment.js";
import Report from "./Reports.js";

const AnswerScheme = new mongoose.Schema(
  {
    authorID: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    content: {
      type: String,
      minlength: 1,
      maxlength: 300,
    },
    votes: {
      up: [
        {
          type: mongoose.Types.ObjectId,
          ref: User,
          required: true,
        },
      ],
      down: [
        {
          type: mongoose.Types.ObjectId,
          ref: User,
          required: true,
        },
      ],
    },
    verified: Boolean,
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: Comment,
        default: [],
      },
    ],
    reports: [
      {
        type: mongoose.Types.ObjectId,
        ref: Report,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model("Answer", AnswerScheme);

export default Answer;
