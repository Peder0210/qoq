const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const path = require("path");


// Initialize express object
const app = express();
// Declare parser
app.use(bodyParser.urlencoded({extended:true}));
// Make connection
mongoose.connect("mongodb://localhost:5000/items");
// Get reference
let db = mongoose.connection;
// Retrieve posts
app.get("/browse",function(req,res){

  // Set response header
  res.setHeader("Content-Type","application/json");

  // Get all books
  var all_books = [];
  db.collection("books").find().forEach(function(item){
    all_books.push(item);
  }).then(()=>{
    res.write(JSON.stringify(all_books,null,2));
  }).then(()=>{
    res.end();
  }).catch((e)=>{
    console.log(e);
  });
});


// Create item
app.get("/create",function(req,res){
  // Init item
  let item = {
    "name": req.query.name,
    "isbn": req.query.isbn,
    "pages": req.query.pages,
    "price": req.query.price,
    "language": req.query.language,
    "author": req.query.author,
    "rental_period": req.query.rental_period,
    "book_material": req.query.book_material
  };
  // Add to database
  db.collection("books").insertOne(item);
  // Return a response
  res.setHeader("Content-Type","text/plain");
  res.end("Item created:\n\n "+JSON.stringify(item, null, 2));
});

// Temporary page route
app.get("/create_page",function(req,res){
  res.sendFile(path.join(__dirname,"..","Pages","create.html"));
});

// Temporary page route
app.get("/browse_page",function(req,res){
  res.sendFile(path.join(__dirname,"..","Pages","browse.html"));
});


// Listen for requests on port x (80 for server)
app.listen(5001);
