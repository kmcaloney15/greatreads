////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Book = require("../models/book.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();
//change all instances of router. get etc, to router

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
// commenting this out so I can access all pages
// router.use((req, res, next) => {
//   //now you can't access "/books" without logging in first
//   if (req.session.loggedIn) {
//     next();
//   } else {
//     res.redirect("/users/login");
//   }
// });

/////////////////////////////////////////
// Routes - all books routes specifically
/////////////////////////////////////////

// Index Route / The Async/Await Method
// using this so I don't need to log in everytime
router.get("/", async (req, res) => {
    //async looks for any kind of awaits - async knows it has to wait for await to finsh running before it will run it's function
    const books = await Book.find({}); // Fruits.find({}) takes a long time to run
    // await has it wait a second allowing Fruits.find({}) to run before it runs allowing the data to be retrived from the database
    res.render("books/index.liquid", { books });
  });


// index route / will only show the loggin in user fruits
// router.get("/", (req, res) => {
//     // find all the fruits
//     Book.find({ username: req.session.username })
//       // render a template after they are found
//       .then((books) => {
//         console.log(books);
//         res.render("books/index.liquid", { books });
//       })
//       // send error as json if they aren't
//       .catch((error) => {
//         console.log(error);
//         res.json({ error });
//       });
//   });








//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here