////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
  res.render("users/signup.liquid");
});

router.post("/signup", async (req, res) => {
  //here is where we use encription
  // encrypt password
  req.body.password = await bcrypt.hash(
    //bcript needs 2 things to pass through and needs time to run
    req.body.password, //this is the string that you enter in the input field
    await bcrypt.genSalt(10)
  );
  // create the new user
  User.create(req.body)
    .then((user) => {
      // redirect to login page
      res.redirect("/books");
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});

// // The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
  res.render("users/login.liquid");
});

// // require login code
router.post("/login", async (req, res) => {
  // get the data from the request body
  const { username, password } = req.body;
  // search for the user
  User.findOne({ username })
    .then(async (user) => {
      // check if user exists
      if (user) { //if the user does exist, then we need to compare the password 
        // compare password
        const result = await bcrypt.compare(password, user.password); //compare will take password that recieved from req.body and compare to the user.password
        if (result) {
          // store some properties in the session object
          req.session.username = username;
          req.session.loggedIn = true;
          // redirect to fruits page if successful
          res.redirect("/books");
        } else {
          // error if password doesn't match
          res.json({ error: "password doesn't match" });
        }
      } else {
        // send error if user doesn't exist
        res.json({ error: "user doesn't exist" });
      }
    })
    .catch((error) => {
      // send error as json
      console.log(error);
      res.json({ error });
    });
});

// Index Route / The Async/Await Method
// using this so I don't need to log in everytime
router.get("/", async (req, res) => {
    //async looks for any kind of awaits - async knows it has to wait for await to finsh running before it will run it's function
    const users = await User.find({}); // books.find({}) takes a long time to run
    // await has it wait a second allowing books.find({}) to run before it runs allowing the data to be retrived from the database
    res.render("users/profile", { users });
});

// how to destroy the session
router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
      res.redirect("/");
    });
});


// index route / will only show the loggin in user books
router.get("/", (req, res) => {
    // find all the books
    User.find({ username: req.session.username })
      // render a template after they are found
      .then((users) => {
        const reviews = users[0].review
        console.log(reviews);
        res.render("users/profile.liquid", { users:users[0], reviews })
      })
      // send error as json if they aren't
      .catch((error) => {
        console.log(error)
        res.json({ error })
      });
  });


// NEW - Get // don't need here but will for reviews


// DELETE - Delete


// UPDATE - Put


// CREATE - Post

// EDIT - Get

// SHOW - Show
router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
  
    // find the particular user profile
    User.findById(id)
      .then((users) => {
        // render the template with the data from the database
        res.render("/users/profile.liquid", { users });
      })
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  });
  

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
