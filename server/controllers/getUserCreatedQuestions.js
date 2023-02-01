import Question from "../models/Question.js";
import formatError from "../utils/formatError.js";

const getUserCreatedQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ author: req.user._id }).exec();

    res.status(200).json({ questions });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default getUserCreatedQuestions;
