import mongoose from "mongoose";
import User from "./User.js";
import Answer from "./Answer.js";
import Report from "./Reports.js";
import toggleVote from "../utils/toggleVote.js";

const QuestionScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 80,
      unique: true,
    },
    content: {
      type: Object,
      required: true,
      minLength: 1,
      maxLength: 300,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
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
    markedBy: [
      {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: true,
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
    answers: [
      {
        type: mongoose.Types.ObjectId,
        ref: Answer,
        required: true,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// zmiana głosu z up/down i zapisywanie zmiany w bazie
QuestionScheme.methods.toggleVote = async function (userID, vote) {
  toggleVote(this, vote, userID);
  return await this.save();
};

// zmiana zaznaczonego pytania
QuestionScheme.methods.toggleMarked = async function (userID) {
  const isContainUser = this.markedBy.includes(userID);
  this.markedBy = isContainUser
    ? this.markedBy.filter((id) => id.toString() != userID.toString())
    : (this.markedBy = [...this.markedBy, userID]);

  await this.save();
};

const Question = mongoose.model("Question", QuestionScheme);

export default Question;
