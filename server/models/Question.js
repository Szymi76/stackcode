import mongoose from "mongoose";
import User from "./User.js";
import Answer from "./Answer.js";
import Report from "./Reports.js";

const QuestionScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 40,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 300,
    },
    tags: {
      type: [String],
      default: [],
    },
    authorID: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    views: Number,
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

const Question = mongoose.model("Question", QuestionScheme);

export default Question;
