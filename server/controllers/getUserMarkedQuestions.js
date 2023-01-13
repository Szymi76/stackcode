import mongoose from "mongoose";
import Question from "../models/Question.js";

const getUserMarkedQuestions = async (req, res) => {
  const id = req.user._id;

  const questions = await Question.find({ markedBy: id }).exec();

  res.status(200).json({ questions });
};

export default getUserMarkedQuestions;
