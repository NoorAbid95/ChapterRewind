const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

//Express app configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
