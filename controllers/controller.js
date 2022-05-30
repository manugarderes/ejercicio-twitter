const { Tweet } = require("../models/Tweet");
const { User } = require("../models/User");
const bcrypt = require('bcryptjs');

const controller = {
  showWelcome: (req, res) => {
    res.render("welcome");
  },
  showHome: (req, res) => {
    res.render("home");
  },
  showRegister: (req, res) => {
    res.render("register");
  },
  createTweet: (req, res) => {
    const { tweetInput } = req.body;
    const tweet = new Tweet({
      text: tweetInput,
      author: "62951435c8ff23acd662739d", //Author Id de prueba !!, Hay que cambiarlo por req.user.id
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
      user.save((error) => {
        if (error) res.sendStatus(500);
        res.redirect("/home");
      });
    });
  },
};

module.exports = controller;
