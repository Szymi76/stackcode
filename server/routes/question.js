import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import addNewQuestion from "../controllers/addNewQuestion.js";
import getQuestionByTitle from "../controllers/getQuestionByTitle.js";
import toggleVote from "../controllers/toggleVote.js";
import toogleMarked from "../controllers/toogleMarked.js";
import editQuestion from "../controllers/editQuestion.js";
import deleteQuestion from "../controllers/deleteQuestion.js";

const router = Router();

// @GET
router.get("/by-title/:title", getQuestionByTitle);

// @POST
router.post("/add", verifyTokens, addNewQuestion);

// @PATCH
router.patch("/toggle-vote", verifyTokens, toggleVote);
router.patch("/toggle-marked", verifyTokens, toogleMarked);
router.patch("/edit", verifyTokens, editQuestion);

// @DELETE
router.delete("/delete", verifyTokens, deleteQuestion);

export default router;
