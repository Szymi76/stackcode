import { Router } from "express";
import verifyTokens from "../middlewares/verifyTokens.js";

import addReport from "../controllers/addReport.js";

const router = Router();

// @POST
router.post("/add", verifyTokens, addReport);

export default router;
