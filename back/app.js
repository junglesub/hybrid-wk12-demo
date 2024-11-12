const express = require("express");
const app = express();
const port = 8080;

const cors = require("cors");

var booksRouter = require("./route");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/handong", (req, res) => {
  res.send("Is Awesome University!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
