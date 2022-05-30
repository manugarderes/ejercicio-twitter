const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller")

router.get("/", controller.showWelcome)
router.get("/home", controller.showHome)
router.get("/register", controller.showRegister)

router.post("/tweet", controller.createTweet)
router.post("/register", controller.createUser)

module.exports = router