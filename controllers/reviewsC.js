// ////////////////////////////////////////
// // Import Dependencies
// ////////////////////////////////////////
const express = require("express");
const Review = require("../models/review.js");

// /////////////////////////////////////////
// // Create Route
// /////////////////////////////////////////
const router = express.Router();


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

router.get("/reviews", (req, res) => {
  res.render("reviews/index.liquid");
});

// Index Route / The Async/Await Method
// using this so I don't need to log in everytime
// router.get("/", async (req, res) => {
//   //async looks for any kind of awaits - async knows it has to wait for await to finsh running before it will run it's function
//   const reviews = await Review.find({}); // Reviews.find({}) takes a long time to run
//   // await has it wait a second allowing Reviews.find({}) to run before it runs allowing the data to be retrived from the database
//   res.render("reviews/index.liquid", { reviews });
// });

//index route / will only show the loggin in user Reviews
router.get("/", (req, res) => {
    // find all the Reviews
    Review.find({ username: req.session.username })
      // render a template after they are found
      .then((reviews) => {
        console.log(reviews);
        res.render("reviews/index.liquid", { reviews });
      })
      // send error as json if they aren't
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });



// DELETE - Delete
router.delete("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id //review id
  console.log(id)
  // delete the review
  Review.findByIdAndDelete(id)
    .then((reviews) => {
      // redirect to main page after deleting
      res.redirect("/books")
    })
    // send error as json
    .catch((error) => {
      // console.log(error)
      res.json({ error })
    })
})

// UPDATE - Put
//update route
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // check if the readyToEat property should be true or false
//   req.body.hasRead = req.body.hasRead === "on" ? true : false;
  // update the review
  Review.findByIdAndUpdate(id, req.body, { new: true })
    .then((reviews) => {
      // redirect to main page after updating
      res.redirect(`/books`)
    })
    // send error as json
    .catch((error) => {
      // console.log(error);
      res.json({ error });
    });
});

// EDIT - Get
router.get("/:id/", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // get the fruit from the database
    Review.findById(id)
      .then((reviews) => {
        // render edit page and send fruit data
        res.render("reviews/edit.liquid", { reviews });
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });

// // SHOW - Show
// // show the reviews
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // console.log(id);
  // console.log(req.body.reviews);
  // find the particular Review from the database
  Review.findById(id)
    .then((reviews) => {
      // render the template with the data from the database
      res.render("review/show.liquid", { reviews });
    })
    .catch((error) => {
      // console.log(error);
      res.json({ error });
    });
});



//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router; //router contains all info in here
