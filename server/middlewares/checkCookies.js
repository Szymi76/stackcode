import User from "../models/User.js";
import { createAccessToken, createRefreshToken } from "../utils/createTokens.js";
import cookieOptions from "../config/cookieOptions.js";

const checkCookies = async (req, res, next) => {
  const { refresh_token } = req.cookies;
  const id = req.user._id;
  const user = await User.findById(id).exec();

  const userFromRefreshToken = await User.findOne({ refreshTokens: refresh_token });

  // sprawdzanie czy ktoś inny też nie ma takiego samego refresh tokena
  if (id.toString() !== userFromRefreshToken._id.toString()) {
    userFromRefreshToken.refreshTokens = [];
    await userFromRefreshToken.save();
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    next();
    return;
  }

  const payload = {
    id: user._id.toString(),
    displayName: user.displayName,
    email: user.email,
    provider: user.provider,
    photoURL: user.photoURL,
  };

  const newAccessToken = createAccessToken(payload);
  const newRefreshToken = createRefreshToken(id);

  // usuwanie uzytego refresh tokena i ustawienie nowego
  user.refreshTokens = [...user.refreshTokens.filter((t) => t !== refresh_token), newRefreshToken];
  await user.save();

  res.cookie("access_token", newAccessToken, cookieOptions);
  res.cookie("refresh_token", newRefreshToken, cookieOptions);

  next();
};

export default checkCookies;
