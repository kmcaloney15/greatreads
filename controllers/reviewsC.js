// ////////////////////////////////////////
// // Import Dependencies
// ////////////////////////////////////////
// const express = require("express");
// const Review = require("../models/review.js");

// /////////////////////////////////////////
// // Create Route
// /////////////////////////////////////////
// const router = express.Router();
// //change all instances of router. get etc, to router

// ////////////////////////////////////////
// // Router Middleware
// ////////////////////////////////////////
// // Authorization Middleware
// // commenting this out so I can access all pages
// router.use((req, res, next) => {
//   //now you can't access "/reviews" without logging in first
//   if (req.session.loggedIn) {
//     next();
//   } else {
//     res.redirect("/users/login");
//   }
// });

/////////////////////////////////////////
// Routes - all reviews routes specifically
/////////////////////////////////////////

// router.get("/reviews", (req, res) => {
//   res.render("reviews/index.liquid");
// });

// Index Route / The Async/Await Method
// using this so I don't need to log in everytime
// router.get("/", async (req, res) => {
//   //async looks for any kind of awaits - async knows it has to wait for await to finsh running before it will run it's function
//   const reviews = await Review.find({}); // Reviews.find({}) takes a long time to run
//   // await has it wait a second allowing Reviews.find({}) to run before it runs allowing the data to be retrived from the database
//   res.render("reviews/index.liquid", { reviews });
// });

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



// DELETE - Delete
// router.delete("/:id", (req, res) => {
//   // get the id from params
//   const id = req.params.id;
//   // delete the fruit
//   Review.findByIdAndRemove(id)
//     .then((review) => {
//       // redirect to main page after deleting
//       res.redirect("/books");
//     })
//     // send error as json
//     .catch((error) => {
//       // console.log(error);
//       res.json({ error });
//     });
// });

// UPDATE - Put
//update route
// router.put("/:id", (req, res) => {
//   // get the id from params
//   const id = req.params.id;
//   // check if the readyToEat property should be true or false
//   req.body.hasRead = req.body.hasRead === "on" ? true : false;
//   // update the fruit
//   Review.findByIdAndUpdate(id, req.body, { new: true })
//     .then((review) => {
//       // redirect to main page after updating
//       res.redirect(`/users/${user._id}`);
//     })
//     // send error as json
//     .catch((error) => {
//       // console.log(error);
//       res.json({ error });
//     });
// });

// EDIT - Get

// // SHOW - Show
// // show the reviews
// router.get("/:id", (req, res) => {
//   const username = req.session.username;
//   // get the id from params
//   const id = req.params.id;
//   // console.log(id);
//   // console.log(req.body.reviews);
//   // find the particular Review from the database
//   Review.findById(id)
//     .then((reviews) => {
//       // render the template with the data from the database
//       res.render("reviews/show.liquid", { reviews });
//     })
//     .catch((error) => {
//       // console.log(error);
//       res.json({ error });
//     });
// });

// // NEW - Get
// //NEW ROUTE
// //need id for books
// router.get("/:id/new", (req, res) => {
//   let id = req.params.id
//   // console.log(id)
//   res.render("reviews/new", {
//     id
//   })
// });

// CREATE - Post
// need to grab the id of the book, then find the book by req.params.id, in id then push review into books.reviews
//create the route!!!
// router.post("/:id", (req, res) => {
//   // add username to req.body to track related user
//   req.body.username = req.session.username;
//   const id = req.params.id
//   console.log(id)
//   // let newReviews = {
//   //   reviewId: id,
//   //   username: req.session.username,
//   //   reviewBody: req.body.reviewBody,
//   //   rating: 0,
//   // }
//   Review.create(req.body)
//     //
//     .then((newReview) => {
//       // console.log(data)
//       Book.findByIdAndUpdate(id, { $push: { review: newReview._id } })
//       .then((review) => {
//         console.log(review)
//       })
//       // console.log(newReview)
//       // res.render("/show")
    
//     })
    // User.findOneAndUpdate({username:username}, {$push: {review: newReview}})
    // .then((user) => {
    //   // console.log(user)
    // })
    // send error as json
//     .catch((error) => {
//       console.log(error)
//       res.json({ error })
//     })
// })

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
// module.exports = router; //router contains all info in here
