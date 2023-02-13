import { createAccessToken, createRefreshToken } from "../../utils/createTokens.js";
import cookieOptions from "../../config/cookieOptions.js";
import formatError from "../../utils/formatError.js";
import formatUser from "../../utils/formatUser.js";
import User from "../../models/User.js";

const loginWithGoogle = async (req, res) => {
  try {
    const CLIENT_URL = process.env.NODE_ENV == "dev" ? process.env.DEV_CLIENT_URL : process.env.PROD_CLIENT_URL;

    const payload = formatUser(req.user);

    const newAccessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken({ id: req.user._id });

    // aktualizowanie refresh tokenów
    const refreshTokens = [...req.user.refreshTokens, newRefreshToken];
    await User.findByIdAndUpdate(req.user._id, { refreshTokens });

    res.cookie("access_token", newAccessToken, cookieOptions);
    res.cookie("refresh_token", newRefreshToken, cookieOptions);

    res.redirect(CLIENT_URL);
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default loginWithGoogle;
