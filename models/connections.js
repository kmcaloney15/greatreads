/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
require("dotenv").config(); // Load ENV Variables
const mongoose = require("mongoose");

/////////////////////////////////////////////
// Database Connection
/////////////////////////////////////////////
// Setup inputs for our connect function
const MONGODB_URI = process.env.MONGODB_URI;
const CONFIG = {
  useNewURLParser: true,
  useUnifiedTopology: true,
};

// const db = mongoose.connection //or could create this shortcut if called multiple times
// Establish Connection
mongoose.connect(MONGODB_URI, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
  .on("open", () => console.log("Connected to Mongoose"))
  .on('connected', () => console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`))
  .on("close", () => console.log("Disconnected from Mongoose"))
  .on("error", (error) => console.log(error))
  


////////////////////////////////////////////////////
// Export the Connection
////////////////////////////////////////////////////

module.exports = mongoose;
