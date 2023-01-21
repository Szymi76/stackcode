import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import addQuestion from "../controllers/addQuestion.js";
import getQuestionById from "../controllers/getQuestionById.js";
import toggleVote from "../controllers/toggleQuestionVote.js";
import toogleMarked from "../controllers/toogleMarked.js";
import editQuestion from "../controllers/editQuestion.js";
import deleteQuestion from "../controllers/deleteQuestion.js";

const router = Router();

// @GET
router.get("/by-title/:id", getQuestionById);

// @POST
router.post("/add", verifyTokens, addQuestion);

// @PATCH
router.patch("/toggle-vote", verifyTokens, toggleVote);
router.patch("/toggle-marked", verifyTokens, toogleMarked);
router.patch("/edit", verifyTokens, editQuestion);

// @DELETE
router.delete("/delete", verifyTokens, deleteQuestion);

export default router;
