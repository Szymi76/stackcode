import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import path from "path";
import __dirname from "../../config/serverDir.js";
import formatError from "../../utils/formatError.js";

const verifyEmailToken = async (req, res) => {
  try {
    const { id, verifyToken } = req.params;

    // ścieżki do statycznych stron z informacją o udanej i nie udanej weryfikacji
    const pathToEmailVerified = path.join(__dirname, "views", "emailVerificationSuccessfull.html");
    const pathToEmailNotVerified = path.join(__dirname, "views", "emailVerificationFailure.html");

    // sprawdzanie czy w parametrach znajduje się id i token weryfikacyjny
    if (!id || !verifyToken) return res.status(400).sendFile(pathToEmailNotVerified);

    // weryfikacja tokena
    jwt.verify(verifyToken, process.env.VERIFY_TOKEN, async (err, decoded) => {
      if (err) return res.status(409).sendFile(pathToEmailNotVerified);

      // sprawdzanie czy id znajduję się w tokenie
      if (!decoded.id) return res.status(404).sendFile(pathToEmailNotVerified);

      // sprawdzanie czy id z parametrów i tokena pokrywają się
      if (decoded.id !== id) return res.status(409).sendFile(pathToEmailNotVerified);

      // wyszukiwanie użytkownika po id
      const user = await User.findById(id).exec();

      // sprawdzanie czy znalazł się użytkownik
      if (!user) return res.status(404).sendFile(pathToEmailNotVerified);

      // sprawdzanie czy email nie jest już przypadkiem zweryfikowany
      if (user.emailVerified === true) return res.status(409).sendFile(pathToEmailNotVerified);

      // aktualizacja użytkownika
      user.emailVerified = true;
      await user.save();

      res.status(200).sendFile(pathToEmailVerified);
    });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default verifyEmailToken;
