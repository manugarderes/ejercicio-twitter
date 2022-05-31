const { Tweet } = require("../models/Tweet");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const controller = {
  showWelcome: (req, res) => {
    res.render("welcome");
  },
  showHome: async (req, res) => {
    const tweets = await Tweet.find().populate("author");
    console.log("esto es req.user", req.user);
    const { username, email } = req.user;
    res.render("home", { tweets, username, email });
  },
  showRegister: (req, res) => {
    res.render("register");
  },
  showLogin: (req, res) => {
    res.render("login");
  },

  showFailedLogin: (req, res) => {
    res.render("failedLogin");
  },
  createTweet: async (req, res) => {
    const user = await User.findOne();
    const { tweetInput } = req.body;
    const tweet = new Tweet({
      text: tweetInput,
      author: user.id, //Author Id de prueba !!, Hay que cambiarlo por req.user.id
    });
    tweet.save((error) => {
      if (error) res.sendStatus(500);
      res.redirect("/home");
    });
  },
  createUser: (req, res) => {
    const {
      firstName,
      lastName,
      username,
      email,
      desciption,
      profileImg,
      password,
    } = req.body;
    bcrypt.hash(password, 8, function (err, hash) {
      const user = new User({
        firstName,
        lastName,
        username,
        email,
        desciption,
        profileImg,
        password: hash,
      });
      user.save((error, savedUser) => {
        if (error) res.sendStatus(500);
        return savedUser;
      });
    });
  },
  login: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/failedLogin",
    })(req, res);
  },
};

module.exports = controller;
