import User from "../../models/User.js";
import formatError from "../../utils/formatError.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ message: "Required data are missing" });
    const user = await User.findById(req.user.id).select("+password").exec();

    const isMatching = await bcrypt.compare(oldPassword, user.password);

    if (!isMatching) return res.status(409).json({ message: "Password is incorrect" });

    if (newPassword.trim().length < 5) return res.status(400).json({ message: "New password is too short" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedNewPassword;
    await user.save();

    req.result = { status: 200, message: "Password was updated" };

    next();
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default changePassword;
