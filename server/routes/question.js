import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import uploadQuestion from "../controllers/question/upload.js";
import getQuestionById from "../controllers/question/getById.js";
import toggleVote from "../controllers/question/toggleVote.js";
import toogleMarkedQuestion from "../controllers/question/toogleMarked.js";
import editQuestion from "../controllers/question/edit.js";
import deleteQuestion from "../controllers/question/delete.js";

const router = Router();

// @GET
router.get("/by-title/:id", getQuestionById);

// @POST
router.post("/add", verifyTokens, uploadQuestion);

// @PATCH
router.patch("/toggle-vote", verifyTokens, toggleVote);
router.patch("/toggle-marked", verifyTokens, toogleMarkedQuestion);
router.patch("/edit", verifyTokens, editQuestion);

// @DELETE
router.delete("/delete", verifyTokens, deleteQuestion);

export default router;
