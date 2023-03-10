import mongoose from "mongoose";

const DEFAULT_PHOTO_URL =
  "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM=";

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
      minLenght: 4,
      maxLength: 16,
    },
    email: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      required: true,
      default: DEFAULT_PHOTO_URL,
    },
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 60,
      select: false,
    },
    roles: {
      type: [String],
      required: true,
      default: ["user"],
    },
    emailVerified: {
      type: Boolean,
      require: true,
      default: false,
    },
    provider: {
      type: String,
      required: true,
      default: "local",
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    banned: {
      reason: {
        type: String,
        default: "",
      },
      by: {
        type: String,
        default: "",
      },
      until: {
        type: Date,
        default: "",
      },
    },
    refreshTokens: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;
