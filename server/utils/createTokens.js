import jwt from "jsonwebtoken";

const createAccessToken = (payload) => {
  const expiresIn = 10 * 60; // 10 minuty
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn });
  return token;
};

const createRefreshToken = (payload) => {
  const expiresIn = 20 * 60; // 20 minut
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn });
  return token;
};

export { createAccessToken, createRefreshToken };
