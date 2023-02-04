import Question from "../models/Question.js";
import formatError from "../utils/formatError.js";

const findQuestions = async (req, res) => {
  try {
    let { query } = req.params;
    if (!query) return res.status(400).json({ message: "Query was not provided or its empty" });

    query = query.replaceAll("-", " ");
    const regexp = new RegExp(`${query}`, "gi");
    const questions = await Question.find({ title: regexp }).exec();

    res.status(200).json({ questions });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default findQuestions;
