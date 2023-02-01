import cookieOptions from "../config/cookieOptions.js";
import formatError from "../utils/formatError.js";
import User from "../models/User.js";

const logout = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;

    if (refresh_token) {
      const user = await User.findOne({ refreshTokens: refresh_token }).exec();
      if (user) {
        user.refreshTokens = user.refreshTokens.filter((t) => t != refresh_token);
        await user.save();
      }
    }

    res.clearCookie("access_token", { ...cookieOptions, expires: new Date() });
    res.clearCookie("refresh_token", { ...cookieOptions, expires: new Date() });

    res.status(200).json({ message: "You got logged out successfully" });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default logout;
