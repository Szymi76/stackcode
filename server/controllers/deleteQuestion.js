import Question from "../models/Question.js";

const deleteQuestion = async (req, res) => {
  const { questionID } = req.body;

  if (!questionID) return res.status(400).json({ message: "Question id was not provided" });

  await Question.findByIdAndRemove(questionID).exec();

  return res.status(200).json({ message: "Question was deleted" });
};

export default deleteQuestion;
