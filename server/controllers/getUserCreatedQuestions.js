import Question from "../models/Question.js";

const getUserCreatedQuestions = async (req, res) => {
  const id = req.user._id;

  const questions = await Question.find({ author: id }).exec();

  res.status(200).json({ questions });
};

export default getUserCreatedQuestions;
