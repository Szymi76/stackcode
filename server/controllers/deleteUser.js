import User from "../models/User.js";
import cookieOptions from "../config/cookieOptions.js";
import formatError from "../utils/formatError.js";

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { active: false }).exec();

    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
    res.status(200).json({ message: "User was deleted succesfully" });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default deleteUser;
