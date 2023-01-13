import { Router } from "express";
import addNewQuestion from "../controllers/addNewQuestion.js";
import verifyTokens from "../middlewares/verifyTokens.js";

const router = Router();

// @POST
router.post("/add", verifyTokens, addNewQuestion);

export default router;
