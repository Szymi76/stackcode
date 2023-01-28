import User from "../models/User.js";
import { createAccessToken, createRefreshToken } from "../utils/createTokens.js";
import cookieOptions from "../config/cookieOptions.js";

const checkCookies = async (req, res, next) => {
  const { refresh_token } = req.cookies;
  const user = req.user;

  const payload = {
    id: user._id.toString(),
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    provider: user.provider,
    roles: user.roles,
    emailVerified: user.emailVerified,
  };

  const newAccessToken = createAccessToken(payload);
  const newRefreshToken = createRefreshToken({ id: user._id });

  // usuwanie uzytego refresh tokena i ustawienie nowego
  user.refreshTokens = [...user.refreshTokens.filter((t) => t !== refresh_token), newRefreshToken];
  await user.save();

  res.cookie("access_token", newAccessToken, cookieOptions);
  res.cookie("refresh_token", newRefreshToken, cookieOptions);

  const { status, message } = req.result;
  res.status(status).json({ user: payload });
};

export default checkCookies;
