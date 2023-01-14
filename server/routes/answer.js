import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import addAnswer from "../controllers/addAnswer.js";
import toggleAnswerVote from "../controllers/toggleAnswerVote.js";
import editAnswer from "../controllers/editAnswer.js";
import deleteAnswer from "../controllers/deleteAnswer.js";

const router = Router();

// @POST
router.post("/add", verifyTokens, addAnswer);

// @PATCH
router.patch("/toggle-vote", verifyTokens, toggleAnswerVote);
router.patch("/edit", verifyTokens, editAnswer);

// @PATCH
router.delete("/delete", verifyTokens, deleteAnswer);

export default router;
