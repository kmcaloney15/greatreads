/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////

const mongoose = require("./connections.js"); //same value as if left here but now passing through new file


////////////////////////////////////////////////
// Our Models
////////////////////////////////////////////////

// pull schema and model from mongoose
//   const Schema = mongoose.Schema
//   const model = mongoose.model
//how you can create both at the same time instead of having to create the two seperate above ^
const { Schema, model } = mongoose;

// make fruits schema
const reviewSchema = new Schema({
  // bookId: [{ type: Schema.Types.ObjectId, ref: "Book"}], //reference to the book model,
  // username: [{ type: Schema.Types.ObjectId, ref: "User"}], //reference to the user model,
  userPoster: String,
  reviewBody: String,
  rating: String,
})

// make review model
const Review = model("Review", reviewSchema);


///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Review;
