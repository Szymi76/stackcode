import Answer from "../models/Answer.js";
import uploadDeltaImages from "../utils/uploadDeltaImages.js";

const editAnswer = async (req, res) => {
  try {
    const { answerID, content } = req.body;

    if (!answerID) return res.status(400).json({ message: "Answer id is required" });
    if (!content) return res.status(400).json({ message: "At least one property is required" });

    const answer = await Answer.findById(answerID).exec();

    if (!answer) return res.status(404).json({ message: "Answer was not found" });

    if (answer.author.toString() == req.user._id.toString()) {
      // sprawdzanie czy nowy kontent jest okej
      if (content && "ops" in content && Array.isArray(content.ops)) {
        const newContent = uploadDeltaImages(content);

        if (newContent === null)
          return res.status(400).json({ message: "Something went wrong while uploading images" });

        answer.content = newContent;
      }

      await answer.save();
      return res.status(200).json({ message: "Answer was edited successfully", answer });
    }

    return res.status(200).json({ message: "You are not allowed to delete this answer" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default editAnswer;
