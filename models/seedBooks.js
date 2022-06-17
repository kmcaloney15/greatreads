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
        image: "https://i.imgur.com/paz0zee.jpg",
        // review: [] 
    },
    { 
        title: "Harry Potter and the Deathly Hallows", 
        author: "J.K. Rowling", 
        series: "Harry Potter",
        image: "https://i.imgur.com/hBunj1v.jpg",
        description: "It's no longer safe for Harry at Hogwarts, so he and his best friends, Ron and Hermione, are on the run. Professor Dumbledore has given them clues about what they need to do to defeat the dark wizard, Lord Voldemort, once and for all, but it's up to them to figure out what these hints and suggestions really mean. Their cross-country odyssey has them searching desperately for the answers, while evading capture or death at every turn. At the same time, their friendship, fortitude, and sense of right and wrong are tested in ways they never could have imagined. The ultimate battle between good and evil that closes out this final chapter of the epic series takes place where Harry's Wizarding life began: at Hogwarts. The satisfying conclusion offers shocking last-minute twists, incredible acts of courage, powerful new forms of magic, and the resolution of many mysteries. Above all, this intense, cathartic book serves as a clear statement of the message at the heart of the Harry Potter series: that choice matters much more than destiny, and that love will always triumph over death. "
        // review: false 
    },
    { 
        title: "The Hunger Games", 
        author: "Suzanne Collins", 
        series: "The Hunger Games",
        image: "https://i.imgur.com/lNaiS5e.jpg",
        // review: false 
    },
    { 
        title: "A Game of Thrones", 
        author: "George R.R. Martin", 
        series: "A Song of Ice and Fire",
        image: "https://i.imgur.com/X4xcyYn.jpg",
        // review: false 
    },
    { 
        title: "War and Peace", 
        author: "Leo Tolstoy", 
        series: "Classics",
        image: "https://i.imgur.com/zNzYK9y.jpg",
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
