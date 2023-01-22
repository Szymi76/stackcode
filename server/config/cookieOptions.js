const cookieOptions = {
  httpOnly: process.env.NODE_ENV == "dev" ? false : true,
  sameSite: process.env.NODE_ENV == "dev" ? "Lax" : "None",
  secure: process.env.NODE_ENV == "dev" ? false : true,
};

export default cookieOptions;
