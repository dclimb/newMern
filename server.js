const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

//middlewares

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to DB

mongoose.connect(
  keys.MONGO_URI,
  error =>
    error
      ? console.log("Error connecting to DB: ", error)
      : console.log("connected to db")
);

//routing

const users = require("./api/routes/users");

app.use("/users", users);

//Set up server

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server connected to port ", port));
