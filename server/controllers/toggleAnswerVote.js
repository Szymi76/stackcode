import Answer from "../models/Answer.js";

const toggleAnswerVote = async (req, res) => {
  const { answerID, vote } = req.body;

  if (!answerID || !vote) return res.status(400).json({ message: "Required data is missing" });
  if (vote != "up" && vote != "down") return res.status(400).json({ message: "Vote is incorrect" });

  const answer = await Answer.findById(answerID).exec();

  if (!answer) return res.status(404).json({ message: "Answer with provided id does not exists" });

  const isContainUp = answer.votes.up.includes(req.user._id);
  const isContainDown = answer.votes.down.includes(req.user._id);

  if (vote == "up") {
    // głosowanie up, w momencie gdy głos jest już down
    if (isContainDown) {
      answer.votes.up = [...answer.votes.up, req.user._id];
      answer.votes.down = answer.votes.down.filter(
        (uid) => uid.toString() != req.user._id.toString()
      );
    } else {
      // głosowanie up, w momencie gdy głos down nie zawiera id
      answer.votes.up = isContainUp
        ? answer.votes.up.filter((uid) => uid.toString() != req.user._id.toString())
        : [...answer.votes.up, req.user._id];
    }
  } else {
    // głosowanie down, w momencie gdy głos jest już up
    if (isContainUp) {
      answer.votes.down = [...answer.votes.down, req.user._id];
      answer.votes.up = answer.votes.down.filter(
        (uid) => uid.toString() != req.user._id.toString()
      );
      // głosowanie down, w momencie gdy głos up nie zawiera id
    } else {
      answer.votes.down = isContainDown
        ? answer.votes.down.filter((uid) => uid.toString() != req.user._id.toString())
        : [...answer.votes.down, req.user._id];
    }
  }

  await answer.save();

  return res.status(200).json({ message: "Vote was toggled" });
};

export default toggleAnswerVote;
