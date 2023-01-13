import cookieOptions from "../config/cookieOptions.js";
import User from "../models/User.js";

const logout = async (req, res) => {
  const { refresh_token } = req.cookies;

  if (refresh_token) {
    const user = await User.findOne({ refreshTokens: refresh_token }).exec();
    if (user) {
      user.refreshTokens = user.refreshTokens.filter((t) => t != refresh_token);
      await user.save();
    }
  }

  req.clearCookie("access_token", cookieOptions);
  req.clearCookie("refresh_token", cookieOptions);
};

export default logout;
