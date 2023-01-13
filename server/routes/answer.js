import { Router } from "express";
import addAnswer from "../controllers/addAnswer.js";

import verifyTokens from "../middlewares/verifyTokens.js";

const router = Router();

router.post("/add", verifyTokens, addAnswer);

export default router;
