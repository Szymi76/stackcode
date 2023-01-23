import cookieOptions from "../config/cookieOptions.js";
import User from "../models/User.js";
import { createAccessToken, createRefreshToken } from "../utils/createTokens.js";

const loginWithGoogle = async (req, res) => {
  const CLIENT_URL = process.env.NODE_ENV == "dev" ? process.env.DEV_CLIENT_URL : process.env.PROD_CLIENT_URL;

  const payload = {
    id: req.user._id,
    displayName: req.user.displayName,
    email: req.user.email,
    photoURL: req.user.photoURL,
    provider: req.user.provider,
    roles: req.user.roles,
    emailVerified: req.user.emailVerified,
  };

  const newAccessToken = createAccessToken(payload);
  const newRefreshToken = createRefreshToken({ id: req.user._id });

  // aktualizowanie refresh tokenów
  const refreshTokens = [...req.user.refreshTokens, newRefreshToken];
  await User.findByIdAndUpdate(req.user._id, { refreshTokens });

  res.cookie("access_token", newAccessToken, cookieOptions);
  res.cookie("refresh_token", newRefreshToken, cookieOptions);

  res.redirect(CLIENT_URL);
};

export default loginWithGoogle;
