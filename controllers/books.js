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
    res.redirect("/users/login");
  }
});

/////////////////////////////////////////
// Routes - all books routes specifically
/////////////////////////////////////////

// Index Route / The Async/Await Method
// using this so I don't need to log in everytime
router.get("/", async (req, res) => {
  //async looks for any kind of awaits - async knows it has to wait for await to finsh running before it will run it's function
  const books = await Book.find({}); // books.find({}) takes a long time to run
  // await has it wait a second allowing books.find({}) to run before it runs allowing the data to be retrived from the database
  res.render("books/index.liquid", { books });
});

// index route / will only show the loggin in user books
// router.get("/", (req, res) => {
//     // find all the books
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

// NEW - Get // don't need here but will for reviews

// DELETE - Delete

// UPDATE - Put
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the hasRead property should be true or false
  req.body.hasRead = req.body.hasRead === "on" ? true : false;
  v;
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
    });
});

// CREATE - Post

// new review
router.post("/:id/reviews", (req, res) => {
  const username = req.session.username;
  const id = req.params.id;

  let newReview = {
    reviewId: id,
    reviewOwner: {
      username: req.session.username,
    },
    reviewBody: req.body.reviewBody,
    rating: 0,
  };
  User.findOne({ username: req.session.username })
    .then((user) => {
      // console.log(req.body)
      Review.create(newReview)
      .then((review) => {
        Book.findByIdAndUpdate(id, { $push: { reviews: review._id } })
        .then(
          (book) => {
            console.log(book, "this is a book");
          })
      })
    })
    .then((user) => {
      console.log(user);
    });
  res.redirect("/books/:id")
  .catch((error) => {
    console.log(error);
    res.json({ error });
  });
});

// router.post("/:id", (req, res) => {
//   // add username to req.body to track related user
//   req.body.username = req.session.username;
//   const id = req.params.id
//   console.log(id)

//   Book.create(req.body)
//     //
//     .then((newReview) => {
//       // console.log(data)
//       Book.findByIdAndUpdate(id, { $push: { review: newReview._id } })
//       .then((review) => {
//         console.log(review)
//       })
//       // console.log(newReview)
//       res.render("/show/{{book.id}}")

//     })
//     // User.findOneAndUpdate({username:username}, {$push: {review: newReview}})
//     // .then((user) => {
//     //   // console.log(user)
//     // })
//     // send error as json
//     .catch((error) => {
//       console.log(error)
//       res.json({ error })
//     })
// })

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

// SHOW - Show
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id
  console.log(req.session)

  // find the particular book from the database
  Book.findById(id)

    .then((book) => {
      // render the template with the data from the database
      res.render("books/show.liquid", { book });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here
