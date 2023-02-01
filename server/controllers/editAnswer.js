import Answer from "../models/Answer.js";
import uploadDeltaImages from "../utils/uploadDeltaImages.js";
import formatError from "../utils/formatError.js";

const editAnswer = async (req, res) => {
  try {
    const { answerID, content } = req.body;

    if (!answerID) return res.status(400).json({ message: "Answer id is required" });
    if (!content) return res.status(400).json({ message: "At least one property is required" });

    if (!content.ops || !Array.isArray(content.ops))
      return res.status(400).json({ message: "Delta has wrong structure" });

    const answer = await Answer.findById(answerID).exec();
    if (!answer) return res.status(404).json({ message: "Answer was not found" });

    // sprawdzanie czy autor chce edytować pytanie
    if (answer.author.toString() == req.user._id.toString()) {
      // sprawdzanie czy nowy kontent jest okej
      // const newContent = uploadDeltaImages(content);
      // if (newContent === null) return res.status(400).json({ message: "Something went wrong while uploading images" });
      // answer.content = newContent;

      answer.content = content;
      await answer.save();
      return res.status(200).json({ message: "Answer was edited successfully", answer });
    }

    return res.status(200).json({ message: "You are not allowed to delete this answer" });
  } catch (err) {
    console.log(err);
    res.status(500).json(formatError(err));
  }
};

export default editAnswer;
