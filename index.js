const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const keys = require("./config/keys");
require("./models/User");
require("./models/Address");
require("./models/Organization");
require("./services/passport");
require("./services/jwt");
const authRoutes = require("./routes/v1/authRoutes");
const organizationRoutes = require("./routes/v1/organizationRoutes");

global.__basedir = __dirname;

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use("/uploads", express.static("public"));

app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
organizationRoutes(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);
