const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import all routes here
const user = require("./routes/user");
const students = require("./routes/student");

// routes middleware
app.use("/api/v1", user);
app.use("/api/v1", students);

module.exports = app;
