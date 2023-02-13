import Question from "../../models/Question.js";
import formatError from "../../utils/formatError.js";

const toggleQuestionVote = async (req, res) => {
  try {
    const { questionID, vote } = req.body;

    if (!questionID || !vote) return res.status(400).json({ message: "Required data is missing" });
    if (vote != "up" && vote != "down") return res.status(400).json({ message: "Vote is incorrect" });

    const question = await Question.findById(questionID).exec();

    if (!question) return res.status(404).json({ message: "Question with provided id does not exists" });

    await question.toggleVote(req.user._id, vote);

    return res.status(200).json({ votes: question.votes });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default toggleQuestionVote;
