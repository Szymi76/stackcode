import jwt from "jsonwebtoken";

// const ACCESS_TOKEN_EXPIRES_IN = 60 * 8; // 8 minut
// const REFRESH_TOKEN_EXPIRES_IN = 60 * 30; // 30 minut
const ACCESS_TOKEN_EXPIRES_IN = 10; // 10 sekund
const REFRESH_TOKEN_EXPIRES_IN = 20; // 20 sekund

const createAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  return token;
};

const createRefreshToken = (payload) => {
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  return token;
};

export { createAccessToken, createRefreshToken };
