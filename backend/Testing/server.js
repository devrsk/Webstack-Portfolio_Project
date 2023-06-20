const express = require("express");
const bodyParser = require("body-parser");
const login = require('./login');
const db = require('./db');

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PropertyPro" });
});

app.post("/login", (req, res) => {
  console.log("Req Body:", req.body);
  const temp = new login();
  temp.login(db, req, res);
});

// set port, listen for requests
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
