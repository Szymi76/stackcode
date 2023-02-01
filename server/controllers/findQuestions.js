import Question from "../models/Question.js";
import formatError from "../utils/formatError.js";

const findQuestions = async (req, res) => {
  try {
    let { query } = req.params;
    if (!query) return res.status(400).json({ message: "Query was not provided or its empty" });

    query = query.toLocaleLowerCase();

    const words = query.split("-");
    const questions = await Question.find().select("title tags createdAt votes").exec();

    // wyszukiwanie pytań po konkretnych słowach i zapytania które zaczyna się tak samo jak pytanie
    const result = questions.filter((q) => {
      const title = q.title.toLowerCase();
      if (words.some((w) => title.includes(w))) return true;
      if (title.startsWith(query)) return true;
      return false;
    });

    res.status(200).json({ questions: result });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default findQuestions;
