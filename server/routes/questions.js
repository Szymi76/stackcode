import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import getUserMarkedQuestions from "../controllers/questions/getMarkedByUser.js";
import getUserCreatedQuestions from "../controllers/questions/getCreatedByUser.js";
import findQuestions from "../controllers/questions/find.js";

const router = Router();

// @GET
router.get("/marked-by-user", verifyTokens, getUserMarkedQuestions);
router.get("/created-by-user", verifyTokens, getUserCreatedQuestions);
router.get("/search/:query", findQuestions);

export default router;
