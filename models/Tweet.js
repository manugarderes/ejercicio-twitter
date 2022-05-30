const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ejercicio-twitter");

const tweetSchema = new mongoose.Schema({
    text: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date: {type: Date, default: Date.now}, 
    likes: {type: Number, default: 0}, 
});

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = {Tweet}