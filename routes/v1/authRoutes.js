const passport = require("passport");
const usersController = require("../../controllers/v1/users");
const multer = require("multer");
const authCheck = require("../../middlewares/authCheck");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.post(
    "/api/signup",
    upload.single("employeePic"),
    usersController.userSignup
  );

  app.post("/api/sign_in", usersController.userSignin);
};
