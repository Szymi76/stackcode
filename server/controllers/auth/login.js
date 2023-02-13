import { createAccessToken, createRefreshToken } from "../../utils/createTokens.js";
import cookieOptions from "../../config/cookieOptions.js";
import formatUser from "../../utils/formatUser.js";
import formatError from "../../utils/formatError.js";
import User from "../../models/User.js";

const login = async (req, res) => {
  try {
    // sprawdzanie czy użytkownik posiada aktywne konto
    if (!req.user.active) return res.status(404).json({ status: 404, message: "User was not found" });

    // sprawdzanie czy użytkownik jest zbanoway
    if (req.user.bannedTo > new Date())
      return res.status(401).json({ message: `You are banned to: ${new Date(req.user.bannedTo).toISOString()}` });

    const payload = formatUser(req.user);

    const newAccessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken({ id: req.user._id });

    // aktualizowanie refresh tokenów
    const refreshTokens = [...req.user.refreshTokens, newRefreshToken];
    await User.findByIdAndUpdate(req.user._id, { refreshTokens });

    res.cookie("access_token", newAccessToken, cookieOptions);
    res.cookie("refresh_token", newRefreshToken, cookieOptions);

    res.status(200).json({ user: payload });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default login;
