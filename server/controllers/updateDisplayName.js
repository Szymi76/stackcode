import formatError from "../utils/formatError.js";
import User from "../models/User.js";

const updateDisplayName = async (req, res, next) => {
  try {
    const { displayName } = req.body;
    if (!displayName) return res.status(400).json({ message: "Display name was not provided" });

    await User.findByIdAndUpdate(req.user._id, { displayName }).exec();
    req.user.displayName = displayName;
    req.result = { status: 200, message: "Display name was updated" };
    next();
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default updateDisplayName;
