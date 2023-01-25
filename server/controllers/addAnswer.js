import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import uploadDeltaImages from "../utils/uploadDeltaImages.js";

const addAnswer = async (req, res) => {
  try {
    const { questionID, content } = req.body;

    if (!questionID || !content) return res.status(400).json({ message: "All field are required" });

    if (!content.ops || !Array.isArray(content.ops))
      return res.status(400).json({ message: "Delta have wrong structure" });

    // podmienienie każdego zdjęcia jako dataURL na link do prawdziwego pliku na serwerze
    // const newContent = uploadDeltaImages(content);

    const answer = await new Answer({ author: req.user._id, content: content }).save();

    const question = await Question.findById(questionID).exec();
    if (!question) return res.status(404).json({ message: "Question with provided id does not exists" });

    question.answers = [...question.answers, answer._id];
    await question.save();

    res.status(201).json({ answer });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default addAnswer;
