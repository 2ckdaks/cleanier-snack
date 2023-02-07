const express = require("express");
const app = express();
app.use(express.static("public"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extend: true }));

app.listen(8080, function () {
  console.log("listening on 8080");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/public/html/login.html");
});

app.get("/request", function (req, res) {
  res.sendFile(__dirname + "/public/html/request.html");
});

app.get("/snack-list", function (req, res) {
  res.sendFile(__dirname + "/public/html/snack-list.html");
});

app.get("/user-list", function (req, res) {
  res.sendFile(__dirname + "/public/html/user-list.html");
});
