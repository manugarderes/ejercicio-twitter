const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ejercicio-twitter");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String, 
    description: String,
    profileImg: String,
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

const User = mongoose.model("User", userSchema);

module.exports = {User}