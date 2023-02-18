import formatError from "../../utils/formatError.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

const verifyResetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    jwt.verify(resetToken, process.env.RESET_TOKEN, async (err, decoded) => {
      if (err) return res.status(401).json({ message: "Access Denided" });

      const { email } = decoded;

      const user = await User.findOne({ email }).select("+password").exec();

      if (newPassword.trim().length < 5) return res.status(400).json({ message: "New password is too short" });

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;

      await user.save();

      return res.status(200).json({ message: "Password was changed" });
    });

    //res.status(400).json({ message: "Something went wrong" });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default verifyResetPassword;
