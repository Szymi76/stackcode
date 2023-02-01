import Answer from "../models/Answer.js";
import Comment from "../models/Comment.js";
import formatError from "../utils/formatError.js";

const addComment = async (req, res) => {
  try {
    const { answerID, content } = req.body;

    if (!answerID || !content) return res.status(400).json({ message: "Required data is missing" });

    const comment = await new Comment({ author: req.user._id, content }).save();
    const answer = await Answer.findById(answerID).exec();

    if (!answer) return res.status(404).json({ message: "Answer with provided id was not found" });

    answer.comments = [...answer.comments, comment._id];
    await answer.save();

    const populateArr = [{ path: "author", select: "displayName email photoURL" }];
    const populatedComment = await comment.populate(populateArr);

    res.status(201).json({ comment: populatedComment });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default addComment;
