import Question from "../models/Question.js";

const toogleMarked = async (req, res) => {
  const { questionID } = req.body;

  if (!questionID) return res.status(400).json({ message: "Question id was not provided" });

  const question = await Question.findById(questionID).exec();

  if (!question) return res.status(404).json({ message: "Question with provided id was not found" });

  const isContain = question.markedBy.includes(req.user._id);
  question.markedBy = isContain
    ? question.markedBy.filter((uid) => uid.toString() != req.user._id.toString())
    : [...question.markedBy, req.user._id];

  await question.save();

  res.status(200).json({ markedBy: question.markedBy });
};

export default toogleMarked;
