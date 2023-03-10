const Student = require("../models/student");
const fs = require("fs");
const { Parser } = require("json2csv");


// This will take CSV file from user and add data to our DB
exports.addStudents = async (req, res) => {
  const students = [];

  // Parse CSV file
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => {
      students.push(data);
    })
    .on("end", async () => {
      // Remove duplicate students
      const uniqueStudents = students.filter(
        (student, index, self) =>
          index ===
          self.findIndex(
            (s) => s.Roll_No === student.Roll_No && s.Email === student.Email
          )
      );

      try {
        await Student.insertMany(uniqueStudents);
        res.json({ message: "Students imported successfully" });
      } catch (error) {
        res.status(500).json({ message: "Error importing students" });
      }
    });
};


// This will send all the data which is present at the DB
exports.sendStudents = async (req,res)=>{
  try {
    // Fetch all students from the database
    const students = await Student.find();
    
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}


// This will conver our DB data into CSV file and user will be able to download it
exports.downloadCsv = async(req,res)=>{
  try {
    
    const students = await Student.find();

    // Convert the student data to a CSV string using the json2csv library
    const fields = ["Name", "Roll_No", "Address", "Institute", "Course", "Email"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(students);

    // Set the response headers to indicate that this is a CSV file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=students.csv");

    // Send the CSV file as the response
    res.send(csv).json("Downloaded");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }


}