import formatError from "../../utils/formatError.js";
import Answer from "../../models/Answer.js";

const toggleVerification = async (req, res) => {
  try {
    const { answerID } = req.body;
    if (!answerID) return res.status(400).json({ message: "Required data are missing" });

    if (!req.user.roles.includes("expert"))
      return res.status(401).json({ message: "You are not allowed to change verification to this answer" });

    const answer = await Answer.findById(answerID).exec();

    if (!answer) return res.status(404).json({ message: "Answer was not found" });

    await answer.toggleVerification();

    res.status(200).json({ message: "Answer verification was toggled" });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default toggleVerification;
