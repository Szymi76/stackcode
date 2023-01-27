import Question from "../models/Question.js";

const findQuestions = async (req, res) => {
  try {
    let { query } = req.params;
    if (!query) return res.status(400).json({ message: "Query was not provided or its empty" });

    query = query.toLocaleLowerCase();

    const words = query.split("-");
    const questions = await Question.find().select("title tags createdAt votes").exec();

    const result = questions.filter((q) => {
      const title = q.title.toLowerCase();
      if (words.some((w) => title.includes(w))) return true;
      if (title.startsWith(query)) return true;
      return false;
    });

    res.status(200).json({ questions: result });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default findQuestions;

// [1,2].inc
