import jwt from "jsonwebtoken";
import User from "../models/User.js";
import formatUser from "../utils/formatUser.js";
import formatError from "../utils/formatError.js";

const getUser = async (req, res) => {
  try {
    const { access_token, refresh_token } = req.cookies;

    const verifyAccessToken = jwt.verify(access_token, process.env.ACCESS_TOKEN);
    const verifyRefreshToken = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    const user = await User.findById(verifyAccessToken.id).exec();
    if (!user) return res.status(403).send("Access Denied");

    const payload = formatUser(user);

    res.status(200).json({ user: payload });
  } catch (err) {
    res.status(403).send("Access Denited");
  }
};

export default getUser;
