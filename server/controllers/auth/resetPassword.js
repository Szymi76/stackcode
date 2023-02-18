import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import formatError from "../../utils/formatError.js";

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // otrzymanie aktualnego url serwera
    const { NODE_ENV, DEV_HOST_URL, PROD_HOST_URL } = process.env;
    const SERVER_URL = NODE_ENV === "dev" ? DEV_HOST_URL : PROD_HOST_URL;

    // token do weryfikacji emaila
    const resetToken = jwt.sign({ email }, process.env.RESET_TOKEN, { expiresIn: 60 * 5 }); // 5 min

    // link do weryfikacji emaila oraz html
    const link = `${SERVER_URL}/api/auth/reset/${resetToken}`;
    const html = `
    <h3>Kliknik w link poniżej aby zresetować hasło</h3>
    <a href=${link}>Kliknij tutaj</a>
  `;

    // wysyłanie emaila
    await sendEmail(email, "Resetowanie hasła", "", html);

    res.status(200).json({ message: "Email was sent successfully" });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default resetPassword;
