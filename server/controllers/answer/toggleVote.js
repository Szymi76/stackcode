import Answer from "../../models/Answer.js";
import formatError from "../../utils/formatError.js";

const toggleAnswerVote = async (req, res) => {
  try {
    const { answerID, vote } = req.body;

    if (!answerID || !vote) return res.status(400).json({ message: "Required data is missing" });
    if (vote != "up" && vote != "down") return res.status(400).json({ message: "Vote is incorrect" });

    const answer = await Answer.findById(answerID).exec();

    if (!answer) return res.status(404).json({ message: "Answer with provided id does not exists" });

    await answer.toggleVote(req.user._id, vote);

    return res.status(200).json({ votes: answer.votes });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default toggleAnswerVote;
