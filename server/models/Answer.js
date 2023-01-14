import mongoose from "mongoose";
import User from "./User.js";
import Comment from "./Comment.js";
import Report from "./Reports.js";

const AnswerScheme = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    content: {
      type: Object,
      minlength: 1,
      maxlength: 300,
      required: true,
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
