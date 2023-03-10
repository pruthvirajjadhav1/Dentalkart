const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const { addStudents, sendStudents, downloadCsv } = require("../controllers/studentController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/addStudents", upload.single("file"), addStudents);
router.get("/sendData", sendStudents);
router.get("/download", downloadCsv);

module.exports = router;
