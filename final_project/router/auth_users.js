const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(404).json({ message: "Error logging in" });
    }
    if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign(
        {
          data: password,
        },
        "access",
        { expiresIn: 60 * 60 }
      );
      req.session.authorization = {
        accessToken,
        username,
      };
      res.status(200).json({ message: "User successfully logged in" });
    } else {
      res
        .status(208)
        .json({ message: "Invalid Login. Check username and password" });
    }
  } catch (error) {
    console.log(error);
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const { review } = req.query;
  const { isbn } = req.params;
  const user = req.session.authorization.username;
  let result = books[isbn];
  let el = { user, review };
  Array.prototype.push.call(result.reviews, el);
  return res
    .status(300)
    .json({ message: "Review has been added successfully", result });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params;
  const user = req.session.authorization.username;
  let result = books[isbn].reviews;
  let review = Array.prototype.filter.call(result, (el) => el.user === user)
  Array.prototype.splice.call(review);
  console.log(result);
  return res
    .status(300)
    .json({ message: "Reviews has been deleted successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
