const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller")

router.get("/", controller.showWelcome)
router.get("/home", controller.showHome)

module.exports = router