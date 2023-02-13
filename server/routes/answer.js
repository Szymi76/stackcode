import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import uploadAnswer from "../controllers/answer/upload.js";
import toggleAnswerVote from "../controllers/answer/toggleVote.js";
import editAnswer from "../controllers/answer/edit.js";
import deleteAnswer from "../controllers/answer/delete.js";

const router = Router();

// @POST
router.post("/add", verifyTokens, uploadAnswer);

// @PATCH
router.patch("/toggle-vote", verifyTokens, toggleAnswerVote);
router.patch("/edit", verifyTokens, editAnswer);

// @PATCH
router.delete("/delete", verifyTokens, deleteAnswer);

export default router;
