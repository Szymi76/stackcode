import mongoose from "mongoose";
import User from "./User.js";
import Comment from "./Comment.js";
import Report from "./Reports.js";
import toggleVote from "../utils/toggleVote.js";

const AnswerScheme = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    content: {
      type: String,
      minlength: 1,
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
    views: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
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

// zmiana głosu z up/down i zapisywanie zmiany w bazie
AnswerScheme.methods.toggleVote = async function (userID, vote) {
  toggleVote(this, vote, userID);
  return await this.save();
};

AnswerScheme.methods.toggleVerification = async function () {
  this.verified = !this.verified;
  return await this.save();
};

const Answer = mongoose.model("Answer", AnswerScheme);

export default Answer;
