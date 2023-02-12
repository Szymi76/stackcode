import Question from "../models/Question.js";
import formatError from "../utils/formatError.js";
// import uploadDeltaImages from "../utils/uploadDeltaImages.js";

const addQuestion = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content || !tags) return res.status(400).json({ message: "Required data is missing" });

    console.log(typeof content);

    const questionWithGivenTitle = await Question.findOne({ title }).exec();
    if (questionWithGivenTitle) return res.status(409).json({ message: "Question with provided title already exists" });

    const question = await new Question({ author: req.user._id, title, content, tags }).save();

    res.status(201).json({ question });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default addQuestion;
