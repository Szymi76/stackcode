import Answer from "../models/Answer.js";
import Comment from "../models/Comment.js";

const addComment = async (req, res) => {
  const { answerID, content } = req.body;

  if (!answerID || !content) return res.status(400).json({ message: "Required data is missing" });

  const comment = await new Comment({ author: req.user._id, content }).save();

  const answer = await Answer.findById(answerID).exec();

  if (!answer) return res.status(404).json({ message: "Answer with provided id was not found" });

  answer.comments = [...answer.comments, comment._id];
  await answer.save();

  res.status(201).json({ message: "Comment was created" });
};

export default addComment;
