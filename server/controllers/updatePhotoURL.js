import User from "../models/User.js";
import formatError from "../utils/formatError.js";
import dataURLtoBlob from "../utils/dataURLtoBlob.js";
import uploadFileToGoogleDrive from "../utils/uploadFileToGoogleDrive.js";

const updatePhotoURL = async (req, res, next) => {
  try {
    const { photoURL } = req.body;
    if (!photoURL) return res.status(400).json({ message: "New photo url was not provided" });

    const filename = `${req.user._id}_profile_image.png`;
    const buffer = dataURLtoBlob(photoURL);
    const photoLink = await uploadFileToGoogleDrive(filename, buffer);
    if (!photoLink) return res.status(400).json({ message: "Something failed during convertion" });

    req.user.photoURL = photoLink;
    req.result = { status: 201, message: "Photo url was updated" };
    next();
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default updatePhotoURL;
