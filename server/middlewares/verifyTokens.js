import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyTokens = async (req, res, next) => {
  try {
    const { access_token, refresh_token } = req.cookies;
    // if (!access_token || !refresh_token) return res.status(403).send("Access Denied");

    const verifyAccessToken = jwt.verify(access_token, process.env.ACCESS_TOKEN);
    const verifyRefreshToken = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

    // if (!verifyAccessToken || !verifyRefreshToken) return res.status(403).send("Access Denied");

    const user = await User.findById(verifyAccessToken.id).exec();
    if (!user) return res.status(403).send("Access Denied");

    req.user = user;
    next();
  } catch (err) {
    res.status(403).send("Access Denied");
  }
};

export default verifyTokens;
