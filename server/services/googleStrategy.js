import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import __dirname from "../config/serverDir.js";
import path from "path";

config({ path: path.join(__dirname, ".env.local") });

const authGoogleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    proxy: true,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user) done(null, user);
      else {
        const hash = await bcrypt.hash(Math.random().toString(), 10);
        const newUser = new User({
          email: profile.emails[0].value,
          password: hash,
          displayName: profile.displayName,
          photoURL: profile.photos[0].value,
          provider: "google",
        }).save();

        done(null, newUser);
      }
    } catch (err) {
      done(new Error(err.toString()), null);
      console.log(err);
    }
  }
);

passport.use(authGoogleStrategy);