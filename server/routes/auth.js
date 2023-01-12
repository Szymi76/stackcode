import { Router } from "express";
import User from "../models/User.js";
import Report from "../models/Reports.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import verifyLocal from "../middlewares/verifyLocal.js";
import login from "../controllers/login.js";

import "../services/localStrategy.js";
import register from "../controllers/register.js";

const router = Router();

//@GET

// @POST
router.post("/login", verifyLocal, login);
router.post("/register", register);

// router.post("/question", async (req, res) => {
//   const { title, content, tags } = req.body;

//   const newQuestion = await new Question({
//     title,
//     content,
//     tags,
//     authorID: "63c02699da086a58f6c5c94c",
//     reports: ["63c02c24832fa3cd490f933c"],
//   }).save();
//   const result = await Question.findById(newQuestion._id)
//     .populate([
//       {
//         path: "reports",
//         populate: { path: "authorID" },
//       },
//       ,
//       "authorID",
//     ])
//     .exec();

//   res.status(201).json({ result });
// });

export default router;
