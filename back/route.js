var express = require("express");
var router = express.Router();

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

router.get("/", function (req, res, next) {
  res.json(books);
});

router.get("/:id", function (req, res, next) {
  var index = books.findIndex(function (book) {
    return book.id == req.params.id;
  });
  // 만약에 해당 ID 가 존제하지 않으면 404 반환
  if (index === -1) return res.sendStatus(404);

  res.json(books[index]);
});

router.post("/", function (req, res, next) {
  var book = req.body;
  book.id = id;

  books.push(book);
  id += 1;
  res.sendStatus(200);
});
router.put("/:id", function (req, res, next) {
  var index = books.findIndex(function (book) {
    return book.id == req.params.id;
  });

  // 만약에 해당 ID 가 존제하지 않으면 404 반환
  if (index === -1) return res.sendStatus(404);

  books.splice(index, 1, req.body);
  res.sendStatus(200);
});
router.delete("/:id", function (req, res, next) {
  var index = books.findIndex(function (book) {
    return book.id == req.params.id;
  });

  // 만약에 해당 ID 가 존제하지 않으면 404 반환
  if (index === -1) return res.sendStatus(404);

  books.splice(index, 1);
  res.sendStatus(200);
});

module.exports = router;
