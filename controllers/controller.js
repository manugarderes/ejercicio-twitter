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
      author: req.user.id, //Author Id de prueba !!, Hay que cambiarlo por req.user.id
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
  showProfile: async (req, res) => {
    const tweets = await Tweet.find({ author: req.user.id }).populate("author");
    const { firstName, username, followers, following } = req.user;
    res.render("profile", {
      tweets,
      firstName,
      username,
      followers: followers,
      following: following,
      own : true
    });
  },
  showOtherProfile: async (req, res) => {
    if (req.params.id === req.user.id) {
      res.redirect("/profile")
    }
    const tweets = await Tweet.find({ author: req.params.id }).populate(
      "author"
    );
    const user = await User.findById(req.params.id).populate("followers");
    const { firstName, username, followers, following } = user;
    res.render("profile", {
      tweets,
      firstName,
      username,
      followers: followers,
      following: following,
      own : false
    });
  },
  followUser: async (req, res) => {
    const userToFollow = await User.findById(req.params.id)
    const myUser = await User.findById(req.user.id)
    await userToFollow.updateOne({followers : [...userToFollow.followers, myUser]})
    await myUser.updateOne({following : [...myUser.following, userToFollow]})
    res.send(userToFollow.followers)
  }
};

module.exports = controller;
