import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import addComment from "../controllers/addComment.js";

const router = Router();

// @POST
router.post("/add", verifyTokens, addComment);

export default router;
