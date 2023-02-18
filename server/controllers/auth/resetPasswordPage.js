import formatError from "../../utils/formatError.js";
import __dirname from "../../config/serverDir.js";
import path from "path";

const resetPasswordPage = async (req, res) => {
  try {
    const pathToResetPasswordPage = path.join(__dirname, "views", "resetPassword.html");
    res.sendFile(pathToResetPasswordPage);
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default resetPasswordPage;
