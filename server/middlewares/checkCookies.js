import { createAccessToken, createRefreshToken } from "../utils/createTokens.js";
import cookieOptions from "../config/cookieOptions.js";
import formatUser from "../utils/formatUser.js";
import formatError from "../utils/formatError.js";

const checkCookies = async (req, res, next) => {
  try {
    const { refresh_token } = req.cookies;

    const payload = formatUser(req.user);

    const newAccessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken({ id: req.user._id });

    // usuwanie uzytego refresh tokena i ustawienie nowego
    user.refreshTokens = [...user.refreshTokens.filter((t) => t !== refresh_token), newRefreshToken];
    await req.user.save();

    res.cookie("access_token", newAccessToken, cookieOptions);
    res.cookie("refresh_token", newRefreshToken, cookieOptions);

    const { status, message } = req.result;
    res.status(status).json({ user: payload });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default checkCookies;
