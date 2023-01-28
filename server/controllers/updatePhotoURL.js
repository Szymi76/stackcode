import User from "../models/User.js";

const updatePhotoURL = async (req, res, next) => {
  try {
    const { photoURL } = req.body;
    if (!photoURL) return res.status(400).json({ message: "New photo url was not provided" });

    await User.findByIdAndUpdate(req.user._id, { photoURL }).exec();

    req.user.photoURL = photoURL;
    req.result = { status: 201, message: "Photo url was updated" };
    next();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default updatePhotoURL;
