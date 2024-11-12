const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const cors = require("cors");
app.use(cors());

var booksRouter = require("./route");
app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/handong", (req, res) => {
  res.send("Is Awesome University!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
