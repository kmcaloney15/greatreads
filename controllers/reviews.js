////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Review = require("../models/review.js");

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
router.use((req, res, next) => {
  //now you can't access "/reviews" without logging in first
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/users/login");
  }
});

/////////////////////////////////////////
// Routes - all reviews routes specifically
/////////////////////////////////////////

router.get("/reviews", (req, res) => {
  res.render("reviews/index.liquid");
});

// Index Route / The Async/Await Method
// using this so I don't need to log in everytime
router.get("/", async (req, res) => {
    //async looks for any kind of awaits - async knows it has to wait for await to finsh running before it will run it's function
    const reviews = await Review.find({}); // Reviews.find({}) takes a long time to run
    // await has it wait a second allowing Reviews.find({}) to run before it runs allowing the data to be retrived from the database
    res.render("reviews/index.liquid", { reviews });
  });

// index route / will only show the loggin in user Reviews
// router.get("/", (req, res) => {
//     // find all the Reviews
//     Review.find({ username: req.session.username })
//       // render a template after they are found
//       .then((reviews) => {
//         console.log(reviews);
//         res.render("reviews/index.liquid", { reviews });
//       })
//       // send error as json if they aren't
//       .catch((error) => {
//         console.log(error);
//         res.json({ error });
//       });
//   });


// NEW - Get
//NEW ROUTE
//need id for books
router.get("/:id/new", (req, res) => {
  res.render("reviews/new");
});

// DELETE - Delete

// UPDATE - Put

// CREATE - Post
// need to grab the id of the book, then find the book by req.params.id, in id then push review into books.reviews
//create the route!!!
Review.create(req.body)
.then((newReview) => {
 Book.findByIdAndUpdate(id, {$push: { review: newReview}}) 
})

// EDIT - Get

// SHOW - Show







//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here