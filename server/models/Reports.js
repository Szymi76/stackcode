import mongoose from "mongoose";
import User from "./User.js";

const ReportsScheme = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: true,
    },
    text: String,
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
