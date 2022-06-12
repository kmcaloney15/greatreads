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

// //SEED
// //any time you go to this link, it will delete all data and then add in only the data listed below
// //used to test that database is working without having to create new create page, add in data and then test
router.get("/seed", (req, res) => {
  // array of starter fruits
  const startBooks = [
    { 
        title: "Little Women", 
        author: "Lousia May Alcott", 
        series: " ",
        // review: [] 
    },
    { 
        title: "Harry Potter and the Deathly Hallows", 
        author: "J.K. Rowling", 
        series: "Harry Potter",
        // review: false 
    },
    { 
        title: "The Hunger Games", 
        author: "Suzanne Collins", 
        series: "The Hunger Games",
        // review: false 
    },
    { 
        name: "A Game of Thrones", 
        author: "George R.R. Martin", 
        series: "A Song of Ice and Fire",
        // review: false 
    },
    { 
        name: "War and Peace", 
        author: "Leo Tolstoy", 
        series: "Classics",
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