const cookieOptions = {
  httpOnly: process.env.NODE_ENV == "dev" ? false : true,
  sameSite: process.env.NODE_ENV == "dev" ? "Lax" : "None",
  secure: process.env.NODE_ENV == "dev" ? false : true,
  expires: new Date(+new Date() + 1000 * 60 * 60 * 24 * 30 * 3),
  // domain: ".onrender.com",
};

export default cookieOptions;
