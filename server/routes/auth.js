import { Router } from "express";
import verifyLocal from "../middlewares/verifyLocal.js";
import verifyTokens from "../middlewares/verifyTokens.js";
import checkCookies from "../middlewares/checkCookies.js";

import login from "../controllers/auth/login.js";
import register from "../controllers/auth/register.js";
import passport from "passport";
import loginWithGoogle from "../controllers/auth/loginWithGoogle.js";
import logout from "../controllers/auth/logout.js";
import refresh from "../controllers/auth/refresh.js";
import updateDisplayName from "../controllers/auth/updateDisplayName.js";
import updatePhotoURL from "../controllers/auth/updatePhotoURL.js";
import getUser from "../controllers/auth/getUser.js";
import changePassword from "../controllers/auth/changePassword.js";
import deleteUser from "../controllers/auth/deleteUser.js";

import "../services/localStrategy.js";
import "../services/googleStrategy.js";

const router = Router();

//@GET
router.get("/user", getUser);
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

// @POST
router.post("/login", verifyLocal, login);
router.post("/register", register);

// @PATCH
router.patch("/update-display-name", verifyTokens, updateDisplayName, checkCookies);
router.patch("/update-photo-url", verifyTokens, updatePhotoURL, checkCookies);
router.patch("/change-password", verifyTokens, changePassword, checkCookies);

// @DELETE
router.delete("/delete-user", verifyTokens, deleteUser);

export default router;
