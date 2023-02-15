import User from "../../models/User.js";
import cookieOptions from "../../config/cookieOptions.js";
import formatError from "../../utils/formatError.js";

const DEFAULT_PHOTO_URL =
  "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM=";

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      active: false,
      displayName: "Usunięty użytkownik",
      email: "___deleted_user@gmail.com",
      photoURL: DEFAULT_PHOTO_URL,
    }).exec();

    res.clearCookie("access_token", cookieOptions);
    res.clearCookie("refresh_token", cookieOptions);
    res.status(200).json({ message: "User was deleted succesfully" });
  } catch (err) {
    res.status(500).json(formatError(err));
  }
};

export default deleteUser;
