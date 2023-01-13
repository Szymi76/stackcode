import Question from "../models/Question.js";
import uploadDeltaImages from "../utils/uploadDeltaImages.js";

const editQuestion = async (req, res) => {
  try {
    const { questionID, title, content, tags } = req.body;

    if (!questionID) return res.status(400).json({ message: "Question id is required" });
    if (!title && !content && !tags)
      return res.status(400).json({ message: "At least one property is required" });

    const question = await Question.findById(questionID).exec();

    // sprawdzanie czy nowy tytuł jest okej
    if (typeof title == "string" && title.trim().length > 0) {
      question.title = title;
    }

    // sprawdzanie czy nowy kontent jest okej
    if (content && "ops" in content && Array.isArray(content.ops)) {
      const newContent = uploadDeltaImages(content);

      if (newContent === null)
        return res.status(400).json({ message: "Somethinf went wrong went uploading images" });

      question.content = newContent;
    }

    // sprawdzanie czy nowe tagi jest okej
    if (Array.isArray(tags) && tags.length > 0) {
      question.tags = tags;
    }

    await question.save();

    res.status(200).json({ message: "Question was edited successfully", delta: question.content });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default editQuestion;
