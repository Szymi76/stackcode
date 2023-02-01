import Question from "../models/Question.js";
import formatError from "../utils/formatError.js";

const toogleMarked = async (req, res) => {
  try {
    const { questionID } = req.body;

    if (!questionID) return res.status(400).json({ message: "Question id was not provided" });

    const question = await Question.findById(questionID).exec();

    if (!question) return res.status(404).json({ message: "Question with provided id was not found" });

    await question.toggleMarked(req.user._id);

    res.status(200).json({ markedBy: question.markedBy });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default toogleMarked;
