import { createAccessToken, createRefreshToken } from "../../utils/createTokens.js";
import cookieOptions from "../../config/cookieOptions.js";
import formatError from "../../utils/formatError.js";
import formatUser from "../../utils/formatUser.js";
import bcrypt from "bcrypt";
import User from "../../models/User.js";

const register = async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) return res.status(400).json({ message: "Required data is missing" });

    const foundUser = await User.findOne({ email });
    if (foundUser) return res.status(409).json({ message: "User with provided email already exists", status: 409 });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await new User({
      email,
      password: hashPassword,
      displayName,
      provider: "local",
    }).save();

    const payload = formatUser(user);

    const newAccessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken({ id: user._id });

    // aktualizowanie refresh tokenów
    user.refreshTokens = [newRefreshToken];
    await user.save();

    res.cookie("access_token", newAccessToken, cookieOptions);
    res.cookie("refresh_token", newRefreshToken, cookieOptions);

    res.status(200).json({ user: payload });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default register;
