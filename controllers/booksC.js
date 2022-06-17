////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const Book = require("../models/book.js");
const Review = require("../models/review.js");
const User = require("../models/user.js")

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
  //now you can't access "/books" without logging in first
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/users/login")
  }
})

/////////////////////////////////////////
// Routes - all books routes specifically
/////////////////////////////////////////

// Index Route / The Async/Await Method
// using this so I don't need to log in everytime
router.get("/", async (req, res) => {
  Book.find({})
  .then(books => {
    res.render("books/index", {books})
  })
  .catch((error) => {
    console.log(error)
    res.json({ error })
  })
})


// UPDATE - Put
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the hasRead property should be true or false
  req.body.hasRead = req.body.hasRead === "on" ? true : false;
  // update the book
  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then((book) => {
      // redirect to main page after updating
      res.redirect("/books/show");
    })
    // send error as json
    .catch((error) => {
      console.log(error)
      res.json({ error })
    })
})

// CREATE - Post

// new review
router.post("/:id/review", (req, res) => {
  // const username = req.session.username;
  const id = req.params.id; //book id
  // console.log("this is the " + id)
  console.log(req.body.hasRead)

  // req.body.username = req.session.username
  req.body.hasRead = !!req.body.hasRead // this switches hasRead from false to true
    console.log(req.body.hasRead)
    let newReview = {
      reviewBody: req.body.reviewBody,
      rating: req.body.rating,
      userPoster: req.session.username,
      hasRead: req.body.hasRead
    }
        console.log(newReview)

  Review.create(newReview)
  .then((review) => {
    console.log(review)
    review.save()
    res.redirect(`/books/`)
    return Book.findByIdAndUpdate(id, { $push: { reviews: review}}, {new: true})

  }) 
})

// EDIT - Get
router.get("/:id/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the database
  Book.findById(id)
    .then((book) => {
      // render edit page and send fruit data
      res.render("books/show", { book });
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

// SHOW - get / post
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id //book id
  console.log(id)
  console.log(req.session)

  // find the particular book from the database
  Book.findById(id)
    .populate('reviews')
    .exec(function(err, book){
      res.render("books/show", { book});
    })
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here
