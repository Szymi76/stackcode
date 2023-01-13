import User from "../models/User.js";
import jwt from "jsonwebtoken";
import cookieOptions from "../config/cookieOptions.js";
import { createAccessToken, createRefreshToken } from "../utils/createTokens.js";

const refresh = async (req, res) => {
  // pobranie refresh tokena z ciasteczek
  const { refresh_token } = req.cookies;

  // sprawdzenie czy znajduję się refresh token
  if (!refresh_token) return res.status(401).json({ message: "Refresh token was not provided" });

  // wyczysczenie ciasteczek
  res.clearCookie("refresh_token", cookieOptions);

  // znalezienie użytkownika po refresh tokenie
  const user = await User.findOne({ refreshTokens: refresh_token }).exec();

  // sprawdzanie czy istnieje użytkownik z takim refresh tokenem
  if (!user)
    return res.status(403).json({ message: "User with provided refresh token does not exists" });

  const filteredRefreshTokens = user.refreshTokens.filter((token) => token !== refresh_token);

  // sprawdzanie czy ktoś przypadkiem nie wykradł refresh tokena
  if (!user) {
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });

      const hackedUser = await User.findById(decoded.id).exec();
      hackedUser.refreshTokens = [];
      await hackedUser.save();
    });

    return res.status(403).json({ message: "Refresh token was probabliy stolen" });
  }

  jwt.verify(refresh_token, process.env.REFRESH_TOKEN, async (err, decoded) => {
    // usunięcie refresh tokena jeśli jest on nie ważny
    if (err) {
      user.refreshTokens = filteredRefreshTokens;
      await user.save();
    }

    // sprawdzanie czy to ten sam użytkownik
    if (err || user._id.toString() !== decoded.id)
      return res.status(403).json({ message: "Refresh token is expired" });

    // dane które znajdą się w nowym access tokenie
    const payload = {
      id: user._id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      provider: user.provider,
    };

    const accessToken = createAccessToken(payload);
    const newRefreshToken = createRefreshToken({ id: user._id });

    // aktualizacja refresh tokena w bazie danych
    user.refreshTokens = [...filteredRefreshTokens, newRefreshToken];
    await user.save();

    res.cookie("access_token", accessToken, cookieOptions);
    res.cookie("refresh_token", newRefreshToken, cookieOptions);

    res.status(200).json({ message: "Successfull refresh" });
  });
};

export default refresh;
