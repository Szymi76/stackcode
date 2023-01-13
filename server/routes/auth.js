import { Router } from "express";
import User from "../models/User.js";
import Report from "../models/Reports.js";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import verifyLocal from "../middlewares/verifyLocal.js";
import login from "../controllers/login.js";
import verifyTokens from "../middlewares/verifyTokens.js";

import "../services/localStrategy.js";
import "../services/googleStrategy.js";
import register from "../controllers/register.js";
import passport from "passport";
import loginWithGoogle from "../controllers/loginWithGoogle.js";
import logout from "../controllers/logout.js";
import refresh from "../controllers/refresh.js";
import updateDisplayName from "../controllers/updateDisplayName.js";
import checkCookies from "../middlewares/checkCookies.js";

const router = Router();

//@GET
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/logout", logout);
router.get("/refresh", refresh);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  loginWithGoogle
);

// @POST
router.post("/login", verifyLocal, login);
router.post("/register", register);

// @PATCH
router.patch("/update-display-name", verifyTokens, updateDisplayName, checkCookies);

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
