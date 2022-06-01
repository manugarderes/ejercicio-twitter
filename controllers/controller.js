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
      const { firstName, username, _id } = req.user;
      res.render("home", { tweets, firstName, username, _id });
    } else {
      res.render("home", { tweets, firstName: "", username: "", _id : ''});
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
      own : true,
      including : false
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
    const myUser = await User.findById(req.user.id).populate("following");
    const { firstName, username, followers, following } = user;
    var including = false;
    for(const following of myUser.following){
      if (following.id === req.params.id) {
        including = true
      }
    }
    res.render("profile", {
      tweets,
      firstName,
      username,
      followers: followers,
      following: following,
      own : false,
      including
    });
  },
  followUser: async (req, res) => {
    const userToFollow = await User.findById(req.params.id)
    const myUser = await User.findById(req.user.id)
    await userToFollow.updateOne({followers : [...userToFollow.followers, myUser]})
    await myUser.updateOne({following : [...myUser.following, userToFollow]})
    res.send(userToFollow.followers)
  },
  unfollowUser: async (req, res) => {
    const userToUnFollow = await User.findById(req.params.id).populate("followers")
    const myUser = await User.findById(req.user.id).populate("following")
    newFollowersArray = []
    userToUnFollow.followers.map((follower) => {
      if (follower.id !== myUser.id) {
        newFollowersArray.push(follower)
      }
    })
    newFollowingArray = []
    myUser.following.map((follow) => {
      if (follow.id !== userToUnFollow.id) {
        newFollowingArray.push(follow)
      }
    })

    await userToUnFollow.updateOne({followers : newFollowersArray})
    await myUser.updateOne({following : newFollowingArray})
  },
  addLike: async (req, res) => {
    const myUser = await User.findById(req.user.id);
    const tweetToLike = await Tweet.findById(req.params.id);
    if (!tweetToLike.likes.includes(myUser._id)) {
      await tweetToLike.updateOne({ likes: [...tweetToLike.likes, myUser] });
    } else {
      const tweetToLikeLikesUpdated = tweetToLike.likes.filter(
        (userToDelete) => {
          userToDelete !== myUser._id;
        }
      );
      await tweetToLike.updateOne({ likes: [...tweetToLikeLikesUpdated] });
    }
    res.redirect("/home");
  },
  deleteTweet: async (req, res) => {
    const tweet = await Tweet.findById(req.params.id);
    await tweet.delete();
    res.redirect("/profile");
  }
};

module.exports = controller;
