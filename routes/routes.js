const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/authenticated");

router.get("/", controller.showWelcome);
router.get("/home", isLoggedIn, controller.showHome);
router.get("/register", controller.showRegister);
router.get("/login", isNotLoggedIn, controller.showLogin);
router.get("/failedLogin", controller.showFailedLogin);

router.post("/tweet", isLoggedIn, controller.createTweet);
router.post("/register", controller.createUser);
router.post("/login", isNotLoggedIn, controller.login);
router.get("/logout", isLoggedIn, function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/home");
  });
});

module.exports = router;
