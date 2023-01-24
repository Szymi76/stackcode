import { Router } from "express";
import verifyLocal from "../middlewares/verifyLocal.js";
import verifyTokens from "../middlewares/verifyTokens.js";
import checkCookies from "../middlewares/checkCookies.js";

import login from "../controllers/login.js";
import register from "../controllers/register.js";
import passport from "passport";
import loginWithGoogle from "../controllers/loginWithGoogle.js";
import logout from "../controllers/logout.js";
import refresh from "../controllers/refresh.js";
import updateDisplayName from "../controllers/updateDisplayName.js";
import getUser from "../controllers/getUser.js";

import "../services/localStrategy.js";
import "../services/googleStrategy.js";

const router = Router();

//@GET
router.get("/user", verifyTokens, getUser);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/logout", logout);
router.get("/refresh", refresh);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  loginWithGoogle
);
router.get("/cookies", (req, res) => {
  const { access_token } = req.cookies;
  if (!access_token) return res.status(403).send("Access Denited");

  res.status(200).json({ access_token });
});

// @POST
router.post("/login", verifyLocal, login);
router.post("/register", register);

// @PATCH
router.patch("/update-display-name", verifyTokens, updateDisplayName, checkCookies);

export default router;
