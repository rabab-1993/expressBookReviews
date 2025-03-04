const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  const {username, password} = req.body
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({ message: "Unable to register user" });
});

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  //Write your code here
  let result = Object.values(books);
  
  return res.status(300).json(result);
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  let { author } = req.params;
  let result = Object.values(books);
  let found = result.filter((element) => element.author === author);
  return res.status(300).json(found);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  let { title } = req.params;
  let result = Object.values(books);
  let found = result.filter((element) => element.title === title);
  return res.status(300).json(found);
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
