const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/authenticated");

router.get("/", controller.showWelcome);
router.get("/home", isLoggedIn, controller.showHome);
router.get("/register", isNotLoggedIn, controller.showRegister);
router.get("/login", isNotLoggedIn, controller.showLogin);
router.get("/failedLogin", controller.showFailedLogin);
router.get("/profile", isLoggedIn, controller.showProfile);
router.get("/profile/:id", isLoggedIn, controller.showOtherProfile);
router.get("/follow/:id", isLoggedIn, controller.followUser);
router.get("/unfollow/:id", isLoggedIn, controller.unfollowUser);

router.post("/tweet", isLoggedIn, controller.createTweet);
router.post("/register", isNotLoggedIn, controller.createUser);
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
