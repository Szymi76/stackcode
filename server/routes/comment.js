import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import uploadComment from "../controllers/comment/upload.js";

const router = Router();

// @POST
router.post("/add", verifyTokens, uploadComment);

export default router;
