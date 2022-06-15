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

// make books schema
const booksSchema = new Schema({
  title: String,
  image: String,
  author: String,
  series: String,
  hasRead: Boolean,
  library: Boolean,
  //reference to the review model
  reviews: [{ type: Schema.Types.ObjectId, ref: "Reviews"}],
});

// make book model
const Book = model("Book", booksSchema);


///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Book;
