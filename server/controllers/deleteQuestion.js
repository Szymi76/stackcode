import Question from "../models/Question.js";

const deleteQuestion = async (req, res) => {
  const { questionID } = req.body;

  if (!questionID) return res.status(400).json({ message: "Question id was not provided" });

  const question = await Question.findByIdAndRemove(questionID).exec();

  if (!question) return res.status(404).json({ message: "Question was not found" });

  if (question.author.toString() == req.user._id.toString() || req.user.role == "moderator") {
    await question.delete();
    return res.status(200).json({ message: "Question was deleted" });
  }

  return res.status(200).json({ message: "You are not allowed to delete this question" });
};

export default deleteQuestion;
