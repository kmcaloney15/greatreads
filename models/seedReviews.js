//*** used for development fase to test all pages with some data - won't need once launched */


///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connections.js");
const Review = require("./review.js");

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// save the connection in a variable
const db = mongoose.connection;

// Make sure code is not run till connected
db.on("open", () => {
  ///////////////////////////////////////////////
  // Write your Seed Code Below
  //////////////////////////////////////////////

  // Run any database queries in this function
  const startReviews = [
    {     
        title: "Little Women", 
        username: "katy",
        content: "I would not want to live during that time period.", 
        rating: 3,
        // username: "/img/Reviews/little-women.jpg",
    },
    { 
        title: "Harry Potter and the Deathly Hallows", 
        username: "liz",
        content: "Can I go to Hogwarts?", 
        rating: 5,
        // username: "/img/Reviews/hp-deathly-hallows.jpg",
    },
    { 
        title: "The Hunger Games", 
        username: "katy",
        content: "What a brutal world", 
        rating: 4,
        // username: "/img/Reviews/hunger-games.jpg",
    },
    { 
        title: "A Game of Thrones", 
        username: "jack",
        content: "It was a great book!", 
        rating: 5,
        // username: "/img/Reviews/got.jpg",
    },
    { 
        title: "War and Peace",
        username: "katy", 
        content: "This was super long but I liked it", 
        rating: 5,
        // username: "/img/Reviews/war-and-peace.jpeg",
    },
  ];

  // Delete all Reviews
  // Review.deleteMany({}).then((data) => {
    // Seed Starter Reviews
    Review.create(startReviews)
    .then((data) => {
      // send created Reviews as response to confirm creation
        console.log(startReviews);
        db.close()
    //   res.json(data); //returning json data on route page
    })
    .catch((error) => {
        console.log(error);
        db.close();
    })
  // });

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
});
