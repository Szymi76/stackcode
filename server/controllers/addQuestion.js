import Question from "../models/Question.js";
import uploadDeltaImages from "../utils/uploadDeltaImages.js";

const addQuestion = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content || !tags) return res.status(400).json({ message: "Required data is missing" });

    if (!content.ops || !Array.isArray(content.ops))
      return res.status(400).json({ message: "Delta has wrong structure" });

    const questionWithGivenTitle = await Question.findOne({ title }).exec();
    if (questionWithGivenTitle) return res.status(409).json({ message: "Question with provided title already exists" });

    // podmienienie każdego zdjęcia jako dataURL na link do prawdziwego pliku na serwerze
    const newContent = uploadDeltaImages(content);

    const link = title.replaceAll(" ", "-");

    const question = await new Question({ author: req.user._id, title, content: newContent, tags, link }).save();

    res.status(201).json({ question });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default addQuestion;
