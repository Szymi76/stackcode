import { Router } from "express";
import User from "../models/User.js";
import Report from "../models/Reports.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

const router = Router();

router.post("/test", async (req, res) => {
  const { authorID, text } = req.body;

  const report = await (
    await new Report({ authorID: "63c02699da086a58f6c5c94c", text: "Nie wiem" }).save()
  ).populate("authorID");

  res.status(201).json({ report });
});

router.post("/question", async (req, res) => {
  const { title, content, tags } = req.body;

  const newQuestion = await new Question({
    title,
    content,
    tags,
    authorID: "63c02699da086a58f6c5c94c",
    reports: ["63c02c24832fa3cd490f933c"],
  }).save();
  const result = await Question.findById(newQuestion._id)
    .populate([
      {
        path: "reports",
        populate: { path: "authorID" },
      },
      ,
      "authorID",
    ])
    .exec();

  res.status(201).json({ result });
});

router.post("/create-user", async (req, res) => {
  const { displayName, email, password } = req.body;

  const user = new User({ displayName, email, password });

  await user.save();

  res.status(201).json({ user });
});

export default router;
