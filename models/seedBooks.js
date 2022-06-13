//*** used for development fase to test all pages with some data - won't need once launched */


///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require("./connections.js");
const Book = require("./book.js");

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
    Book.create(startBooks)
    .then((data) => {
      // send created books as response to confirm creation
        console.log(startBooks);
        db.close()
    //   res.json(data); //returning json data on route page
    })
    .catch((error) => {
        console.log(error);
        db.close();
    })
  });



  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
});
