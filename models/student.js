const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Roll_No: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Institute: {
    type: String,
    required: true,
  },
  Course: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
