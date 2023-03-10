import Answer from "../../models/Answer.js";
import Question from "../../models/Question.js";
import formatError from "../../utils/formatError.js";
// import uploadDeltaImages from "../utils/uploadDeltaImages.js";

const uploadAnswer = async (req, res) => {
  try {
    const { questionID, content } = req.body;

    if (!questionID || !content) return res.status(400).json({ message: "All field are required" });

    const answer = await new Answer({ author: req.user._id, content }).save();

    const question = await Question.findById(questionID).exec();
    if (!question) return res.status(404).json({ message: "Question with provided id does not exists" });

    question.answers = [...question.answers, answer._id];
    await question.save();

    const populateArr = [{ path: "author", select: "_id displayName email photoURL" }];

    const populatedAnswer = await answer.populate(populateArr);

    res.status(201).json({ answer: populatedAnswer });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default uploadAnswer;
