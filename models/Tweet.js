const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ejercicio-twitter");

const tweetSchema = new mongoose.Schema({
  text: String,
  author: String,
  date: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = { Tweet };
