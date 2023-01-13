import jwt from "jsonwebtoken";

const createAccessToken = (payload) => {
  const expiresIn = 6 * 30; // 3 minuty
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn });
  return token;
};

const createRefreshToken = (payload) => {
  const expiresIn = 12 * 60; // 6 minut
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn });
  return token;
};

export { createAccessToken, createRefreshToken };
