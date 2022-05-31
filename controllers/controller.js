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
    if (req.user) {
      const { firstName, username } = req.user;
      res.render("home", { tweets, firstName, username });
    } else {
      res.render("home", { tweets, firstName: "", username: "" });
    }
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
        req.login(savedUser, (err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/home");
          }
        });
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
