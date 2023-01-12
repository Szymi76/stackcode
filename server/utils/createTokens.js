import jwt from "jsonwebtoken";

const createAccessToken = (payload) => {
  const expiresIn = 30; // 30 sekund
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn });
  return token;
};

const createRefreshToken = (payload) => {
  const expiresIn = 60; // 60 sekund
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn });
  return token;
};

export { createAccessToken, createRefreshToken };
