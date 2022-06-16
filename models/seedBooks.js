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
        series: "Classics",
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1562690475l/1934._SY475_.jpg",
        // review: [] 
    },
    { 
        title: "Harry Potter and the Deathly Hallows", 
        author: "J.K. Rowling", 
        series: "Harry Potter",
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474171184l/136251._SY475_.jpg",
        // review: false 
    },
    { 
        title: "The Hunger Games", 
        author: "Suzanne Collins", 
        series: "The Hunger Games",
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg",
        // review: false 
    },
    { 
        title: "A Game of Thrones", 
        author: "George R.R. Martin", 
        series: "A Song of Ice and Fire",
        image: "https://m.media-amazon.com/images/I/51D+-f5UcDL.jpg",
        // review: false 
    },
    { 
        title: "War and Peace", 
        author: "Leo Tolstoy", 
        series: "Classics",
        image: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1413215930l/656.jpg",
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
 })
 .catch((error) => {
   console.log(error)
   db.close()
 })

  ///////////////////////////////////////////////
  // Write your Seed Code Above
  //////////////////////////////////////////////
})
