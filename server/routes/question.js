import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import addNewQuestion from "../controllers/addNewQuestion.js";
import getQuestionByTitle from "../controllers/getQuestionByTitle.js";
import addComment from "../controllers/addComment.js";
import addAnswer from "../controllers/addAnswer.js";

const router = Router();

// @GET
router.get("/by-title/:title", getQuestionByTitle);

// @POST
router.post("/add", verifyTokens, addNewQuestion);
router.post("/add-comment", verifyTokens, addComment);
router.post("/add-answer", verifyTokens, addAnswer);

export default router;
