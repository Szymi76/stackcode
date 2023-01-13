import Question from "../models/Question.js";

const getQuestionByTitle = async (req, res) => {
  const { title } = req.params;
  if (!title) return res.status(400).json({ message: "Title in  params was not provided" });

  const question = await Question.findOne({ title }).exec();

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
};

export default getQuestionByTitle;
