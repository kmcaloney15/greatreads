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
router.use((req, res, next) => {
  //now you can't access "/books" without logging in first
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/users/login");
  }
});

/////////////////////////////////////////
// Routes - all books routes specifically
/////////////////////////////////////////

//SEED
//any time you go to this link, it will delete all data and then add in only the data listed below
//used to test that database is working without having to create new create page, add in data and then test
router.get("/seed", (req, res) => {
  // array of starter fruits
  const startBooks = [
    { 
        title: "Orange", 
        author: "orange", 
        series: " ",
        // review: [] 
    },
    { 
        title: "Grape", 
        author: "purple", 
        series: " ",
        // review: false 
    },
    { 
        title: "Banana", 
        author: "orange", 
        series: " ",
        // review: false 
    },
    { 
        name: "Strawberry", 
        author: "red", 
        series: " ",
        // review: false 
    },
    { 
        name: "Coconut", 
        author: "brown", 
        series: " ",
        // review: false 
    },
  ];

  // Delete all books
  Book.deleteMany({}).then((data) => {
    // Seed Starter Books
    Book.create(startBooks).then((data) => {
      // send created books as response to confirm creation
      res.json(data); //returning json data on route page
    });
  });
});

// Index Route / The Async/Await Method

// index route / will only show the loggin in user fruits
router.get("/", (req, res) => {
    // find all the fruits
    Book.find({ username: req.session.username })
      // render a template after they are found
      .then((books) => {
        console.log(books);
        res.render("books/index.liquid", { books });
      })
      // send error as json if they aren't
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });








//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here