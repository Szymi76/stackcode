import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import uploadReport from "../controllers/report/upload.js";

const router = Router();

// @POST
router.post("/add", verifyTokens, uploadReport);

export default router;
