"use strict";
const mongoose = require("mongoose");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");
const _ = require("lodash");

const PASSWORD_SALT_ROUNDS = 10;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId).then((user) => {
    done(null, user);
  });
});

exports.userSignin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        errors: [info.message],
      });
    }
    req.login(user, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), keys.cookieKey, {
        expiresIn: "1d",
      });
      const verifyToken = jwt.verify(token, keys.cookieKey);
      const { exp } = verifyToken;
      const crrentUser = {
        email: req.user.email,
        role: req.user.role,
      };
      res.status(200).json({ user: crrentUser, token: token, expiresIn: exp });
    });
  })(req, res);
};

exports.userSignup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    res.status(409).json({
      errors: [{ email: "User already existed!!!" }],
    });
  }

  const passwordHash = bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
  if (passwordHash) {
    const newUser = await new User({ email, password: passwordHash }).save();
    if (newUser) {
      const token = jwt.sign(
        {
          user: { id: newUser.id },
        },
        keys.cookieKey,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ user: user, token: token });
    }
  }
};
