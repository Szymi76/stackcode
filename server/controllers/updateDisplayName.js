import User from "../models/User.js";

const updateDisplayName = async (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName) return res.status(400).json({ message: "Display name was not provided" });

  await User.findByIdAndUpdate(req.user._id, { displayName });

  // res.status(200).json({ message: "Display name was updated" });
  req.result = { status: 200, message: "Display name was updated" };
  next();
};

export default updateDisplayName;
