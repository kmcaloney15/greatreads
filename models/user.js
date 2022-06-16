//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connections");


////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose; //declairing both at the same time

// make user schema
const userSchema = new Schema ({
    username: {type: String, required: true, unique: true,}, //can't have someone else's username
    password: { type: String, required: true,},
    //want to display the books that they have read
    hasRead: Boolean,
    // bookshelf: ,
    review: [{ type: Schema.Types.ObjectId, ref: "Review"}],
    profilePic: String,
});

// make user model
const User = model("User", userSchema); //in "User" collection and using userSchema to build it

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = User;


