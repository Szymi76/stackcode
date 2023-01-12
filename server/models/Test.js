import mongoose from "mongoose";
import User from "./User.js";

const TestSchema = new mongoose.Schema({
  authorID: {
    type: mongoose.Types.ObjectId,
    ref: User,
  },
  text: String,
});

const Test = mongoose.model("Test", TestSchema);

export default Test;
