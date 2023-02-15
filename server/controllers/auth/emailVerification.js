import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import formatError from "../../utils/formatError.js";

const emailVerification = async (req, res) => {
  try {
    const { id, email } = req.user;

    // otrzymanie aktualnego url serwera
    const { NODE_ENV, DEV_HOST_URL, PROD_HOST_URL } = process.env;
    const SERVER_URL = NODE_ENV === "dev" ? DEV_HOST_URL : PROD_HOST_URL;

    // token do weryfikacji emaila
    const verifyToken = jwt.sign({ id }, process.env.VERIFY_TOKEN, { expiresIn: 60 * 5 }); // 5 min

    // link do weryfikacji emaila oraz html
    const link = `${SERVER_URL}/api/auth/verify/${id}/${verifyToken}`;
    const html = `
    <h3>Kliknik w link poniżej aby zweryfikować adres email</h3>
    <a href=${link}>Kliknij tutaj</a>
  `;

    // wysyłanie emaila
    await sendEmail(email, "Weryfikacja emaila", "", html);

    res.status(200).json({ message: "Email was sent successfully" });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default emailVerification;
