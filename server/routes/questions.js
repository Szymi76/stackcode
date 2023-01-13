import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import getUserMarkedQuestions from "../controllers/getUserMarkedQuestions.js";
import getUserCreatedQuestions from "../controllers/getUserCreatedQuestions.js";

const router = Router();

// @GET
router.get("/marked-by-user", verifyTokens, getUserMarkedQuestions);
router.get("/created-by-user", verifyTokens, getUserCreatedQuestions);

export default router;
