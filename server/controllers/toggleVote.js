import Question from "../models/Question.js";

const toggleVote = async (req, res) => {
  const { questionID, vote } = req.body;

  if (!questionID || !vote) return res.status(400).json({ message: "Required data is missing" });
  if (vote != "up" && vote != "down") return res.status(400).json({ message: "Vote is incorrect" });

  const question = await Question.findById(questionID).exec();

  if (!question)
    return res.status(404).json({ message: "Question with provided id does not exists" });

  const isContainUp = question.votes.up.includes(req.user._id);
  const isContainDown = question.votes.down.includes(req.user._id);

  if (vote == "up") {
    // głosowanie up, w momencie gdy głos jest już down
    if (isContainDown) {
      question.votes.up = [...question.votes.up, req.user._id];
      question.votes.down = question.votes.down.filter(
        (uid) => uid.toString() != req.user._id.toString()
      );
    } else {
      // głosowanie up, w momencie gdy głos down nie zawiera id
      question.votes.up = isContainUp
        ? question.votes.up.filter((uid) => uid.toString() != req.user._id.toString())
        : [...question.votes.up, req.user._id];
    }
  } else {
    // głosowanie down, w momencie gdy głos jest już up
    if (isContainUp) {
      question.votes.down = [...question.votes.down, req.user._id];
      question.votes.up = question.votes.down.filter(
        (uid) => uid.toString() != req.user._id.toString()
      );
      // głosowanie down, w momencie gdy głos up nie zawiera id
    } else {
      question.votes.down = isContainDown
        ? question.votes.down.filter((uid) => uid.toString() != req.user._id.toString())
        : [...question.votes.down, req.user._id];
    }
  }

  await question.save();

  return res.status(200).json({ message: "Vote was toggled" });
};

export default toggleVote;
