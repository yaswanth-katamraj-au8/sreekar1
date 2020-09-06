var express = require("express");
var bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});

var app = express();
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/", function (req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;

  var data = {
    fname: fname,
    lname: lname,
    email: email,
    subject: subject,
    message: message,
  };
  db.collection("details").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted Successfully");
  });

  return res.render("index");
});
app.get("/Resume", function (req, res) {
  res.download("./public/images/Sai sreekar RESUME .pdf");
});

app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.render("index");
  })
  .listen(process.env.PORT || 3000);

console.log(`server listening at port ${process.env.PORT || 3000}`);
