import Question from "../models/Question.js";
import formatError from "../utils/formatError.js";

const getUserMarkedQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ markedBy: req.user._id }).exec();

    res.status(200).json({ questions });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default getUserMarkedQuestions;
