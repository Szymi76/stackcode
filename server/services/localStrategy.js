import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const authLocalStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    session: false,
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email: email.trim() }).select("+password").exec();
      if (!user) return done(null, false, { message: "User does not exists" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: "Password is incorect" });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

passport.use(authLocalStrategy);
