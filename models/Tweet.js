const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ejercicio-twitter");

const tweetSchema = new mongoose.Schema({
    text: String,
    author: String,
    date: {type: Date, default: Date.now}, 
    likes: Number
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = {Tweet}