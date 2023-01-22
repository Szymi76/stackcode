import mongoose from "mongoose";
import User from "./User.js";

const ReportsScheme = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    for: {
      type: String,
      required: true,
    },
    reasons: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", ReportsScheme);

export default Report;
