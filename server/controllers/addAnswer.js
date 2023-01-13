import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

const addAnswer = async (req, res) => {
  const { questionID, content } = req.body;

  if (!questionID || !content) return res.status(400).json({ message: "All field are required" });

  const answer = await new Answer({ author: req.user._id, content }).save();

  const question = await Question.findById(questionID).exec();
  if (!question)
    return res.status(404).json({ message: "Question with provided id does not exists" });

  question.answers = [...question.answers, answer._id];
  await question.save();

  res.status(201).json({ message: "Answer was added" });
};

export default addAnswer;
