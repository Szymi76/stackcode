import Question from "../../models/Question.js";
import formatError from "../../utils/formatError.js";

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id in params was not provided" });

    const question = await Question.findById(id).exec();

    if (!question) return res.status(404).json({ message: "Question not found" });

    const populateArr = [
      { path: "author", select: "displayName email photoURL" },
      {
        path: "answers",
        populate: [
          { path: "author", select: "displayName email photoURL" },
          {
            path: "comments",
            populate: {
              path: "author",
              select: "displayName email photoURL",
            },
          },
        ],
      },
    ];

    const populatedQuestion = await question.populate(populateArr);

    return res.status(200).json({ question: populatedQuestion });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default getQuestionById;
