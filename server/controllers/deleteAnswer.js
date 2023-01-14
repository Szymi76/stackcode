import Answer from "../models/Answer.js";

const deleteAnswer = async (req, res) => {
  const { answerID } = req.body;

  if (!answerID) return res.status(400).json({ message: "Answer id was not provided" });

  const answer = await Answer.findById(answerID).exec();

  if (!answer) return res.status(404).json({ message: "Answer was not found" });

  if (answer.author.toString() == req.user._id.toString() || req.user.role == "moderator") {
    await answer.delete();
    return res.status(200).json({ message: "Answer was deleted" });
  }

  return res.status(200).json({ message: "You are not allowed to delete this answer" });
};

export default deleteAnswer;
