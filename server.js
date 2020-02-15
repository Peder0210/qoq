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

  // Get all books
  var all_books = db.collection("books").find();

  console.log(all_books);

  res.send("Done w. BROWSING");
});


// Create item
app.get("/create",function(req,res){
  let item = {
    "name": "Dragoon Balls",
    "ISBN": "7864201337"
  }
  db.collection("books").insert(item);
  
  res.setHeader("Content-Type","application/json");
  res.end(JSON.stringify(req.query, null, 2));  
});



// Listen for requests on port x (80 for server)
app.listen(5001);
