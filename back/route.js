var express = require("express");
var router = express.Router();

const sendDiscordBook = require("./webhook");

var books = [
  {
    author: "J.K. Rowling",
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
  },
  {
    author: "J.R.R. Tolkien",
    id: 2,
    title: "The Hobbit",
  },
  {
    author: "George Orwell",
    id: 3,
    title: "1984",
  },
];
var id = 4;

// /books route

// Github Demo

router.post("/github", function (req, res, next) {
  var githubBody = req.body;
  const issue = githubPayload.issue;

  var book = {
    id: id,
    title: issue.title,
    author: issue.body,
  };

  books.push(book);
  id += 1;
  res.sendStatus(200);

  sendDiscordBook(book);
});

module.exports = router;
