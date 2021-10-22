const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = mongoose.model("users");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return done(null, user, { message: "Email and Password matched." });
        }
        return done(null, false, { message: "Password wrong." });
      });
    }
  )
);
